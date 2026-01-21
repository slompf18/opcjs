// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { SignatureData } from "./signatureData";
import { SignedSoftwareCertificate } from "./signedSoftwareCertificate";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.3/#5.7.3.2
 */
export class ActivateSessionRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ClientSignature: SignatureData,
        public ClientSoftwareCertificates: SignedSoftwareCertificate[],
        public LocaleIds: string | undefined[],
        public UserIdentityToken: ExtensionObject,
        public UserTokenSignature: SignatureData
    ) { }

    readonly id = 465

    public static decode(reader: BufferReader): ActivateSessionRequest {
        const obj = new ActivateSessionRequest(
            RequestHeader.decode(reader),
            SignatureData.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SignedSoftwareCertificate.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readExtensionObject(),
            SignatureData.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        this.ClientSignature.encode(writer);
        {
            const arr = this.ClientSoftwareCertificates ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.LocaleIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        this.UserIdentityToken.encode(writer);
        this.UserTokenSignature.encode(writer);
    }
}
