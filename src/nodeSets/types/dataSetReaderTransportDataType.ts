// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.9/#6.2.9.13.2
 */
export class DataSetReaderTransportDataType implements IIdentifiable {
    constructor() { }

    readonly id = 15628

    public static decode(reader: BufferReader): DataSetReaderTransportDataType {
        // Abstract type - no fields to decode
        return new DataSetReaderTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
