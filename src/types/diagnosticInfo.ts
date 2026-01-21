import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class DiagnosticInfo {
    public static decode(buffer: BufferReader): DiagnosticInfo {
        const obj = new DiagnosticInfo();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}