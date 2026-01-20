// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.8/#6.2.8.2.2
 */
export class ReaderGroupTransportDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): ReaderGroupTransportDataType {
        // Abstract type - no fields to decode
        return new ReaderGroupTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
