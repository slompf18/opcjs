// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.29
 */
export class Frame implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): Frame {
        // Abstract type - no fields to decode
        return new Frame();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
