// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.9/#6.2.9.13.3
 */
export class DataSetReaderMessageDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): DataSetReaderMessageDataType {
        // Abstract type - no fields to decode
        return new DataSetReaderMessageDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
