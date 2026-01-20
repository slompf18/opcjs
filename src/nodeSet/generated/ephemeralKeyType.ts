// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.15
 */
export class EphemeralKeyType implements IEncodable {
    constructor(
        public PublicKey: ByteString,
        public Signature: ByteString
    ) { }

    public static decode(reader: BufferReader): EphemeralKeyType {
        const obj = new EphemeralKeyType(
            ByteString.decode(reader),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.PublicKey.encode(writer);
        this.Signature.encode(writer);
    }
}
