// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4/#7.7.4.3
 */
export class LiteralOperand implements IIdentifiable {
    constructor(
        public Value: Variant
    ) { }

    readonly id = 595

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
