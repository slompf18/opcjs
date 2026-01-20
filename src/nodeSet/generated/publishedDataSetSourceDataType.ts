// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.6
 */
export class PublishedDataSetSourceDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): PublishedDataSetSourceDataType {
        // Abstract type - no fields to decode
        return new PublishedDataSetSourceDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
