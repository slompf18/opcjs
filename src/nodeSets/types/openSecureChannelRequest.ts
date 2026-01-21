// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ByteString, UInt32 } from "../../types/baseTypes";
import { SecurityTokenRequestTypeEnum } from "./securityTokenRequestType";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * OpenSecureChannelRequest
 */
export class OpenSecureChannelRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ClientProtocolVersion: UInt32,
        public RequestType: SecurityTokenRequestTypeEnum,
        public SecurityMode: MessageSecurityModeEnum,
        public ClientNonce: ByteString,
        public RequestedLifetime: UInt32
    ) { }

    readonly id = 444

    public static decode(reader: BufferReader): OpenSecureChannelRequest {
        const obj = new OpenSecureChannelRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            SecurityTokenRequestTypeEnum.decode(reader),
            MessageSecurityModeEnum.decode(reader),
            reader.readByteString(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.ClientProtocolVersion);
        SecurityTokenRequestTypeEnum.encode(writer, this.RequestType);
        MessageSecurityModeEnum.encode(writer, this.SecurityMode);
        writer.writeByteString(this.ClientNonce);
        writer.writeUInt32(this.RequestedLifetime);
    }
}
