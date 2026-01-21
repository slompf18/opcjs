// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.4/#6.2.4.5.2
 */
export class DataSetWriterTransportDataType implements IIdentifiable {
    constructor() { }

    readonly id = 15598

    public static decode(reader: BufferReader): DataSetWriterTransportDataType {
        // Abstract type - no fields to decode
        return new DataSetWriterTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
