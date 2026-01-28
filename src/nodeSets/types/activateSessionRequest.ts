// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
        public LocaleIds: string[],
        public UserIdentityToken: ExtensionObject,
        public UserTokenSignature: SignatureData
    ) { }

    getId(): number { return 465; }
}
