// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.3
 */
export class DataTypeDefinition implements IIdentifiable {
    constructor() { }

    readonly id = 97

    public static decode(reader: BufferReader): DataTypeDefinition {
        // Abstract type - no fields to decode
        return new DataTypeDefinition();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
