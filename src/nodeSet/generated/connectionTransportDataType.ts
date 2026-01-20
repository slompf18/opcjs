// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.7/#6.2.7.5.2
 */
export class ConnectionTransportDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): ConnectionTransportDataType {
        // Abstract type - no fields to decode
        return new ConnectionTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
