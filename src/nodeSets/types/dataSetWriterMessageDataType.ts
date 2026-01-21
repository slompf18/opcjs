// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.4/#6.2.4.5.3
 */
export class DataSetWriterMessageDataType implements IIdentifiable {
    constructor() { }

    readonly id = 15605

    public static decode(reader: BufferReader): DataSetWriterMessageDataType {
        // Abstract type - no fields to decode
        return new DataSetWriterMessageDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
