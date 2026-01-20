// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.10
 */
export class GenericAttributeValue implements IEncodable {
    constructor(
        public AttributeId: UInt32,
        public Value: Variant
    ) { }

    public static decode(reader: BufferReader): GenericAttributeValue {
        const obj = new GenericAttributeValue(
            reader.readUInt32(),
            reader.readVariant()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.AttributeId);
        this.Value.encode(writer);
    }
}
