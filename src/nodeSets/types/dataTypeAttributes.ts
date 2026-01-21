// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.8
 */
export class DataTypeAttributes implements IIdentifiable {
    constructor(
        public IsAbstract: boolean
    ) { }

    readonly id = 370

    public static decode(reader: BufferReader): DataTypeAttributes {
        const obj = new DataTypeAttributes(
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.IsAbstract);
    }
}
