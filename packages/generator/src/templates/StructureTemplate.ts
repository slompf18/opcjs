/**
 * Structure Template - Generate TypeScript class
 *
 * Generates TypeScript class declarations from ParsedType data.
 * Includes inheritance using extends keyword and IOpcType implementation
 * with getTypeId(), getBinaryEncodingId(), getXmlEncodingId(),
 * and getJsonEncodingId() methods sourced from NodeIds.csv lookup.
 *
 * @packageDocumentation
 */

import { ParsedType } from '../types/DataModel.js';

// ── Built-in OPC UA NodeId → TypeScript type name ─────────────────────────────

/**
 * Maps the numeric part of a built-in OPC UA node id (i=N) to its TypeScript
 * type name.  Types like `NodeId`, `StatusCode`, etc. are class names exported
 * from `@opcua/base`; primitive numbers/booleans/strings stay as native types.
 */
const BUILTIN_TS_TYPE: Record<number, string> = {
    1:  'boolean',          // Boolean
    2:  'number',           // SByte
    3:  'number',           // Byte
    4:  'number',           // Int16
    5:  'number',           // UInt16
    6:  'number',           // Int32
    7:  'number',           // UInt32
    8:  'bigint',           // Int64
    9:  'bigint',           // UInt64
    10: 'number',           // Float
    11: 'number',           // Double
    12: 'UaString',        // String (nullable per OPC UA spec)
    13: 'Date',             // DateTime
    14: 'string',           // Guid (UUID)
    15: 'UaByteString',     // ByteString (nullable per OPC UA spec)
    16: 'XmlElement',       // XmlElement
    17: 'NodeId',           // NodeId
    18: 'ExpandedNodeId',   // ExpandedNodeId
    19: 'StatusCode',       // StatusCode
    20: 'QualifiedName',    // QualifiedName
    21: 'LocalizedText',    // LocalizedText
    22: 'ExtensionObject',  // ExtensionObject / Structure base
    23: 'DataValue',        // DataValue
    24: 'Variant',          // Variant
    25: 'DiagnosticInfo',   // DiagnosticInfo
};

/**
 * Resolve a field's OPC UA DataType NodeId to a TypeScript type name.
 *
 * Resolution order:
 *  1. Built-in OPC UA scalar types  (i=1 … i=25)
 *  2. Types found in the compiled NodeSet model  (nodeIdToTypeName map)
 *  3. Fallback: `unknown`
 *
 * @param dataTypeNodeId - Normalised NodeId string, e.g. `"i=308"`
 * @param nodeIdToTypeName - Maps parsed-type NodeIds to their TypeScript safe names
 */
function resolveFieldTsType(
    dataTypeNodeId: string,
    nodeIdToTypeName: ReadonlyMap<string, string>,
): string {
    // Numeric built-in
    const match = /^i=(\d+)$/.exec(dataTypeNodeId);
    if (match) {
        const n = parseInt(match[1], 10);
        if (Object.prototype.hasOwnProperty.call(BUILTIN_TS_TYPE, n)) {
            return BUILTIN_TS_TYPE[n];
        }
    }

    // Parsed structure / enum
    const name = nodeIdToTypeName.get(dataTypeNodeId);
    if (name) {
        return name;
    }

    return 'unknown';
}

/**
 * Generate TypeScript class code
 *
 * @param type - The parsed structure or abstract type
 * @param parentTypeName - Optional parent type name for extends clause
 * @param nodeIdToTypeName - Optional map from NodeId to TypeScript type name for field resolution
 * @returns TypeScript class source code
 */
export function generateStructure(
    type: ParsedType,
    parentTypeName?: string,
    nodeIdToTypeName?: ReadonlyMap<string, string>,
): string {
    if (type.category !== 'structure' && type.category !== 'abstract') {
        throw new Error(`Cannot generate structure for type ${type.browseName} with category ${type.category}`);
    }

    // Determine parent class (default to Structure if no parent specified)
    const extendsClause = parentTypeName ?? 'Structure';

    // Generate optional parent info in JSDoc
    const parentInfo = parentTypeName ? `\n * Extends: ${parentTypeName}` : '';

    // Build the four IOpcType method bodies
    const typeId           = type.typeId           ?? 0;
    const binaryEncodingId = type.binaryEncodingId ?? 0;
    const xmlEncodingId    = type.xmlEncodingId    ?? 0;
    const jsonEncodingId   = type.jsonEncodingId   ?? 0;

    const typeIdsBlock = [
        `  getTypeId(): number { return ${typeId}; }`,
        `  getBinaryEncodingId(): number { return ${binaryEncodingId}; }`,
        `  getXmlEncodingId(): number { return ${xmlEncodingId}; }`,
        `  getJsonEncodingId(): number { return ${jsonEncodingId}; }`,
    ].join('\n');

    // Build constructor if there are fields
    const resolveMap = nodeIdToTypeName ?? new Map<string, string>();
    const fields = type.fields ?? [];

    let fieldsBlock = '';
    if (fields.length > 0) {
        const params = fields.map((f) => {
            const baseType = resolveFieldTsType(f.dataTypeNodeId, resolveMap);
            // Parenthesize union base types to avoid `string | null[]` being parsed
            // as `string | (null[])` by TypeScript. We want `(string | null)[]`.
            const arrayBase = f.isArray && baseType.includes('|') ? `(${baseType})` : baseType;
            const tsType   = f.isArray ? `${arrayBase}[]` : baseType;
            const fullType = f.isOptional ? `${tsType} | null` : tsType;
            const defaultVal = f.isOptional ? ' = null' : '';
            const modifier = f.isOptional ? '?' : '!';
            return `  public ${f.name}${modifier}: ${fullType}${defaultVal}`;
        });

        fieldsBlock = `\n${params.join(';\n')};\n`;
    }

    return `/**
 * ${type.browseName}
 * NodeId: ${type.nodeId || 'unknown'}${parentInfo}
 */
export class ${type.safeName} extends ${extendsClause} implements IOpcType {
${fieldsBlock}
${typeIdsBlock}
}`;
}
