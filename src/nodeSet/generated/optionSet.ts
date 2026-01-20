// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.8
 */
export class OptionSet implements IEncodable {
    constructor(
        public Value: ByteString,
        public ValidBits: ByteString
    ) { }

    public static decode(reader: BufferReader): OptionSet {
        const obj = new OptionSet(
            ByteString.decode(reader),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Value.encode(writer);
        this.ValidBits.encode(writer);
    }
}
