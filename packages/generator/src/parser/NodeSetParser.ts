/**
 * NodeSet XML Parser
 *
 * Parses an OPC UA NodeSet2 XML file and transforms UADataType nodes into a
 * language-neutral ParsedDataModel that the TypeScript generator consumes.
 *
 * Supported categorisation:
 *  - enumeration  – type descends from i=29 (Enumeration) and has Definition/Field with @Value
 *  - structure    – type descends from i=22 (Structure) and is not abstract
 *  - abstract     – type descends from i=22 (Structure) and IsAbstract="true"
 *
 * @see OPC 10000-3 Part 3 – NodeSet2 schema
 * @packageDocumentation
 */

import { XMLParser } from 'fast-xml-parser';
import type { ParsedDataModel, ParsedEnumMember, ParsedField, ParsedType } from './types/DataModel.js';
import type { NodeIdsMap } from './NodeIdsCsvParser.js';

// ── Well-known OPC UA namespace-0 base type NodeIds ──────────────────────────

/** NodeId of the abstract Enumeration base type */
const ENUMERATION_BASE = 'i=29';

/** NodeId of the abstract Structure base type */
const STRUCTURE_BASE = 'i=22';

// ── Raw XML shape types ───────────────────────────────────────────────────────

interface RawField {
    '@_Name': string;
    '@_Value'?: string;
    '@_DataType'?: string;
    '@_ValueRank'?: string;
    '@_IsOptional'?: string;
    DisplayName?: unknown;
}

interface RawReference {
    '@_ReferenceType': string;
    '@_IsForward'?: string;
    '#text': string;
}

interface RawDefinition {
    '@_Name': string;
    '@_IsUnion'?: string;
    Field?: RawField | RawField[];
}

interface RawUADataType {
    '@_NodeId': string;
    '@_BrowseName': string;
    '@_IsAbstract'?: string;
    '@_ReleaseStatus'?: string;
    DisplayName?: unknown;
    References?: {
        Reference?: RawReference | RawReference[];
    };
    Definition?: RawDefinition;
}

interface RawAlias {
    '@_Alias': string;
    '#text': string;
}

interface RawNodeSet {
    UANodeSet?: {
        Aliases?: {
            Alias?: RawAlias | RawAlias[];
        };
        UADataType?: RawUADataType | RawUADataType[];
    };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Normalise a NodeId string: strips an explicit `ns=0;` prefix since
 * namespace 0 is the default OPC UA namespace and is usually omitted.
 */
function normalizeNodeId(nodeId: string): string {
    const trimmed = nodeId.trim();
    return trimmed.startsWith('ns=0;') ? trimmed.slice(5) : trimmed;
}

/**
 * Extract the local name from a BrowseName, discarding any `ns=N;` prefix.
 * e.g. `ns=2;TypeName` → `TypeName`, `TypeName` → `TypeName`
 */
function extractBrowseName(browseName: string): string {
    const semi = browseName.indexOf(';');
    return semi !== -1 ? browseName.slice(semi + 1) : browseName;
}

/**
 * Convert an arbitrary string to a valid TypeScript identifier.
 * Replaces non-alphanumeric/underscore/dollar characters with `_`,
 * and prepends `_` if the result starts with a digit.
 */
function toSafeName(name: string): string {
    let safe = name.replace(/[^a-zA-Z0-9_$]/g, '_');
    if (/^[0-9]/.test(safe)) {
        safe = `_${safe}`;
    }
    return safe || '_';
}

/** Normalise a possibly-singular value to an array. */
function asArray<T>(val: T | T[] | undefined): T[] {
    if (val === undefined || val === null) {
        return [];
    }
    return Array.isArray(val) ? val : [val];
}

/**
 * Return true when `ref` encodes a HasSubtype reverse reference, i.e. the
 * reference that points from a derived type back to its parent type.
 */
function isHasSubtypeReverse(ref: RawReference): boolean {
    return ref['@_ReferenceType'] === 'HasSubtype' && ref['@_IsForward'] === 'false';
}

/**
 * Walk the parent chain upward from `startId` looking for `targetId`.
 * The `parentMap` only stores *direct* parents (undefined = no parent).
 * A visited set guards against potential cycles in malformed nodesets.
 */
function hasAncestor(
    startId: string,
    targetId: string,
    parentMap: ReadonlyMap<string, string | undefined>,
): boolean {
    const visited = new Set<string>();
    let current: string | undefined = startId;

    while (current !== undefined) {
        if (current === targetId) {
            return true;
        }
        if (visited.has(current)) {
            break; // cycle guard
        }
        visited.add(current);
        current = parentMap.get(current);
    }

    return false;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Parse a NodeSet2 XML string and return a {@link ParsedDataModel}.
 *
 * Only `UADataType` nodes that descend from `Enumeration` (i=29) or
 * `Structure` (i=22) are included. Primitive built-in scalars (Boolean,
 * Int32, String, …) and unrelated types are silently skipped.
 *
 * @param xmlContent - Full text of a NodeSet2 XML file
 * @param nodeIdsMap - Optional lookup table built from NodeIds.csv; when supplied
 *   the parser populates `typeId`, `binaryEncodingId`, `xmlEncodingId`, and
 *   `jsonEncodingId` on every generated {@link ParsedType}.
 * @returns Parsed data model ready for the TypeScript generator
 */
export function parseNodeSet(xmlContent: string, nodeIdsMap?: NodeIdsMap): ParsedDataModel {
    const xmlParser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        // Ensure these tags are always parsed as arrays, even when singular.
        isArray: (tagName) => ['UADataType', 'Reference', 'Field', 'Alias'].includes(tagName),
        parseAttributeValue: false,
        trimValues: true,
    });

    const root = xmlParser.parse(xmlContent) as RawNodeSet;
    const nodeSet = root.UANodeSet;

    if (!nodeSet) {
        return { types: [], builtinAliases: new Map(), builtinAliasToTs: new Map() };
    }

    // ── Build alias map from <Aliases> section ────────────────────────────────
    // Maps alias names (e.g. "NodeId", "DateTime") to normalised nodeId strings
    // (e.g. "i=17", "i=13") so that DataType attributes using alias names can
    // be resolved to their canonical i=N form.
    const aliasMap = new Map<string, string>();
    for (const alias of asArray(nodeSet.Aliases?.Alias)) {
        const name = alias['@_Alias']?.trim();
        const nodeId = normalizeNodeId(alias['#text'] ?? '');
        if (name && nodeId) {
            aliasMap.set(name, nodeId);
        }
    }

    /**
     * Resolve a DataType attribute value which may either be an "i=N" nodeId
     * or an alias name defined in the <Aliases> section.
     */
    function resolveDataType(raw: string): string {
        const trimmed = raw.trim();
        // Already a nodeId (i=N, ns=X;i=N, g=…, s=…, b=…)
        if (/^(i=|ns=|g=|s=|b=)/.test(trimmed)) {
            return normalizeNodeId(trimmed);
        }
        // Alias name lookup
        const resolved = aliasMap.get(trimmed);
        return resolved ?? trimmed;
    }

    const rawTypes = asArray(nodeSet.UADataType);

    // ── Pass 1: build a nodeId → direct-parent-nodeId map ────────────────────
    const parentMap = new Map<string, string | undefined>();

    for (const rawType of rawTypes) {
        const nodeId = normalizeNodeId(rawType['@_NodeId']);
        if (!nodeId) continue;

        const refs = asArray(rawType.References?.Reference);
        const parentRef = refs.find(isHasSubtypeReverse);
        parentMap.set(nodeId, parentRef ? normalizeNodeId(parentRef['#text']) : undefined);
    }

    // ── Pass 2: classify and produce ParsedType entries ───────────────────────
    const types: ParsedType[] = [];

    for (const rawType of rawTypes) {
        const nodeId = normalizeNodeId(rawType['@_NodeId']);
        if (!nodeId) continue;

        const browseName = extractBrowseName(rawType['@_BrowseName']);
        if (!browseName) continue;

        // Skip the abstract base types themselves to avoid self-referential output.
        if (nodeId === ENUMERATION_BASE || nodeId === STRUCTURE_BASE) continue;

        const isAbstract = rawType['@_IsAbstract'] === 'true';
        const isEnum = hasAncestor(nodeId, ENUMERATION_BASE, parentMap);
        const isStructure = !isEnum && hasAncestor(nodeId, STRUCTURE_BASE, parentMap);

        // Skip primitive scalars and unrelated type hierarchies.
        if (!isEnum && !isStructure) continue;

        // ── Extract enum members ──────────────────────────────────────────────
        let enumMembers: ParsedEnumMember[] | undefined;
        let structFields: ParsedField[] | undefined;

        if (isEnum && rawType.Definition) {
            const fields = asArray(rawType.Definition.Field);
            const members: ParsedEnumMember[] = fields
                .filter((f) => f['@_Value'] !== undefined)
                .map((f) => ({
                    name: toSafeName(f['@_Name']),
                    value: parseInt(f['@_Value'] ?? '0', 10),
                }));

            // Only keep enumerations that have at least one concrete member.
            if (members.length === 0) continue;

            enumMembers = members;
        } else if (isEnum) {
            // Enumeration without a Definition block – skip (abstract base or
            // forward-declared without values).
            continue;
        }

        // ── Extract structure fields ──────────────────────────────────────────
        if (isStructure && rawType.Definition) {
            const fields = asArray(rawType.Definition.Field);
            structFields = fields
                .filter((f) => f['@_Value'] === undefined) // skip enum-style fields
                .map((f): ParsedField => {
                    const rawName = f['@_Name'];
                    // Convert PascalCase OPC UA name to camelCase
                    const camelName = rawName.charAt(0).toLowerCase() + rawName.slice(1);
                    const dataTypeNodeId = f['@_DataType'] ? resolveDataType(f['@_DataType']) : 'i=24'; // default Variant
                    const valueRank = parseInt(f['@_ValueRank'] ?? '-1', 10);
                    const isArray = valueRank >= 1;
                    const isOptional = f['@_IsOptional'] === 'true';
                    return { name: camelName, dataTypeNodeId, isArray, isOptional };
                });
        }

        // ── Determine category ────────────────────────────────────────────────
        let category: 'enumeration' | 'structure' | 'abstract';

        if (isEnum) {
            category = 'enumeration';
        } else if (isAbstract) {
            category = 'abstract';
        } else {
            category = 'structure';
        }

        // Look up encoding IDs from the optional NodeIds map.
        const nodeIds = nodeIdsMap?.get(browseName);

        types.push({
            nodeId,
            browseName,
            safeName: toSafeName(browseName),
            category,
            isAbstract,
            parentNodeId: parentMap.get(nodeId),
            enumMembers,
            fields: structFields,
            typeId: nodeIds?.typeId,
            binaryEncodingId: nodeIds?.binaryEncodingId,
            xmlEncodingId: nodeIds?.xmlEncodingId,
            jsonEncodingId: nodeIds?.jsonEncodingId,
        });
    }

    // ── Pass 3: resolve built-in subtype aliases ──────────────────────────────
    // Some OPC UA types are thin aliases of built-in scalar types (e.g.
    // SessionAuthenticationToken i=388 is a HasSubtype child of NodeId i=17).
    // The parser never emits them as generated classes, but they can appear as
    // field DataTypes inside structures.  Pre-compute a nodeId → builtinNodeId
    // map for all such aliases so the generator can resolve field types and
    // select the correct binary codec methods.
    const BUILTIN_NODE_TO_TS = new Map<string, string>([
        ['i=1',  'boolean'],
        ['i=2',  'number'],
        ['i=3',  'number'],
        ['i=4',  'number'],
        ['i=5',  'number'],
        ['i=6',  'number'],
        ['i=7',  'number'],
        ['i=8',  'bigint'],
        ['i=9',  'bigint'],
        ['i=10', 'number'],
        ['i=11', 'number'],
        ['i=12', 'UaString'],
        ['i=13', 'Date'],
        ['i=14', 'string'],
        ['i=15', 'UaByteString'],
        ['i=16', 'XmlElement'],
        ['i=17', 'NodeId'],
        ['i=18', 'ExpandedNodeId'],
        ['i=19', 'StatusCode'],
        ['i=20', 'QualifiedName'],
        ['i=21', 'LocalizedText'],
        ['i=22', 'ExtensionObject'],
        ['i=23', 'DataValue'],
        ['i=24', 'Variant'],
        ['i=25', 'DiagnosticInfo'],
    ]);

    const emittedNodeIds = new Set(types.map((t) => t.nodeId));
    // builtinAliases: aliasNodeId → builtinNodeId (e.g. 'i=388' → 'i=17')
    const builtinAliases = new Map<string, string>();
    // builtinAliasToTs: aliasNodeId → TS type name (e.g. 'i=388' → 'NodeId')
    // Used to seed the nodeIdToTypeName map for struct field type generation.
    const builtinAliasToTs = new Map<string, string>();

    for (const [nodeId] of parentMap) {
        // Already emitted as a structure/enum – the generator knows about it.
        if (emittedNodeIds.has(nodeId)) continue;
        // Is itself a well-known built-in – not an alias.
        if (BUILTIN_NODE_TO_TS.has(nodeId)) continue;

        // Walk up the ancestor chain to find a built-in parent.
        const visited = new Set<string>();
        let current: string | undefined = parentMap.get(nodeId);
        while (current !== undefined) {
            if (BUILTIN_NODE_TO_TS.has(current)) {
                // Store the actual builtin nodeId for precise codec method lookup.
                builtinAliases.set(nodeId, current);
                // Also store the TS name for struct field type generation.
                builtinAliasToTs.set(nodeId, BUILTIN_NODE_TO_TS.get(current)!);
                break;
            }
            if (visited.has(current)) break; // cycle guard
            visited.add(current);
            current = parentMap.get(current);
        }
    }

    return { types, builtinAliases, builtinAliasToTs };
}
