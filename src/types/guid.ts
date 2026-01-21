import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class Guid {
    constructor(public bytes: Uint8Array = new Uint8Array(16)) { }

    public static decode(buffer: BufferReader): Guid {
        return buffer.readGuid();
    }

    public static decodeRaw(bytes: Uint8Array): Guid {
        const arr = bytes.length === 16 ? bytes : new Uint8Array(16);
        return new Guid(arr);
    }

    encode(buffer: BufferWriter) {
        // GUID binary form is 16 bytes; if shorter, pad with zeros
        const data = this.bytes.length === 16 ? this.bytes : new Uint8Array(16);
        buffer.writeBytes(data);
    }
}