// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { NodeId } from "../../types/nodeId";
import { Float64, UInt32 } from "../../types/baseTypes";
import { ByteString } from "../../types/byteString";
import { EndpointDescription } from "./endpointDescription";
import { SignedSoftwareCertificate } from "./signedSoftwareCertificate";
import { SignatureData } from "./signatureData";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.2/#5.7.2.2
 */
export class CreateSessionResponse implements IEncodable {
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

    public static decode(reader: BufferReader): CreateSessionResponse {
        const obj = new CreateSessionResponse(
            ResponseHeader.decode(reader),
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readDouble(),
            ByteString.decode(reader),
            ByteString.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointDescription.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SignedSoftwareCertificate.decode(reader); } return arr; })(),
            SignatureData.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        this.SessionId.encode(writer);
        this.AuthenticationToken.encode(writer);
        writer.writeDouble(this.RevisedSessionTimeout);
        this.ServerNonce.encode(writer);
        this.ServerCertificate.encode(writer);
        {
            const arr = this.ServerEndpoints ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.ServerSoftwareCertificates ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.ServerSignature.encode(writer);
        writer.writeUInt32(this.MaxRequestMessageSize);
    }
}
