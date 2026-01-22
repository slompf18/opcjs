#!/usr/bin/env node

// OPC UA Services generator
// Converts schema/Opc.Ua.NodeSet2.Services.xml into TypeScript classes/enums with encode/decode helpers.

const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_INPUT = path.resolve(ROOT, 'nodeSets/schema/Opc.Ua.NodeSet2.Services.xml');
const DEFAULT_NODEIDS_CSV = path.resolve(ROOT, 'nodeSets/schema/NodeIds.csv');
const DEFAULT_OUT_DIR = path.resolve(ROOT, 'nodeSets/types');
const CODEC_OUT_DIR = path.resolve(ROOT, 'nodeSets');
let enumNameSet = new Set();
let nodeIdsMap = new Map(); // typeName -> nodeId

function parseArgs(argv) {
    const args = {};
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg.startsWith('--')) {
            const key = arg;
            const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
            args[key] = value;
        }
    }
    return args;
}

function parseNodeIds(csvPath) {
    const nodeIds = new Map();
    if (!fs.existsSync(csvPath)) {
        console.warn(`NodeIds.csv not found at ${csvPath}, skipping ID assignment`);
        return nodeIds;
    }
    
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        const parts = trimmed.split(',');
        if (parts.length >= 3) {
            const typeName = parts[0].trim();
            const nodeId = parts[1].trim();
            const nodeClass = parts[2].trim();
            
            // Store DataType entries
            if (nodeClass === 'DataType') {
                nodeIds.set(typeName, parseInt(nodeId, 10));
            }
            // Also store Encoding_DefaultBinary entries for encoder IDs
            if (typeName.endsWith('_Encoding_DefaultBinary')) {
                const baseTypeName = typeName.replace('_Encoding_DefaultBinary', '');
                nodeIds.set(baseTypeName + '_EncoderId', parseInt(nodeId, 10));
            }
        }
    }
    
    return nodeIds;
}

function ensureArray(value) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

function normalizeName(name) {
    if (!name) return '';
    const parts = String(name).split(':');
    let normalized = parts[parts.length - 1];
    
    // Replace leading numbers with word equivalents
    const numberWords = {
        '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
        '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
    };
    
    // Replace leading digits
    normalized = normalized.replace(/^(\d+)/, (match) => {
        return match.split('').map(digit => numberWords[digit]).join('');
    });
    
    return normalized;
}

function normalizeNodeId(id) {
    if (!id) return '';
    return String(id).replace(/^ns=0;/, '').trim();
}

function toFileName(typeName) {
    return typeName.charAt(0).toLowerCase() + typeName.slice(1) + '.ts';
}

function renderedTypeName(typeName, enumNames) {
    return enumNames.has(typeName) ? `${typeName}Enum` : typeName;
}

function gatherAliases(aliasesNode) {
    const aliasEntries = ensureArray(aliasesNode?.Alias);
    const aliasToId = {};
    const idToAlias = {};
    for (const entry of aliasEntries) {
        const name = entry['@_Alias'];
        const value = entry['#text'] || entry;
        aliasToId[name] = value;
        idToAlias[normalizeNodeId(value)] = name;
    }
    return { aliasToId, idToAlias };
}

function resolveType(ref, { nodeIdToName, idToAlias }) {
    if (!ref) return 'Variant'; // Fields without DataType are Variant
    const cleaned = normalizeNodeId(ref);
    if (idToAlias[cleaned]) return idToAlias[cleaned];
    if (nodeIdToName[cleaned]) return nodeIdToName[cleaned];
    if (cleaned.startsWith('i=')) return cleaned; // unknown but keep
    if (ref.includes(':')) return normalizeName(ref);
    return ref;
}

function isArrayField(field) {
    const rank = field['@_ValueRank'];
    if (rank === undefined || rank === null) return false;
    const numeric = Number(rank);
    return Number.isFinite(numeric) ? numeric >= 1 : true;
}

function parseDataTypes(nodeSet) {
    const { idToAlias } = gatherAliases(nodeSet.Aliases);
    const dataTypesRaw = ensureArray(nodeSet.UADataType);
    const nodeIdToName = {};
    for (const dt of dataTypesRaw) {
        const nodeId = normalizeNodeId(dt['@_NodeId']);
        // Prefer SymbolicName over BrowseName (SymbolicName is the valid identifier)
        const name = normalizeName(dt['@_SymbolicName'] || dt['@_BrowseName']);
        if (nodeId) nodeIdToName[nodeId] = name;
    }

    const parsed = [];
    for (const dt of dataTypesRaw) {
        const definition = dt.Definition;
        if (!definition) continue;
        const fieldsRaw = ensureArray(definition.Field);
        
        // Prefer SymbolicName over BrowseName for the type name
        const name = normalizeName(dt['@_SymbolicName'] || dt['@_BrowseName']);
        const doc = dt.Documentation || dt.Description || dt.DisplayName || '';
        const isAbstract = dt['@_IsAbstract'] === 'true' || dt['@_IsAbstract'] === true;
        
        // Handle abstract types with no fields
        if (!fieldsRaw.length) {
            if (isAbstract) {
                // Create an abstract placeholder structure
                parsed.push({ name, doc, kind: 'structure', fields: [], isAbstract: true });
            }
            continue;
        }

        const fields = fieldsRaw.map(f => {
            const typeRef = f['@_DataType'] || f['@_TypeName'];
            const typeName = resolveType(typeRef, { nodeIdToName, idToAlias });
            return {
                name: f['@_Name'],
                type: typeName,
                isArray: isArrayField(f),
                isOptional: f['@_IsOptional'] === true || f['@_IsOptional'] === 'true',
                value: f['@_Value'] !== undefined ? Number(f['@_Value']) : undefined,
                doc: f.Description || f.Documentation || ''
            };
        });

        const kind = fields.some(f => f.value !== undefined) ? 'enum' : 'structure';
        parsed.push({ name, doc, kind, fields, isAbstract });
    }

    return parsed;
}

const builtInMap = {
    Boolean: { tsType: 'boolean', decode: 'reader.readBoolean()', encode: v => `writer.writeBoolean(${v})` },
    SByte: { tsType: 'number', decode: 'reader.readInt8()', encode: v => `writer.writeInt8(${v})` },
    Byte: { tsType: 'UInt8', decode: 'reader.readUInt8()', encode: v => `writer.writeUint8(${v})`, base: 'UInt8' },
    Int16: { tsType: 'Int16', decode: 'reader.readInt16()', encode: v => `writer.writeInt16(${v})`, base: 'Int16' },
    UInt16: { tsType: 'UInt16', decode: 'reader.readUInt16()', encode: v => `writer.writeUInt16(${v})`, base: 'UInt16' },
    Int32: { tsType: 'Int32', decode: 'reader.readInt32()', encode: v => `writer.writeInt32(${v})`, base: 'Int32' },
    UInt32: { tsType: 'UInt32', decode: 'reader.readUInt32()', encode: v => `writer.writeUInt32(${v})`, base: 'UInt32' },
    Int64: { tsType: 'Int64', decode: 'reader.readInt64()', encode: v => `writer.writeInt64(${v})`, base: 'Int64' },
    UInt64: { tsType: 'UInt64', decode: 'reader.readUInt64()', encode: v => `writer.writeUInt64(${v})`, base: 'UInt64' },
    Float: { tsType: 'Float32', decode: 'reader.readFloat32()', encode: v => `writer.writeFloat32(${v})`, base: 'Float32' },
    Double: { tsType: 'Float64', decode: 'reader.readFloat64()', encode: v => `writer.writeFloat64(${v})`, base: 'Float64' },
    String: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    DateTime: { tsType: 'Date', decode: 'reader.readDateTime()', encode: v => `writer.writeDateTime(${v})` },
    Guid: { tsType: 'Guid', decode: 'reader.readGuid()', encode: v => `writer.writeGuid(${v})`, importPath: 'types/guid' },
    ByteString: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    NodeId: { tsType: 'NodeId', decode: 'reader.readNodeId()', encode: v => `${v}.encode(writer)`, importPath: 'types/nodeId' },
    ExpandedNodeId: { tsType: 'ExpandedNodeId', decode: 'reader.readExpandedNodeId()', encode: v => `${v}.encode(writer)`, importPath: 'types/expandedNodeId' },
    QualifiedName: { tsType: 'QualifiedName', decode: 'reader.readQualifiedName()', encode: v => `${v}.encode(writer)`, importPath: 'types/qualifiedName' },
    LocalizedText: { tsType: 'LocalizedText', decode: 'reader.readLocalizedText()', encode: v => `${v}.encode(writer)`, importPath: 'types/localizedText' },
    StatusCode: { tsType: 'StatusCode', decode: 'reader.readStatusCode()', encode: v => `${v}.encode(writer)`, importPath: 'types/statusCode' },
    ExtensionObject: { tsType: 'ExtensionObject', decode: 'reader.readExtensionObject()', encode: v => `${v}.encode(writer)`, importPath: 'types/extensionObject' },
    XmlElement: { tsType: 'XmlElement', decode: 'reader.readXmlElement()', encode: v => `${v}.encode(writer)`, importPath: 'types/xmlElement' },
    DiagnosticInfo: { tsType: 'DiagnosticInfo', decode: 'reader.readDiagnosticInfo()', encode: v => `${v}.encode(writer)`, importPath: 'types/diagnosticInfo' },
    DataValue: { tsType: 'DataValue', decode: 'reader.readDataValue()', encode: v => `${v}.encode(writer)`, importPath: 'types/dataValue' },
    Variant: { tsType: 'Variant', decode: 'reader.readVariant()', encode: v => `${v}.encode(writer)`, importPath: 'types/variant' },
    // Type aliases - primitives
    Duration: { tsType: 'Float64', decode: 'reader.readFloat64()', encode: v => `writer.writeFloat64(${v})`, base: 'Float64' },
    UtcTime: { tsType: 'Date', decode: 'reader.readDateTime()', encode: v => `writer.writeDateTime(${v})` },
    IntegerId: { tsType: 'UInt32', decode: 'reader.readUInt32()', encode: v => `writer.writeUInt32(${v})`, base: 'UInt32' },
    Index: { tsType: 'UInt32', decode: 'reader.readUInt32()', encode: v => `writer.writeUInt32(${v})`, base: 'UInt32' },
    Counter: { tsType: 'UInt32', decode: 'reader.readUInt32()', encode: v => `writer.writeUInt32(${v})`, base: 'UInt32' },
    Handle: { tsType: 'UInt32', decode: 'reader.readUInt32()', encode: v => `writer.writeUInt32(${v})`, base: 'UInt32' },
    VersionTime: { tsType: 'UInt32', decode: 'reader.readUInt32()', encode: v => `writer.writeUInt32(${v})`, base: 'UInt32' },
    BitFieldMaskDataType: { tsType: 'UInt64', decode: 'reader.readUInt64()', encode: v => `writer.writeUInt64(${v})`, base: 'UInt64' },
    Decimal: { tsType: 'Float64', decode: 'reader.readFloat64()', encode: v => `writer.writeFloat64(${v})`, base: 'Float64' },
    // Type aliases - strings
    LocaleId: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    UriString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    NumericRange: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    SemanticVersionString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    TrimmedString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    EncodedTicket: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    NormalizedString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    DecimalString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    DurationString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    TimeString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    DateString: { tsType: 'string | undefined', decode: 'reader.readString()', encode: v => `writer.writeString(${v})` },
    // Type aliases - ByteString based
    ApplicationInstanceCertificate: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    ContinuationPoint: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    ImageBMP: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    ImageGIF: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    ImageJPG: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    ImagePNG: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    AudioDataType: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    // Type aliases - NodeId based
    SessionAuthenticationToken: { tsType: 'NodeId', decode: 'reader.readNodeId()', encode: v => `${v}.encode(writer)`, importPath: 'types/nodeId' },
    // Type aliases - ExtensionObject based
    Structure: { tsType: 'ExtensionObject', decode: 'reader.readExtensionObject()', encode: v => `${v}.encode(writer)`, importPath: 'types/extensionObject' },
    Guid: { tsType: 'Guid', decode: 'reader.readGuid()', encode: v => `writer.writeGuid(${v})`, importPath: 'types/guid' },
    ByteString: { tsType: 'ByteString', decode: 'reader.readByteString()', encode: v => `writer.writeByteString(${v})`, base: 'ByteString' },
    NodeId: { tsType: 'NodeId', decode: 'reader.readNodeId()', encode: v => `${v}.encode(writer)`, importPath: 'types/nodeId' },
    ExpandedNodeId: { tsType: 'ExpandedNodeId', decode: 'reader.readExpandedNodeId()', encode: v => `${v}.encode(writer)`, importPath: 'types/expandedNodeId' },
    QualifiedName: { tsType: 'QualifiedName', decode: 'reader.readQualifiedName()', encode: v => `${v}.encode(writer)`, importPath: 'types/qualifiedName' },
    LocalizedText: { tsType: 'LocalizedText', decode: 'reader.readLocalizedText()', encode: v => `${v}.encode(writer)`, importPath: 'types/localizedText' },
    StatusCode: { tsType: 'StatusCode', decode: 'reader.readStatusCode()', encode: v => `writer.writeStatusCode(${v})`, importPath: 'types/statusCode' },
    ExtensionObject: { tsType: 'ExtensionObject', decode: 'reader.readExtensionObject()', encode: v => `${v}.encode(writer)`, importPath: 'types/extensionObject' },
    XmlElement: { tsType: 'XmlElement', decode: 'reader.readXmlElement()', encode: v => `${v}.encode(writer)`, importPath: 'types/xmlElement' },
    DiagnosticInfo: { tsType: 'DiagnosticInfo', decode: 'reader.readDiagnosticInfo()', encode: v => `${v}.encode(writer)`, importPath: 'types/diagnosticInfo' },
    DataValue: { tsType: 'DataValue', decode: 'reader.readDataValue()', encode: v => `${v}.encode(writer)`, importPath: 'types/dataValue' },
    Variant: { tsType: 'Variant', decode: 'reader.readVariant()', encode: v => `${v}.encode(writer)`, importPath: 'types/variant' },
    // Compatibility - 'any' maps to Variant
    any: { tsType: 'Variant', decode: 'reader.readVariant()', encode: v => `${v}.encode(writer)`, importPath: 'types/variant' }
};

function typeScriptType(typeName, isArray) {
    const info = builtInMap[typeName];
    const base = info ? info.tsType : renderedTypeName(typeName, enumNameSet);
    return isArray ? `${base}[]` : base;
}

function decodeExpression(typeName, isArray) {
    const rendered = renderedTypeName(typeName, enumNameSet);
    if (enumNameSet.has(typeName)) {
        const call = `${rendered}.decode(reader)`;
        if (!isArray) return call;
        return `(() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ${rendered}.decode(reader); } return arr; })()`;
    }
    const info = builtInMap[typeName];
    const readExpr = info ? info.decode : `BinaryDecoders.decode${typeName}(reader)`;
    if (!isArray) return readExpr;
    const arrayReadExpr = info ? info.decode : `BinaryDecoders.decode${typeName}(reader)`;
    return `(() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ${arrayReadExpr}; } return arr; })()`;
}

function defaultValue(typeName, isArray) {
    if (isArray) return '[]';
    if (enumNameSet.has(typeName)) return '0 as any';
    const info = builtInMap[typeName];
    if (!info) return `new ${typeName}()`;
    switch (info.tsType) {
        case 'boolean': return 'false';
        case 'string | undefined': return 'undefined';
        case 'Date': return 'new Date()';
        case 'ByteString': return 'new Uint8Array()';
        case 'NodeId': return 'NodeId.NewTwoByte(0)';
        case 'ExpandedNodeId': return 'new ExpandedNodeId(NodeId.NewTwoByte(0))';
        case 'QualifiedName': return 'new QualifiedName(\"\", 0)';
        case 'LocalizedText': return 'new LocalizedText(\"\", \"\")';
        case 'UInt8':
        case 'Int16':
        case 'UInt16':
        case 'Int32':
        case 'UInt32':
        case 'Int64':
        case 'UInt64':
        case 'Float32':
        case 'Float64':
        case 'number': return '0';
        default:
            return `new ${info.tsType}()`;
    }
}

function encodeExpression(valueRef, typeName, isArray) {
    const rendered = renderedTypeName(typeName, enumNameSet);
    if (enumNameSet.has(typeName)) {
        if (isArray) {
            return `{
            const arr = ${valueRef} ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                ${rendered}.encode(writer, v);
            }
        }`;
        }
        return `${rendered}.encode(writer, ${valueRef})`;
    }
    const info = builtInMap[typeName];
    if (isArray) {
        return `{
            const arr = ${valueRef} ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                ${encodeExpression('v', typeName, false)};
            }
        }`;
    }
    if (info) {
        return info.encode(valueRef);
    }
    return `BinaryEncoders.encode${typeName}(writer, ${valueRef})`;
}

function relImport(fromFile, target) {
    const rel = path.relative(path.dirname(fromFile), target).replace(/\\/g, '/').replace(/\.ts$/, '');
    return rel.startsWith('.') ? rel : `./${rel}`;
}

function collectImports(type, outFile, outDir) {
    const imports = new Map();
    const addImport = (what, from) => {
        if (!imports.has(from)) imports.set(from, new Set());
        imports.get(from).add(what);
    };

    // Core
    addImport('BufferReader', relImport(outFile, path.resolve(ROOT, 'codecs/binary/bufferReader')));
    addImport('BufferWriter', relImport(outFile, path.resolve(ROOT, 'codecs/binary/bufferWriter')));

    for (const field of type.fields) {
        const info = builtInMap[field.type];
        if (info?.base) {
            addImport(info.base, relImport(outFile, path.resolve(ROOT, 'types/baseTypes')));
        }
        if (info?.importPath) {
            // Import the actual type, not the alias name
            const actualType = info.tsType.split('|')[0].trim();
            addImport(actualType, relImport(outFile, path.resolve(ROOT, info.importPath)));
        } else if (!builtInMap[field.type] && field.type !== type.name) {
            const rendered = renderedTypeName(field.type, enumNameSet);
            const target = path.resolve(outDir, `${field.type.charAt(0).toLowerCase()}${field.type.slice(1)}.ts`);
            addImport(rendered, relImport(outFile, target));
        }
    }

    return imports;
}

function renderImports(imports) {
    return Array.from(imports.entries())
        .map(([from, names]) => `import { ${Array.from(names).sort().join(', ')} } from "${from}";`)
        .join('\n');
}

function renderStructure(type, outFile, outDir) {
    const imports = collectImports(type, outFile, outDir);
    // Add IIdentifiable import instead of IEncodable
    const iIdentifiableImport = relImport(outFile, path.resolve(ROOT, 'codecs/iIdentifiable'));
    if (!imports.has(iIdentifiableImport)) imports.set(iIdentifiableImport, new Set());
    imports.get(iIdentifiableImport).add('IIdentifiable');
    
    const lines = [];
    lines.push('// AUTO-GENERATED – DO NOT EDIT');
    lines.push(renderImports(imports));
    lines.push('');
    if (type.doc) {
        lines.push('/**');
        lines.push(` * ${String(type.doc).trim()}`);
        lines.push(' */');
    }
    lines.push(`export class ${type.name} implements IIdentifiable {`);
    
    // Handle abstract types with no fields
    if (type.fields.length === 0) {
        lines.push('    constructor() { }');
        lines.push('');
        // Add readonly id field if we have it
        if (type.id !== undefined) {
            lines.push(`    readonly id = ${type.id}`);
        }
        lines.push('}');
        lines.push('');
        return lines.join('\n');
    }
    
    const ctorParams = type.fields.map(f => {
        const tsType = typeScriptType(f.type, f.isArray);
        const opt = f.isOptional ? '?' : '';
        return `        public ${f.name}${opt}: ${tsType}`;
    }).join(',\n');
    lines.push('    constructor(');
    if (ctorParams) lines.push(ctorParams);
    lines.push('    ) { }');
    lines.push('');
    // Add readonly id field if we have it
    if (type.id !== undefined) {
        lines.push(`    readonly id = ${type.id}`);
    }
    lines.push('}');
    lines.push('');
    return lines.join('\n');
}

function renderEnum(type, outFile, outDir) {
    const imports = collectImports({ ...type, fields: [] }, outFile, outDir);
    const rendered = renderedTypeName(type.name, enumNameSet);
    const lines = [];
    lines.push('// AUTO-GENERATED – DO NOT EDIT');
    lines.push(renderImports(imports));
    lines.push('');
    if (type.doc) {
        lines.push('/**');
        lines.push(` * ${String(type.doc).trim()}`);
        lines.push(' */');
    }
    lines.push(`export enum ${rendered} {`);
    type.fields.forEach(f => {
        const value = f.value !== undefined ? ` = ${f.value}` : '';
        lines.push(`    ${f.name}${value},`);
    });
    lines.push('}');
    lines.push('');
    lines.push(`export namespace ${rendered} {`);
    lines.push(`    export function decode(reader: BufferReader): ${rendered} {`);
    lines.push(`        return reader.readInt32() as ${rendered};`);
    lines.push('    }');
    lines.push('');
    lines.push(`    export function encode(writer: BufferWriter, value: ${rendered}): void {`);
    lines.push('        writer.writeInt32(value as any);');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    return lines.join('\n');
}

function writeFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf-8');
}

function generateBinaryDecoders(dataTypes) {
    const lines = [];
    lines.push('// AUTO-GENERATED – DO NOT EDIT');
    lines.push('import { BufferReader } from "../codecs/binary/bufferReader";');
    lines.push('');
    lines.push('export class BinaryDecoders {');
    
    // Generate decoder functions with inline decoding logic
    for (const dt of dataTypes) {
        if (dt.kind === 'structure') {
            const funcName = `decode${dt.name}`;
            const fileName = dt.name.charAt(0).toLowerCase() + dt.name.slice(1);
            lines.push(`    static ${funcName} = (reader: BufferReader) => {`);
            lines.push(`        const { ${dt.name} } = require("./types/${fileName}");`);
            
            if (dt.fields.length === 0) {
                // Abstract type with no fields
                lines.push(`        return new ${dt.name}();`);
            } else {
                // Collect all enum types used in this structure
                const enumTypes = new Set();
                for (const f of dt.fields) {
                    if (enumNameSet.has(f.type)) {
                        const renderedEnum = renderedTypeName(f.type, enumNameSet);
                        enumTypes.add(renderedEnum);
                    }
                }
                // Import enums at runtime
                for (const enumType of enumTypes) {
                    // enumType already has 'Enum' suffix from renderedTypeName
                    // File name should be the base name without Enum suffix, lowercased
                    const baseEnumName = enumType.endsWith('Enum') ? enumType.slice(0, -4) : enumType;
                    const enumFileName = baseEnumName.charAt(0).toLowerCase() + baseEnumName.slice(1);
                    lines.push(`        const { ${enumType} } = require("./types/${enumFileName}");`);
                }
                
                // Type with fields - construct with decoded values
                const decodeArgs = dt.fields.map(f => `            ${decodeExpression(f.type, f.isArray)}`).join(',\n');
                lines.push(`        return new ${dt.name}(`);
                if (decodeArgs) lines.push(decodeArgs);
                lines.push('        );');
            }
            lines.push('    };');
            lines.push('');
        }
    }
    
    lines.push('}');
    return lines.join('\n');
}

function generateBinaryEncoders(dataTypes) {
    const lines = [];
    lines.push('// AUTO-GENERATED – DO NOT EDIT');
    lines.push('import { BufferWriter } from "../codecs/binary/bufferWriter";');
    lines.push('import { IIdentifiable } from "../codecs/iIdentifiable";');
    lines.push('import { NodeId } from "../types/nodeId";');
    lines.push('');
    lines.push('export class BinaryEncoders {');
    
    // Generate encoder functions with inline encoding logic
    for (const dt of dataTypes) {
        if (dt.kind === 'structure') {
            const funcName = `encode${dt.name}`;
            lines.push(`    static ${funcName} = (writer: BufferWriter, identifiable: IIdentifiable) => {`);
            
            if (dt.fields.length === 0) {
                // Abstract type with no fields - nothing to encode
                lines.push('        // Abstract type - no fields to encode');
            } else {
                // Collect all enum types used in this structure
                const enumTypes = new Set();
                for (const f of dt.fields) {
                    if (enumNameSet.has(f.type)) {
                        const renderedEnum = renderedTypeName(f.type, enumNameSet);
                        enumTypes.add(renderedEnum);
                    }
                }
                // Import enums at runtime
                for (const enumType of enumTypes) {
                    // enumType already has 'Enum' suffix from renderedTypeName
                    // File name should be the base name without Enum suffix, lowercased
                    const baseEnumName = enumType.endsWith('Enum') ? enumType.slice(0, -4) : enumType;
                    const enumFileName = baseEnumName.charAt(0).toLowerCase() + baseEnumName.slice(1);
                    lines.push(`        const { ${enumType} } = require("./types/${enumFileName}");`);
                }
                
                // Type with fields - cast and encode each field
                lines.push(`        const obj = identifiable as any;`);
                for (const f of dt.fields) {
                    let safeValue;
                    if (f.isOptional) {
                        // For optional fields, check if it's a built-in or enum type
                        const info = builtInMap[f.type];
                        if (info || enumNameSet.has(f.type) || f.isArray) {
                            // Built-in, enum, or array - use default value
                            safeValue = `(obj.${f.name} ?? ${defaultValue(f.type, f.isArray)})`;
                        } else {
                            // Complex type - just use the value directly, encoder will handle undefined
                            safeValue = `obj.${f.name}`;
                        }
                    } else {
                        safeValue = `obj.${f.name}`;
                    }
                    const expr = encodeExpression(safeValue, f.type, f.isArray);
                    lines.push(`        ${expr};`);
                }
            }
            lines.push('    };');
            lines.push('');
        }
    }
    
    lines.push('}');
    return lines.join('\n');
}

function generateSchemaCodec(dataTypes) {
    const lines = [];
    lines.push('// AUTO-GENERATED – DO NOT EDIT');
    lines.push('import { BufferReader } from "../codecs/binary/bufferReader";');
    lines.push('import { BufferWriter } from "../codecs/binary/bufferWriter";');
    lines.push('import { IIdentifiable } from "../codecs/iIdentifiable";');
    lines.push('import { ExpandedNodeId } from "../types/expandedNodeId";');
    lines.push('import { NodeId } from "../types/nodeId";');
    lines.push('import { BinaryEncoders } from "./binaryEncoders";');
    lines.push('import { BinaryDecoders } from "./binaryDecoders";');
    lines.push('');
    lines.push('export class SchemaCodec {');
    lines.push('');
    lines.push('    private static encodeId(writer: BufferWriter, id: number): void {');
    lines.push('        const eid = new ExpandedNodeId(NodeId.NewFourByte(0, id));');
    lines.push('        writer.writeExpandedNodeId(eid);');
    lines.push('    }');
    lines.push('');
    lines.push('    public static encodeBinary(writer: BufferWriter, obj: IIdentifiable): void {');
    lines.push('        const id = obj.id;');
    lines.push('        SchemaCodec.encodeId(writer, id);');
    lines.push('        switch (id) {');
    
    // Generate encoder switch cases sorted by id
    const encoderCases = dataTypes
        .filter(dt => dt.kind === 'structure' && dt.id !== undefined)
        .sort((a, b) => a.id - b.id)
        .map(dt => `            case ${dt.id}: BinaryEncoders.encode${dt.name}(writer, obj); break;`);
    
    lines.push(...encoderCases);
    lines.push('            default:');
    lines.push('                throw new Error(`Binary encoder for id ${id} not found`);');
    lines.push('        }');
    lines.push('    }');
    lines.push('');
    lines.push('    public static decode(reader: BufferReader): unknown {');
    lines.push('        const eid = reader.readExpandedNodeId();');
    lines.push('        const id = eid.NodeId.Identifier as number;');
    lines.push('        switch (id) {');
    
    // Generate decoder switch cases sorted by encoderId
    const decoderCases = dataTypes
        .filter(dt => dt.kind === 'structure' && dt.encoderId !== undefined)
        .sort((a, b) => a.encoderId - b.encoderId)
        .map(dt => `            case ${dt.encoderId}: return BinaryDecoders.decode${dt.name}(reader);`);
    
    lines.push(...decoderCases);
    lines.push('            default:');
    lines.push('                throw new Error(`Binary decoder for id ${id} not found`);');
    lines.push('        }');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    
    return lines.join('\n');
}

function generate() {
    const args = parseArgs(process.argv.slice(2));
    const input = args['--input'] ? path.resolve(process.cwd(), args['--input']) : DEFAULT_INPUT;
    const nodeIdsPath = args['--nodeIds'] ? path.resolve(process.cwd(), args['--nodeIds']) : DEFAULT_NODEIDS_CSV;
    const outDir = args['--outDir'] ? path.resolve(process.cwd(), args['--outDir']) : DEFAULT_OUT_DIR;

    if (!fs.existsSync(input)) {
        console.error(`Input XML not found: ${input}`);
        process.exit(1);
    }

    // Parse NodeIds.csv
    nodeIdsMap = parseNodeIds(nodeIdsPath);
    console.log(`Loaded ${nodeIdsMap.size} node IDs from ${nodeIdsPath}`);

    const xml = fs.readFileSync(input, 'utf-8');
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        removeNSPrefix: true,
        allowBooleanAttributes: true
    });
    const parsed = parser.parse(xml);
    const nodeSet = parsed.UANodeSet || parsed.UaNodeSet;
    if (!nodeSet) {
        console.error('Invalid NodeSet XML: missing UANodeSet root.');
        process.exit(1);
    }

    const dataTypes = parseDataTypes(nodeSet);
    enumNameSet = new Set(dataTypes.filter(dt => dt.kind === 'enum').map(dt => dt.name));
    
    // Assign IDs to data types
    for (const dt of dataTypes) {
        const id = nodeIdsMap.get(dt.name);
        const encoderId = nodeIdsMap.get(dt.name + '_EncoderId');
        if (id !== undefined) {
            dt.id = id;
        }
        if (encoderId !== undefined) {
            dt.encoderId = encoderId;
        }
    }
    
    if (!dataTypes.length) {
        console.warn('No data types with definitions found.');
    }

    fs.mkdirSync(outDir, { recursive: true });

    const written = [];
    for (const dt of dataTypes) {
        const outFile = path.resolve(outDir, toFileName(dt.name));
        const content = dt.kind === 'enum'
            ? renderEnum(dt, outFile, outDir)
            : renderStructure(dt, outFile, outDir);
        writeFile(outFile, content);
        written.push(outFile);
    }

    const barrel = written
        .map(f => `export * from "./${path.basename(f, '.ts')}";`)
        .join('\n');
    writeFile(path.resolve(outDir, 'index.ts'), `// AUTO-GENERATED – DO NOT EDIT\n${barrel}\n`);

    const manifest = {
        generated: written.map(f => path.relative(process.cwd(), f)),
        total: written.length,
        timestamp: new Date().toISOString()
    };
    writeFile(path.resolve(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

    // Generate codec files
    const decodersContent = generateBinaryDecoders(dataTypes);
    writeFile(path.resolve(CODEC_OUT_DIR, 'binaryDecoders.ts'), decodersContent);
    
    const encodersContent = generateBinaryEncoders(dataTypes);
    writeFile(path.resolve(CODEC_OUT_DIR, 'binaryEncoders.ts'), encodersContent);
    
    const codecContent = generateSchemaCodec(dataTypes);
    writeFile(path.resolve(CODEC_OUT_DIR, 'schemaCodec.ts'), codecContent);

    console.log(`Generated ${written.length} types to ${outDir}`);
    console.log(`Generated codec files to ${CODEC_OUT_DIR}`);
}

generate();