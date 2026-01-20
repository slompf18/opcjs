// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.9/#6.2.9.13.2
 */
export class DataSetReaderTransportDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): DataSetReaderTransportDataType {
        // Abstract type - no fields to decode
        return new DataSetReaderTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
