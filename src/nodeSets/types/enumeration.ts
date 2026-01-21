// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.5
 */
export class Enumeration implements IIdentifiable {
    constructor() { }

    readonly id = 29

    public static decode(reader: BufferReader): Enumeration {
        // Abstract type - no fields to decode
        return new Enumeration();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
