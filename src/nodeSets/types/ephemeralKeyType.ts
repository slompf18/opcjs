// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.15
 */
export class EphemeralKeyType implements IIdentifiable {
    constructor(
        public PublicKey: ByteString,
        public Signature: ByteString
    ) { }

    readonly id = 17548

    public static decode(reader: BufferReader): EphemeralKeyType {
        const obj = new EphemeralKeyType(
            reader.readByteString(),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeByteString(this.PublicKey);
        writer.writeByteString(this.Signature);
    }
}
