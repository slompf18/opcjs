import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class DataValue {
    public static decode(buffer: BufferReader): DataValue {
        const obj = new DataValue();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }
}