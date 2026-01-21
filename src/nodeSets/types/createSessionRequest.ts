// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ApplicationDescription } from "./applicationDescription";
import { ByteString, Float64, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.2/#5.7.2.2
 */
export class CreateSessionRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ClientDescription: ApplicationDescription,
        public ServerUri: string | undefined,
        public EndpointUrl: string | undefined,
        public SessionName: string | undefined,
        public ClientNonce: ByteString,
        public ClientCertificate: ByteString,
        public RequestedSessionTimeout: Float64,
        public MaxResponseMessageSize: UInt32
    ) { }

    readonly id = 459

    public static decode(reader: BufferReader): CreateSessionRequest {
        const obj = new CreateSessionRequest(
            RequestHeader.decode(reader),
            ApplicationDescription.decode(reader),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readByteString(),
            reader.readByteString(),
            reader.readFloat64(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        this.ClientDescription.encode(writer);
        writer.writeString(this.ServerUri);
        writer.writeString(this.EndpointUrl);
        writer.writeString(this.SessionName);
        writer.writeByteString(this.ClientNonce);
        writer.writeByteString(this.ClientCertificate);
        writer.writeFloat64(this.RequestedSessionTimeout);
        writer.writeUInt32(this.MaxResponseMessageSize);
    }
}
