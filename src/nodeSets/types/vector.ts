// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.23
 */
export class Vector implements IIdentifiable {
    constructor() { }

    readonly id = 18807

    public static decode(reader: BufferReader): Vector {
        // Abstract type - no fields to decode
        return new Vector();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
