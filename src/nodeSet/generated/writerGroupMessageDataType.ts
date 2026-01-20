// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.6/#6.2.6.7.3
 */
export class WriterGroupMessageDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): WriterGroupMessageDataType {
        // Abstract type - no fields to decode
        return new WriterGroupMessageDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
