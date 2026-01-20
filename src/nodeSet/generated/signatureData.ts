// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.36
 */
export class SignatureData implements IEncodable {
    constructor(
        public Algorithm: string | undefined,
        public Signature: ByteString
    ) { }

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
