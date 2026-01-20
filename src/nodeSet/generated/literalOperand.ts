// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4/#7.7.4.3
 */
export class LiteralOperand implements IEncodable {
    constructor(
        public Value: Variant
    ) { }

    public static decode(reader: BufferReader): LiteralOperand {
        const obj = new LiteralOperand(
            reader.readVariant()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Value.encode(writer);
    }
}
