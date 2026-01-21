// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
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
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Algorithm);
        this.Signature.encode(writer);
    }
}
