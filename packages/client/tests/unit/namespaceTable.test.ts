/**
 * Unit tests for the NamespaceTable class.
 *
 * OPC UA Part 4, Section 5.7.1 — Session Client Renew NodeIds:
 * Namespace indices embedded in NodeIds must be remapped when the server's
 * NamespaceArray changes between sessions.
 */

import { describe, expect, it } from 'vitest'

import { NodeId } from 'opcjs-base'

import { NamespaceTable } from '../../src/namespaceTable.js'

const BASE_NS = 'http://opcfoundation.org/UA/'
const MY_NS = 'urn:my-server:model'
const OTHER_NS = 'urn:unrelated'

describe('NamespaceTable.getUri', () => {
    it('returns the URI at the given index', () => {
        const table = new NamespaceTable([BASE_NS, MY_NS])
        expect(table.getUri(0)).toBe(BASE_NS)
        expect(table.getUri(1)).toBe(MY_NS)
    })

    it('returns undefined for an out-of-range index', () => {
        const table = new NamespaceTable([BASE_NS])
        expect(table.getUri(5)).toBeUndefined()
    })
})

describe('NamespaceTable.getIndex', () => {
    it('returns the index for a known URI', () => {
        const table = new NamespaceTable([BASE_NS, MY_NS])
        expect(table.getIndex(MY_NS)).toBe(1)
        expect(table.getIndex(BASE_NS)).toBe(0)
    })

    it('returns undefined for an unknown URI', () => {
        const table = new NamespaceTable([BASE_NS, MY_NS])
        expect(table.getIndex('urn:unknown')).toBeUndefined()
    })
})

describe('NamespaceTable.getUris', () => {
    it('returns the full ordered URI array', () => {
        const uris = [BASE_NS, MY_NS, OTHER_NS]
        const table = new NamespaceTable(uris)
        expect(table.getUris()).toEqual(uris)
    })
})

describe('NamespaceTable.equals', () => {
    it('returns true for identical tables', () => {
        const a = new NamespaceTable([BASE_NS, MY_NS])
        const b = new NamespaceTable([BASE_NS, MY_NS])
        expect(a.equals(b)).toBe(true)
    })

    it('returns false when length differs', () => {
        const a = new NamespaceTable([BASE_NS, MY_NS])
        const b = new NamespaceTable([BASE_NS])
        expect(a.equals(b)).toBe(false)
    })

    it('returns false when a URI differs', () => {
        const a = new NamespaceTable([BASE_NS, MY_NS])
        const b = new NamespaceTable([BASE_NS, OTHER_NS])
        expect(a.equals(b)).toBe(false)
    })
})

describe('NamespaceTable.remapNodeId', () => {
    it('returns the same instance for namespace index 0', () => {
        const oldTable = new NamespaceTable([BASE_NS, MY_NS])
        const newTable = new NamespaceTable([BASE_NS, OTHER_NS, MY_NS])
        const nodeId = NodeId.newNumeric(0, 42)
        expect(oldTable.remapNodeId(nodeId, newTable)).toBe(nodeId)
    })

    it('returns the same instance when the index is unchanged', () => {
        const oldTable = new NamespaceTable([BASE_NS, MY_NS])
        const newTable = new NamespaceTable([BASE_NS, MY_NS])
        const nodeId = NodeId.newNumeric(1, 1001)
        expect(oldTable.remapNodeId(nodeId, newTable)).toBe(nodeId)
    })

    it('returns a new NodeId with the updated namespace index', () => {
        const oldTable = new NamespaceTable([BASE_NS, MY_NS])
        const newTable = new NamespaceTable([BASE_NS, OTHER_NS, MY_NS])
        const nodeId = NodeId.newNumeric(1, 1001)
        const remapped = oldTable.remapNodeId(nodeId, newTable)
        expect(remapped.namespace).toBe(2)
        expect(remapped.identifier).toBe(1001)
    })

    it('remaps string NodeIds correctly', () => {
        const oldTable = new NamespaceTable([BASE_NS, MY_NS])
        const newTable = new NamespaceTable([BASE_NS, OTHER_NS, MY_NS])
        const nodeId = NodeId.newString(1, 'Temperature')
        const remapped = oldTable.remapNodeId(nodeId, newTable)
        expect(remapped.namespace).toBe(2)
        expect(remapped.identifier).toBe('Temperature')
    })

    it('throws when the old index is out of range', () => {
        const oldTable = new NamespaceTable([BASE_NS])
        const newTable = new NamespaceTable([BASE_NS, MY_NS])
        const nodeId = NodeId.newNumeric(5, 999)
        expect(() => oldTable.remapNodeId(nodeId, newTable)).toThrow(/old NamespaceTable/)
    })

    it('throws when the URI is absent from the new table', () => {
        const oldTable = new NamespaceTable([BASE_NS, MY_NS])
        const newTable = new NamespaceTable([BASE_NS, OTHER_NS])
        const nodeId = NodeId.newNumeric(1, 1001)
        expect(() => oldTable.remapNodeId(nodeId, newTable)).toThrow(/new NamespaceTable/)
    })
})
