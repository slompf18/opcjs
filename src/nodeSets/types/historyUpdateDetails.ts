// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.1
 */
export class HistoryUpdateDetails implements IIdentifiable {
    constructor() { }

    readonly id = 677

    public static decode(reader: BufferReader): HistoryUpdateDetails {
        // Abstract type - no fields to decode
        return new HistoryUpdateDetails();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
