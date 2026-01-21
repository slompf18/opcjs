// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15/#12.3.15.3
 */
export class UserNameIdentityToken implements IIdentifiable {
    constructor(
        public UserName: string | undefined,
        public Password: ByteString,
        public EncryptionAlgorithm: string | undefined
    ) { }

    readonly id = 322

    public static decode(reader: BufferReader): UserNameIdentityToken {
        const obj = new UserNameIdentityToken(
            reader.readString(),
            reader.readByteString(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.UserName);
        writer.writeByteString(this.Password);
        writer.writeString(this.EncryptionAlgorithm);
    }
}
