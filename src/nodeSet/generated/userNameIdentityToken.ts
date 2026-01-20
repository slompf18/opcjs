// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15/#12.3.15.3
 */
export class UserNameIdentityToken implements IEncodable {
    constructor(
        public UserName: string | undefined,
        public Password: ByteString,
        public EncryptionAlgorithm: string | undefined
    ) { }

    public static decode(reader: BufferReader): UserNameIdentityToken {
        const obj = new UserNameIdentityToken(
            reader.readString(),
            ByteString.decode(reader),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.UserName);
        this.Password.encode(writer);
        writer.writeString(this.EncryptionAlgorithm);
    }
}
