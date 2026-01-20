import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class DiagnosticInfo {
    public static decode(buffer: BufferReader): DiagnosticInfo {
        const obj = new DiagnosticInfo();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}