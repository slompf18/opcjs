// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.2/#6.5.2.3
 */
export class ReadEventDetails2 implements IEncodable {
    constructor(
        public ReadModified: boolean
    ) { }

    public static decode(reader: BufferReader): ReadEventDetails2 {
        const obj = new ReadEventDetails2(
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.ReadModified);
    }
}
