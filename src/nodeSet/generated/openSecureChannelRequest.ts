// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { SecurityTokenRequestTypeEnum } from "./securityTokenRequestType";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * OpenSecureChannelRequest
 */
export class OpenSecureChannelRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public ClientProtocolVersion: UInt32,
        public RequestType: SecurityTokenRequestTypeEnum,
        public SecurityMode: MessageSecurityModeEnum,
        public ClientNonce: ByteString,
        public RequestedLifetime: UInt32
    ) { }

    public static decode(reader: BufferReader): OpenSecureChannelRequest {
        const obj = new OpenSecureChannelRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            SecurityTokenRequestTypeEnum.decode(reader),
            MessageSecurityModeEnum.decode(reader),
            ByteString.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.ClientProtocolVersion);
        SecurityTokenRequestTypeEnum.encode(writer, this.RequestType);
        MessageSecurityModeEnum.encode(writer, this.SecurityMode);
        this.ClientNonce.encode(writer);
        writer.writeUInt32(this.RequestedLifetime);
    }
}
