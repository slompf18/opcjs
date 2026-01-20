// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.8
 */
export class DataTypeAttributes implements IEncodable {
    constructor(
        public IsAbstract: boolean
    ) { }

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
