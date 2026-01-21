// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.13
 */
export class SignedSoftwareCertificate implements IIdentifiable {
    constructor(
        public CertificateData: ByteString,
        public Signature: ByteString
    ) { }

    readonly id = 344

    public static decode(reader: BufferReader): SignedSoftwareCertificate {
        const obj = new SignedSoftwareCertificate(
            reader.readByteString(),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeByteString(this.CertificateData);
        writer.writeByteString(this.Signature);
    }
}
