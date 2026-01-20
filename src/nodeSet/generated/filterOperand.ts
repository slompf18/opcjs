// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4
 */
export class FilterOperand implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): FilterOperand {
        // Abstract type - no fields to decode
        return new FilterOperand();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
