// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15/#12.3.15.4
 */
export class X509IdentityToken implements IIdentifiable {
    constructor(
        public CertificateData: ByteString
    ) { }

    readonly id = 325

    public static decode(reader: BufferReader): X509IdentityToken {
        const obj = new X509IdentityToken(
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.CertificateData.encode(writer);
    }
}
