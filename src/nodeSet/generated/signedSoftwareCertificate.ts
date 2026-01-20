// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.13
 */
export class SignedSoftwareCertificate implements IEncodable {
    constructor(
        public CertificateData: ByteString,
        public Signature: ByteString
    ) { }

    public static decode(reader: BufferReader): SignedSoftwareCertificate {
        const obj = new SignedSoftwareCertificate(
            ByteString.decode(reader),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.CertificateData.encode(writer);
        this.Signature.encode(writer);
    }
}
