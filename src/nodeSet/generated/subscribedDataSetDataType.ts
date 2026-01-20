// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.1
 */
export class SubscribedDataSetDataType implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): SubscribedDataSetDataType {
        // Abstract type - no fields to decode
        return new SubscribedDataSetDataType();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
