// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.1
 */
export class HistoryReadDetails implements IIdentifiable {
    constructor() { }

    readonly id = 641

    public static decode(reader: BufferReader): HistoryReadDetails {
        // Abstract type - no fields to decode
        return new HistoryReadDetails();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
