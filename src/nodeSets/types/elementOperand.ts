// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4/#7.7.4.2
 */
export class ElementOperand implements IIdentifiable {
    constructor(
        public Index: UInt32
    ) { }

    readonly id = 592

    public static decode(reader: BufferReader): ElementOperand {
        const obj = new ElementOperand(
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.Index);
    }
}
