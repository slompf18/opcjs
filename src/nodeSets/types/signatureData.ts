// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.36
 */
export class SignatureData implements IIdentifiable {
    constructor(
        public Algorithm: string | undefined,
        public Signature: ByteString
    ) { }

    readonly id = 456

    public static decode(reader: BufferReader): SignatureData {
        const obj = new SignatureData(
            reader.readString(),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Algorithm);
        writer.writeByteString(this.Signature);
    }
}
