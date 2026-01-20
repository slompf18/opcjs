// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.8/#6.2.8.2.3
 */
export class ReaderGroupMessageDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): ReaderGroupMessageDataType {
        // Abstract type - no fields to decode
        return new ReaderGroupMessageDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
