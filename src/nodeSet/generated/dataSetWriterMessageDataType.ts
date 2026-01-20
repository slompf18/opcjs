// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.4/#6.2.4.5.3
 */
export class DataSetWriterMessageDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): DataSetWriterMessageDataType {
        // Abstract type - no fields to decode
        return new DataSetWriterMessageDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
