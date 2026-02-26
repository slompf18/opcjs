/**
 * Encoder Template - Generate TypeScript binary encoder functions
 *
 * Generates encoder functions for OPC UA structure types using IWriter.
 * For each structure, an `encode<TypeName>` function is emitted that
 * writes every field of the value object to the encoder.
 *
 * @packageDocumentation
 */

import { ParsedType } from '../types/DataModel.js';
import { sortByInheritance } from '../InheritanceResolver.js';

// ── Built-in OPC UA NodeId → encoder method name ─────────────────────────────

/**
 * Maps the numeric part of a built-in OPC UA node id to the IWriter
 * method that writes that type.
 */
const BUILTIN_ENCODER_METHOD: Record<number, string> = {
    1:  'writeBoolean',
    2:  'writeSByte',
    3:  'writeByte',
    4:  'writeInt16',
    5:  'writeUInt16',
    6:  'writeInt32',
    7:  'writeUInt32',
    8:  'writeInt64',
    9:  'writeUInt64',
    10: 'writeFloat',
    11: 'writeDouble',
    12: 'writeString',
    13: 'writeDateTime',
    14: 'writeGuid',
    15: 'writeByteString',
    16: 'writeXmlElement',
    17: 'writeNodeId',
    18: 'writeExpandedNodeId',
    19: 'writeStatusCode',
    20: 'writeQualifiedName',
    21: 'writeLocalizedText',
    22: 'writeExtensionObject',
    23: 'writeDataValue',
    24: 'writeVariant',
    25: 'writeDiagnosticInfo',
};

// ── Public types ──────────────────────────────────────────────────────────────

export interface GeneratedEncoders {
    /** All generated encoder function source code, ready to embed in a file. */
    code: string;
    /** Structure type names that must be imported from the types file. */
    typeImports: string[];
    /** Enum type names that must be imported from the enums file. */
    enumImports: string[];
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Generate encoder functions for all structure/abstract types in the model.
 *
 * @param types           All parsed types from the data model.
 * @param nodeIdToTypeName Map from node-id string to TypeScript identifier
 *                         (enums carry the `Enum` suffix, structs do not).
 * @param enumNodeIds      Set of node-id strings that belong to enumerations.
 * @param builtinAliases  Map from alias nodeId to TS type name for types that
 *                         are thin wrappers around a built-in scalar (e.g.
 *                         SessionAuthenticationToken i=388 → 'NodeId').
 * @returns Generated encoder code and the import sets that the caller needs
 *          to turn into import statements.
 */
export function generateEncoders(
    types: ParsedType[],
    nodeIdToTypeName: ReadonlyMap<string, string>,
    enumNodeIds: ReadonlySet<string>,
    builtinAliases: ReadonlyMap<string, string> = new Map(),
): GeneratedEncoders {
    const structTypes = types.filter(
        (t) => t.category === 'structure' || t.category === 'abstract',
    );
    const sorted = sortByInheritance(structTypes);

    // Build a quick-lookup set of structure node ids so that field types that
    // resolve to a peer struct can be dispatched to their encode function.
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

        // Insert base class encoder call if applicable
        const parentTypeName = getParentTypeName(type);
        if (parentTypeName) {
            usedTypeNames.add(parentTypeName);
            fieldLines.push(`    encode${parentTypeName}(encoder, value, enc); // encode base class`);
        }

        if (hasOptional) {
            const optionalFields = fields.filter((f) => f.isOptional);
            fieldLines.push(`    let encodingMask = 0;`);
            for (let i = 0; i < optionalFields.length; i++) {
                fieldLines.push(`    if (value.${optionalFields[i].name} != null) encodingMask |= (1 << ${i});`);
            }
            fieldLines.push(`    encoder.writeUInt32(encodingMask);`);
        }

        let optionalBitIndex = 0;
        for (const field of fields) {
            const bitIndex = field.isOptional ? optionalBitIndex++ : -1;
            const call = buildWriteCall(
                field.name,
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
            if (call === null) {
                continue;
            }
            const isEnum = enumNodeIds.has(field.dataTypeNodeId);
            const commentParts: string[] = [];
            if (field.isOptional) commentParts.push('optional');
            if (isEnum) commentParts.push('enum');
            const comment = commentParts.length > 0 ? ` // ${commentParts.join(', ')}` : '';
            if (field.isOptional) {
                fieldLines.push(`    if (encodingMask & (1 << ${bitIndex})) { ${call}; }${comment}`);
            } else {
                fieldLines.push(`    ${call};${comment}`);
            }
        }
        const funcName = `encode${type.safeName}`;
        functions.push(
            [
                `export function ${funcName}(encoder: IWriter, value: ${type.safeName}, enc: Encoder): void {`,
                ...fieldLines,
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
 * Build the write call expression for a single field (no semicolon, no comment).
 *
 * For optional fields `isOptional` causes a `!` non-null assertion on the
 * value expression, since the caller wraps this in an encoding-mask guard.
 *
 * When `isArray` is true the expression uses `encoder.writeArray(…)`.
 * Returns `null` when the field type cannot be resolved (unknown type).
 */
function buildWriteCall(
    fieldName: string,
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
    // For optional fields inside the if-guard we know the value is non-null.
    const fieldExpr = isOptional ? `value.${fieldName}!` : `value.${fieldName}`;

    if (isArray) {
        const inner = resolveElementCall(
            dataTypeNodeId,
            'e',
            'v',
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

        return `encoder.writeArray(${fieldExpr}, (e, v) => ${inner})`;
    }

    return resolveElementCall(
        dataTypeNodeId,
        'encoder',
        fieldExpr,
        nodeIdToTypeName,
        enumNodeIds,
        structNodeIds,
        usedEnumNames,
        usedTypeNames,
        builtinAliases,
    );
}

/**
 * Produce the call expression (with the given `encoderVar` and `valueExpr`)
 * that writes a single, non-array field value.
 *
 * Resolution order:
 *  1. Built-in OPC UA scalar types (i=1 … i=25)
 *  2. Enumeration types (cast writeUInt32)
 *  3. Structure types from the nodeset (peer encode function)
 *
 * Returns `null` when the type cannot be resolved.
 */
function resolveElementCall(
    dataTypeNodeId: string,
    encoderVar: string,
    valueExpr: string,
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
        const method = BUILTIN_ENCODER_METHOD[n];

        if (method) {
            // writeExtensionObject (22), writeDataValue (23), writeVariant (24) need Encoder
            if (n === 22 || n === 23 || n === 24) {
                return `${encoderVar}.${method}(${valueExpr}, enc)`;
            }
            return `${encoderVar}.${method}(${valueExpr})`;
        }
    }

    // 2. Enumeration – write as UInt32
    if (enumNodeIds.has(dataTypeNodeId)) {
        const enumName = nodeIdToTypeName.get(dataTypeNodeId);

        if (enumName) {
            usedEnumNames.add(enumName);
            return `${encoderVar}.writeUInt32(${valueExpr})`; // enum
        }
    }

    // 3. Peer structure type – delegate to its encode function
    if (structNodeIds.has(dataTypeNodeId)) {
        const typeName = nodeIdToTypeName.get(dataTypeNodeId);

        if (typeName) {
            usedTypeNames.add(typeName);
            return `encode${typeName}(${encoderVar}, ${valueExpr}, enc)`;
        }
    }

    // 4. Built-in alias (e.g. SessionAuthenticationToken i=388 → NodeId i=17)
    //    builtinAliases stores aliasNodeId → builtinNodeId; resolve directly
    //    via BUILTIN_ENCODER_METHOD, no TS name indirection needed.
    const builtinNodeId = builtinAliases.get(dataTypeNodeId);
    if (builtinNodeId !== undefined) {
        const aliasMatch = /^i=(\d+)$/.exec(builtinNodeId);
        if (aliasMatch) {
            const n = parseInt(aliasMatch[1], 10);
            const method = BUILTIN_ENCODER_METHOD[n];
            if (method) {
                if (n === 22 || n === 23 || n === 24) {
                    return `${encoderVar}.${method}(${valueExpr}, enc)`;
                }
                return `${encoderVar}.${method}(${valueExpr})`;
            }
        }
    }

    // Unknown / unresolvable type
    return null;
}
