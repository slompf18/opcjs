import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class DataValue {
    public static decode(buffer: BufferReader): DataValue {
        const obj = new DataValue();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }
}