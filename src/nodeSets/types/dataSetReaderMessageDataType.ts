// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.9/#6.2.9.13.3
 */
export class DataSetReaderMessageDataType implements IIdentifiable {
    constructor() { }

    readonly id = 15629

    public static decode(reader: BufferReader): DataSetReaderMessageDataType {
        // Abstract type - no fields to decode
        return new DataSetReaderMessageDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
