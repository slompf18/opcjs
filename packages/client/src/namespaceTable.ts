import { NodeId } from 'opcjs-base'

/**
 * Tracks the OPC UA NamespaceArray for a session (OPC UA Part 4, Section 5.7.1 —
 * Session Client Renew NodeIds conformance unit).
 *
 * The NamespaceArray maps namespace indices (used inside NodeIds) to stable namespace
 * URIs. Because the server may assign different indices to the same URI across
 * sessions (e.g. after a server restart), clients that cache NodeIds must remap
 * the namespace index whenever the table changes.
 *
 * Namespace index `0` is always the OPC UA base namespace
 * (`http://opcfoundation.org/UA/`) and is guaranteed never to change by the spec.
 *
 * @example
 * ```ts
 * const oldTable = new NamespaceTable(['http://opcfoundation.org/UA/', 'urn:my-server:model'])
 * // After reconnect the server puts the model namespace at index 2:
 * const newTable = new NamespaceTable(['http://opcfoundation.org/UA/', 'urn:unrelated', 'urn:my-server:model'])
 * const remapped = oldTable.remapNodeId(NodeId.newNumeric(1, 1001), newTable)
 * // remapped === NodeId(2, 1001)
 * ```
 */
export class NamespaceTable {
    private readonly uris: readonly string[]

    constructor(uris: string[] = []) {
        // Freeze a copy so the stored array is immutable.
        this.uris = Object.freeze([...uris])
    }

    /** Returns the namespace URI at the given index, or `undefined` if out of range. */
    getUri(index: number): string | undefined {
        return this.uris[index]
    }

    /** Returns the namespace index for the given URI, or `undefined` if not found. */
    getIndex(uri: string): number | undefined {
        const idx = this.uris.indexOf(uri)
        return idx >= 0 ? idx : undefined
    }

    /** Returns the full ordered array of namespace URIs. */
    getUris(): readonly string[] {
        return this.uris
    }

    /** Returns `true` when both tables contain the same URIs in the same order. */
    equals(other: NamespaceTable): boolean {
        if (this.uris.length !== other.uris.length) return false
        return this.uris.every((uri, i) => uri === other.uris[i])
    }

    /**
     * Remaps the namespace index of `nodeId` from this table to the equivalent
     * index in `newTable` by matching namespace URIs.
     *
     * - Namespace index `0` (OPC UA base namespace) is always returned unchanged.
     * - Returns the **same** `NodeId` instance when the index has not changed.
     * - Returns a **new** `NodeId` instance with the updated index when remapping
     *   is required.
     *
     * @throws {Error} When the namespace URI at `nodeId.namespace` is not present
     *   in this (old) table or when the URI is not present in `newTable`.
     */
    remapNodeId(nodeId: NodeId, newTable: NamespaceTable): NodeId {
        // Namespace 0 is invariant per the OPC UA spec.
        if (nodeId.namespace === 0) return nodeId

        const uri = this.getUri(nodeId.namespace)
        if (uri === undefined) {
            throw new Error(
                `Cannot remap ${nodeId.toString()}: namespace index ${nodeId.namespace} ` +
                `is not present in the old NamespaceTable (length ${this.uris.length}).`,
            )
        }

        const newIndex = newTable.getIndex(uri)
        if (newIndex === undefined) {
            throw new Error(
                `Cannot remap ${nodeId.toString()}: namespace URI '${uri}' ` +
                `is not present in the new NamespaceTable.`,
            )
        }

        if (newIndex === nodeId.namespace) return nodeId

        return new NodeId(newIndex, nodeId.identifier)
    }
}
