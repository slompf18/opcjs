// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.1.3
 */
export class TransmitQosDataType implements IIdentifiable {
    constructor() { }

    readonly id = 23604

    public static decode(reader: BufferReader): TransmitQosDataType {
        // Abstract type - no fields to decode
        return new TransmitQosDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
