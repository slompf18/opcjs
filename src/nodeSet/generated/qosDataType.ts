// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.1.2
 */
export class QosDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): QosDataType {
        // Abstract type - no fields to decode
        return new QosDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
