/**
 * Decoder Registrations Template - Generate TypeScript decoder registration functions
 *
 * Generates the four registration functions for OPC UA types:
 *   - registerTypeDecoders: maps type IDs to decode functions
 *   - registerBinaryDecoders: registers binary encoding IDs
 *   - registerJsonDecoders: registers JSON encoding IDs
 *   - registerXmlDecoders: registers XML encoding IDs
 *
 * @packageDocumentation
 */

import { ParsedType } from '../types/DataModel.js';

// ── Public types ──────────────────────────────────────────────────────────────

export interface GeneratedDecoderRegistrations {
    /** Generated source code for the decoder registrations file. */
    code: string;
    /** Decoder function names that must be imported from the decoders file. */
    decoderFunctionImports: string[];
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Generate decoder registration functions for all structure/abstract types
 * that have a numeric typeId.
 *
 * @param types  All parsed types from the data model.
 * @returns Generated registration code and the decoder function import names.
 */
export function generateDecoderRegistrations(types: ParsedType[]): GeneratedDecoderRegistrations {
    // Only structure/abstract types with a typeId can be registered
    const structTypes = types.filter(
        (t) =>
            (t.category === 'structure' || t.category === 'abstract') &&
            t.typeId !== undefined,
    );

    const decoderFunctionImports: string[] = [];
    const registerTypeLines: string[] = [];
    const registerBinaryLines: string[] = [];
    const registerJsonLines: string[] = [];
    const registerXmlLines: string[] = [];

    for (const type of structTypes) {
        const funcName = `decode${type.safeName}`;
        decoderFunctionImports.push(funcName);

        // registerType: always included if typeId is defined
        registerTypeLines.push(`    decoder.registerType(${type.typeId}, (r: IReader) => ${funcName}(r, decoder));`);

        // registerEncodingId for each encoding format (only when ID is available)
        const binId = type.binaryEncodingId ?? type.typeId!;
        registerBinaryLines.push(`    decoder.registerEncodingId(${binId}, writerId, ${type.typeId});`);

        if (type.jsonEncodingId !== undefined) {
            registerJsonLines.push(`    decoder.registerEncodingId(${type.jsonEncodingId}, writerId, ${type.typeId});`);
        }

        if (type.xmlEncodingId !== undefined) {
            registerXmlLines.push(`    decoder.registerEncodingId(${type.xmlEncodingId}, writerId, ${type.typeId});`);
        }
    }

    // ── Emit code ────────────────────────────────────────────────────────────

    const lines: string[] = [];

    lines.push(`export function registerTypeDecoders(decoder:Decoder){`);
    if (registerTypeLines.length > 0) {
        lines.push(...registerTypeLines);
    }
    lines.push(`}`);

    lines.push('');

    lines.push(`export function registerBinaryDecoders(decoder:Decoder){`);
    lines.push(`    const writerId = 'binary';`);
    if (registerBinaryLines.length > 0) {
        lines.push('');
        lines.push(...registerBinaryLines);
    }
    lines.push(`}`);

    lines.push('');

    lines.push(`export function registerJsonDecoders(decoder:Decoder){`);
    lines.push(`    const writerId = 'json';`);
    if (registerJsonLines.length > 0) {
        lines.push('');
        lines.push(...registerJsonLines);
    }
    lines.push(`}`);

    lines.push('');

    lines.push(`export function registerXmlDecoders(decoder:Decoder){`);
    lines.push(`    const writerId = 'xml';`);
    if (registerXmlLines.length > 0) {
        lines.push('');
        lines.push(...registerXmlLines);
    }
    lines.push(`}`);

    return {
        code: lines.join('\n'),
        decoderFunctionImports,
    };
}
