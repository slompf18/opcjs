// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.25
 */
export class CartesianCoordinates implements IIdentifiable {
    constructor() { }

    readonly id = 18809

    public static decode(reader: BufferReader): CartesianCoordinates {
        // Abstract type - no fields to decode
        return new CartesianCoordinates();
    }

    encode(writer: BufferWriter): void {
        // Abstract type - no fields to encode
    }
}
