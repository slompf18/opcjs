// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.6
 */
export class PublishedDataSetSourceDataType implements IIdentifiable {
    constructor() { }

    readonly id = 15580

    public static decode(reader: BufferReader): PublishedDataSetSourceDataType {
        // Abstract type - no fields to decode
        return new PublishedDataSetSourceDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
