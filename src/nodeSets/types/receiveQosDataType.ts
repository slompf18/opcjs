// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.1.5
 */
export class ReceiveQosDataType implements IIdentifiable {
    constructor() { }

    readonly id = 23608

    public static decode(reader: BufferReader): ReceiveQosDataType {
        // Abstract type - no fields to decode
        return new ReceiveQosDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
