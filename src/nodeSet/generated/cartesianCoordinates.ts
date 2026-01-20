// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.25
 */
export class CartesianCoordinates implements IEncodable {
    constructor() { }

    public static decode(reader: BufferReader): CartesianCoordinates {
        // Abstract type - no fields to decode
        return new CartesianCoordinates();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
