// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.8/#6.2.8.2.2
 */
export class ReaderGroupTransportDataType implements IIdentifiable {
    constructor() { }

    readonly id = 15621

    public static decode(reader: BufferReader): ReaderGroupTransportDataType {
        // Abstract type - no fields to decode
        return new ReaderGroupTransportDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
