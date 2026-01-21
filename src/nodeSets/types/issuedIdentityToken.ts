// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15/#12.3.15.2
 */
export class IssuedIdentityToken implements IIdentifiable {
    constructor(
        public TokenData: ByteString,
        public EncryptionAlgorithm: string | undefined
    ) { }

    readonly id = 938

    public static decode(reader: BufferReader): IssuedIdentityToken {
        const obj = new IssuedIdentityToken(
            ByteString.decode(reader),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.TokenData.encode(writer);
        writer.writeString(this.EncryptionAlgorithm);
    }
}
