/**
 * Decoder Template - Generate TypeScript binary decoder functions
 *
 * Generates decoder functions for OPC UA structure types using IReader.
 * For each structure, a `decode<TypeName>` function is emitted that
 * instantiates the class and populates every field from the decoder.
 *
 * @packageDocumentation
 */

import { ParsedType } from '../types/DataModel.js';
import { sortByInheritance } from '../InheritanceResolver.js';

// ── Built-in OPC UA NodeId → decoder method name ─────────────────────────────

/**
 * Maps the numeric part of a built-in OPC UA node id to the IReader
 * method that reads that type.  
 */
const BUILTIN_DECODER_METHOD: Record<number, string> = {
    1:  'readBoolean()',
    2:  'readSByte()',
    3:  'readByte()',
    4:  'readInt16()',
    5:  'readUInt16()',
    6:  'readInt32()',
    7:  'readUInt32()',
    8:  'readInt64()',
    9:  'readUInt64()',
    10: 'readFloat()',
    11: 'readDouble()',
    12: 'readString()',      // returns string | null per OPC UA spec
    13: 'readDateTime()',
    14: 'readGuid()',
    15: 'readByteString()',  // returns Uint8Array | null per OPC UA spec
    16: 'readXmlElement()',
    17: 'readNodeId()',
    18: 'readExpandedNodeId()',
    19: 'readStatusCode()',
    20: 'readQualifiedName()',
    21: 'readLocalizedText()',
    22: 'readExtensionObject(decoder)',
    23: 'readDataValue(decoder)',
    24: 'readVariant(decoder)',
    25: 'readDiagnosticInfo()',
};

// ── Public types ──────────────────────────────────────────────────────────────

export interface GeneratedDecoders {
    /** All generated decoder function source code, ready to embed in a file. */
    code: string;
    /** Structure type names that must be imported from the types file. */
    typeImports: string[];
    /** Enum type names that must be imported from the enums file. */
    enumImports: string[];
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Generate decoder functions for all structure/abstract types in the model.
 *
 * @param types           All parsed types from the data model.
 * @param nodeIdToTypeName Map from node-id string to TypeScript identifier
 *                         (enums carry the `Enum` suffix, structs do not).
 * @param enumNodeIds      Set of node-id strings that belong to enumerations.
 * @returns Generated decoder code and the import sets that the caller needs
 *          to turn into import statements.
 */
export function generateDecoders(
    types: ParsedType[],
    nodeIdToTypeName: ReadonlyMap<string, string>,
    enumNodeIds: ReadonlySet<string>,
    builtinAliases: ReadonlyMap<string, string> = new Map(),
): GeneratedDecoders {
    const structTypes = types.filter(
        (t) => t.category === 'structure' || t.category === 'abstract',
    );
    const sorted = sortByInheritance(structTypes);

    // Build a quick-lookup set of structure node ids so that field types that
    // resolve to a peer struct can be dispatched to their decode function.
    const structNodeIds = new Set<string>(structTypes.map((t) => t.nodeId));

    const usedTypeNames = new Set<string>();
    const usedEnumNames = new Set<string>();
    const functions: string[] = [];


    // Helper to resolve parent type name
    function getParentTypeName(type: ParsedType): string | undefined {
        if (!type.parentNodeId) return undefined;
        // Structure base type is usually 'Structure', skip if so
        if (type.parentNodeId === 'i=22') return undefined;
        // Look up parent type name
        const parent = types.find(t => t.nodeId === type.parentNodeId);
        return parent ? parent.safeName : undefined;
    }

    for (const type of sorted) {
        usedTypeNames.add(type.safeName);
        const fields = type.fields ?? [];
        const hasOptional = fields.some((f) => f.isOptional);
        const fieldLines: string[] = [];

        // Insert base class decoder call if applicable
        const parentTypeName = getParentTypeName(type);
        if (parentTypeName) {
            usedTypeNames.add(parentTypeName);
            fieldLines.push(`    Object.assign(obj, decode${parentTypeName}(reader, decoder)); // decode base class`);
        }

        if (hasOptional) {
            fieldLines.push(`    const encodingMask = reader.readUInt32();`);
        }

        let optionalBitIndex = 0;
        for (const field of fields) {
            const bitIndex = field.isOptional ? optionalBitIndex++ : -1;
            const expr = buildFieldExpression(
                field.dataTypeNodeId,
                field.isArray,
                field.isOptional,
                nodeIdToTypeName,
                enumNodeIds,
                structNodeIds,
                usedEnumNames,
                usedTypeNames,
                builtinAliases,
            );
            if (expr !== null) {
                if (field.isOptional) {
                    fieldLines.push(`    if (encodingMask & (1 << ${bitIndex})) { obj.${field.name} = ${expr}; } // optional`);
                } else {
                    fieldLines.push(`    obj.${field.name} = ${expr};`);
                }
            }
        }
        const funcName = `decode${type.safeName}`;
        functions.push(
            [
                `export function ${funcName}(reader: IReader, decoder: Decoder): ${type.safeName} {`,
                `    const obj = new ${type.safeName}();`,
                ...fieldLines,
                `    return obj;`,
                `};`,
            ].join('\n'),
        );
    }

    return {
        code: functions.join('\n\n'),
        typeImports: [...usedTypeNames].sort(),
        enumImports: [...usedEnumNames].sort(),
    };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Build the right-hand-side expression that reads a single field value.
 *
 * When `isArray` is true the expression is wrapped in `decoder.readArray(…)`.
 * Returns `null` when the field type cannot be resolved (unknown type).
 */
function buildFieldExpression(
    dataTypeNodeId: string,
    isArray: boolean,
    isOptional: boolean,
    nodeIdToTypeName: ReadonlyMap<string, string>,
    enumNodeIds: ReadonlySet<string>,
    structNodeIds: ReadonlySet<string>,
    usedEnumNames: Set<string>,
    usedTypeNames: Set<string>,
    builtinAliases: ReadonlyMap<string, string> = new Map(),
): string | null {
    if (isArray) {
        const inner = resolveElementCall(
            dataTypeNodeId,
            'd',
            nodeIdToTypeName,
            enumNodeIds,
            structNodeIds,
            usedEnumNames,
            usedTypeNames,
            builtinAliases,
        );

        if (inner === null) {
            return null;
        }

        return isOptional
            ? `reader.readArray((d: IReader) => ${inner})`
            : `reader.readArray((d: IReader) => ${inner})!`;
    }

    return resolveElementCall(
        dataTypeNodeId,
        'reader',
        nodeIdToTypeName,
        enumNodeIds,
        structNodeIds,
        usedEnumNames,
        usedTypeNames,
        builtinAliases,
    );
}

/**
 * Produce the call expression (with the given `prefix` variable) that reads
 * a single, non-array field value.
 *
 * Resolution order:
 *  1. Built-in OPC UA scalar types (i=1 … i=25)
 *  2. Enumeration types (cast readUInt32)
 *  3. Structure types from the nodeset (peer decode function)
 *
 * Returns `null` when the type cannot be resolved.
 */
function resolveElementCall(
    dataTypeNodeId: string,
    prefix: string,
    nodeIdToTypeName: ReadonlyMap<string, string>,
    enumNodeIds: ReadonlySet<string>,
    structNodeIds: ReadonlySet<string>,
    usedEnumNames: Set<string>,
    usedTypeNames: Set<string>,
    builtinAliases: ReadonlyMap<string, string> = new Map(),
): string | null {
    // 1. Built-in numeric node id
    const match = /^i=(\d+)$/.exec(dataTypeNodeId);
    if (match) {
        const n = parseInt(match[1], 10);
        const method = BUILTIN_DECODER_METHOD[n];

        if (method) {
            // readString() returns string | null and readByteString() returns
            // Uint8Array | null per the OPC UA spec; no casting or asserting needed.
            return `${prefix}.${method}`;
        }
    }

    // 2. Enumeration – cast the decoded UInt32 to the enum type
    if (enumNodeIds.has(dataTypeNodeId)) {
        const enumName = nodeIdToTypeName.get(dataTypeNodeId);

        if (enumName) {
            usedEnumNames.add(enumName);
            return `${prefix}.readUInt32() as ${enumName}`;
        }
    }

    // 3. Peer structure type – delegate to its decode function
    if (structNodeIds.has(dataTypeNodeId)) {
        const typeName = nodeIdToTypeName.get(dataTypeNodeId);

        if (typeName) {
            usedTypeNames.add(typeName);
            return `decode${typeName}(${prefix}, decoder)`;
        }
    }

    // 4. Built-in alias (e.g. SessionAuthenticationToken i=388 → NodeId i=17)
    //    builtinAliases stores aliasNodeId → builtinNodeId; resolve directly
    //    via BUILTIN_DECODER_METHOD, no TS name indirection needed.
    const builtinNodeId = builtinAliases.get(dataTypeNodeId);
    if (builtinNodeId !== undefined) {
        const aliasMatch = /^i=(\d+)$/.exec(builtinNodeId);
        if (aliasMatch) {
            const n = parseInt(aliasMatch[1], 10);
            const method = BUILTIN_DECODER_METHOD[n];
            if (method) {
                return `${prefix}.${method}`;
            }
        }
    }

    // Unknown / unresolvable type
    return null;
}
