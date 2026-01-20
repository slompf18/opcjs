// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.1
 */
export class HistoryUpdateDetails implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): HistoryUpdateDetails {
        // Abstract type - no fields to decode
        return new HistoryUpdateDetails();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
