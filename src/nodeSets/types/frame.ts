// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.29
 */
export class Frame implements IIdentifiable {
    constructor() { }

    readonly id = 18813

    public static decode(reader: BufferReader): Frame {
        // Abstract type - no fields to decode
        return new Frame();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
