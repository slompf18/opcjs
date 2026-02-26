/**
 * NodeIds CSV Parser
 *
 * Parses a NodeIds.csv file (three columns: Name,Id,NodeClass) and builds a
 * per-type lookup of the four relevant IDs required by IOpcType:
 *
 *  - typeId             – row where Name === typeName
 *  - binaryEncodingId   – row where Name === `{typeName}_Encoding_DefaultBinary`
 *  - xmlEncodingId      – row where Name === `{typeName}_Encoding_DefaultXml`
 *  - jsonEncodingId     – row where Name === `{typeName}_Encoding_DefaultJson`
 *
 * @packageDocumentation
 */

/** All four encoding IDs associated with one type. */
export interface TypeNodeIds {
    typeId?: number;
    binaryEncodingId?: number;
    xmlEncodingId?: number;
    jsonEncodingId?: number;
}

/**
 * Immutable lookup table built from a NodeIds.csv file.
 * Key: type name (BrowseName / SymbolicName, as it appears in the first column).
 */
export type NodeIdsMap = ReadonlyMap<string, TypeNodeIds>;

// Suffix constants
const SUFFIX_BINARY = '_Encoding_DefaultBinary';
const SUFFIX_XML    = '_Encoding_DefaultXml';
const SUFFIX_JSON   = '_Encoding_DefaultJson';

/**
 * Parse the text content of a NodeIds.csv file and return a {@link NodeIdsMap}.
 *
 * Lines that do not match the expected `Name,Id,NodeClass` format are silently
 * skipped so that the parser is tolerant of header lines or blank lines.
 *
 * @param csvContent - Full text content of a NodeIds.csv file
 * @returns Lookup map from type name to its four OPC UA encoding IDs
 */
export function parseNodeIdsCsv(csvContent: string): NodeIdsMap {
    // Mutable accumulator – keyed by the *base* type name (without suffix).
    const acc = new Map<string, {
        typeId?: number;
        binaryEncodingId?: number;
        xmlEncodingId?: number;
        jsonEncodingId?: number;
    }>();

    const lines = csvContent.split(/\r?\n/);

    for (const raw of lines) {
        const line = raw.trim();
        if (!line) continue;

        // CSV format is exactly three comma-separated fields; the name itself
        // never contains commas in the OPC UA standard NodeIds files.
        const commaIndex = line.indexOf(',');
        if (commaIndex === -1) continue;

        const name    = line.slice(0, commaIndex).trim();
        const rest    = line.slice(commaIndex + 1);
        const comma2  = rest.indexOf(',');
        if (comma2 === -1) continue;

        const rawId   = rest.slice(0, comma2).trim();
        const id      = parseInt(rawId, 10);
        if (isNaN(id)) continue;

        // Classify by suffix
        if (name.endsWith(SUFFIX_BINARY)) {
            const base = name.slice(0, name.length - SUFFIX_BINARY.length);
            getOrCreate(acc, base).binaryEncodingId = id;
        } else if (name.endsWith(SUFFIX_XML)) {
            const base = name.slice(0, name.length - SUFFIX_XML.length);
            getOrCreate(acc, base).xmlEncodingId = id;
        } else if (name.endsWith(SUFFIX_JSON)) {
            const base = name.slice(0, name.length - SUFFIX_JSON.length);
            getOrCreate(acc, base).jsonEncodingId = id;
        } else {
            // Plain type name – store as typeId.
            getOrCreate(acc, name).typeId = id;
        }
    }

    return acc as NodeIdsMap;
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function getOrCreate(
    map: Map<string, TypeNodeIds>,
    key: string,
): TypeNodeIds {
    let entry = map.get(key);
    if (!entry) {
        entry = {};
        map.set(key, entry);
    }
    return entry;
}
