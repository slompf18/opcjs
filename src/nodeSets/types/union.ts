// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.12
 */
export class Union implements IIdentifiable {
    constructor() { }

    readonly id = 12756

    public static decode(reader: BufferReader): Union {
        // Abstract type - no fields to decode
        return new Union();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
