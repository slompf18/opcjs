/**
 * Encoder Registrations Template - Generate TypeScript encoder registration function
 *
 * Generates the registration function for OPC UA encoder types:
 *   - registerEncoders: maps type IDs to encode functions
 *
 * @packageDocumentation
 */

import { ParsedType } from '../types/DataModel.js';

// ── Public types ──────────────────────────────────────────────────────────────

export interface GeneratedEncoderRegistrations {
    /** Generated source code for the encoder registrations file. */
    code: string;
    /** Encoder function names that must be imported from the encoders file. */
    encoderFunctionImports: string[];
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Generate encoder registration function for all structure/abstract types
 * that have a numeric typeId.
 *
 * @param types  All parsed types from the data model.
 * @returns Generated registration code and the encoder function import names.
 */
export function generateEncoderRegistrations(types: ParsedType[]): GeneratedEncoderRegistrations {
    // Only structure/abstract types with a typeId can be registered
    const structTypes = types.filter(
        (t) =>
            (t.category === 'structure' || t.category === 'abstract') &&
            t.typeId !== undefined,
    );

    const encoderFunctionImports: string[] = [];
    const registerTypeLines: string[] = [];

    for (const type of structTypes) {
        const funcName = `encode${type.safeName}`;
        encoderFunctionImports.push(funcName);

        registerTypeLines.push(`    encoder.registerType(${type.typeId}, (w, v) => ${funcName}(w, v, encoder));`);
    }

    // ── Emit code ────────────────────────────────────────────────────────────

    const lines: string[] = [];

    lines.push(`export function registerEncoders(encoder: Encoder){`);
    if (registerTypeLines.length > 0) {
        lines.push(...registerTypeLines);
    }
    lines.push(`}`);

    return {
        code: lines.join('\n'),
        encoderFunctionImports,
    };
}
