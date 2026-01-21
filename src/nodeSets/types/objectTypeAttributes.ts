// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.5
 */
export class ObjectTypeAttributes implements IIdentifiable {
    constructor(
        public IsAbstract: boolean
    ) { }

    readonly id = 361

    public static decode(reader: BufferReader): ObjectTypeAttributes {
        const obj = new ObjectTypeAttributes(
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.IsAbstract);
    }
}
