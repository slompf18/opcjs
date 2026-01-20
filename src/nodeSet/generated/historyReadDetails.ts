// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.1
 */
export class HistoryReadDetails implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): HistoryReadDetails {
        // Abstract type - no fields to decode
        return new HistoryReadDetails();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
