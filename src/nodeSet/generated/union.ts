// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.12
 */
export class Union implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): Union {
        // Abstract type - no fields to decode
        return new Union();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
