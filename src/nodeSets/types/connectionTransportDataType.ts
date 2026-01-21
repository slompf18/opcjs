// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.7/#6.2.7.5.2
 */
export class ConnectionTransportDataType implements IIdentifiable {
    constructor() { }

    readonly id = 15618

    public static decode(reader: BufferReader): ConnectionTransportDataType {
        // Abstract type - no fields to decode
        return new ConnectionTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
