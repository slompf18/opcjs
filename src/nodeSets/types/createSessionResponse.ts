// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { NodeId } from "../../types/nodeId";
import { ByteString, Float64, UInt32 } from "../../types/baseTypes";
import { EndpointDescription } from "./endpointDescription";
import { SignedSoftwareCertificate } from "./signedSoftwareCertificate";
import { SignatureData } from "./signatureData";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.2/#5.7.2.2
 */
export class CreateSessionResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public SessionId: NodeId,
        public AuthenticationToken: NodeId,
        public RevisedSessionTimeout: Float64,
        public ServerNonce: ByteString,
        public ServerCertificate: ByteString,
        public ServerEndpoints: EndpointDescription[],
        public ServerSoftwareCertificates: SignedSoftwareCertificate[],
        public ServerSignature: SignatureData,
        public MaxRequestMessageSize: UInt32
    ) { }

    getId(): number { return 462; }
}
