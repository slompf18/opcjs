// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.6/#6.2.6.7.2
 */
export class WriterGroupTransportDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): WriterGroupTransportDataType {
        // Abstract type - no fields to decode
        return new WriterGroupTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
