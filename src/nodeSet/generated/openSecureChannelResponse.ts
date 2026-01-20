// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { UInt32 } from "../../types/baseTypes";
import { ChannelSecurityToken } from "./channelSecurityToken";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * OpenSecureChannelResponse
 */
export class OpenSecureChannelResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public ServerProtocolVersion: UInt32,
        public SecurityToken: ChannelSecurityToken,
        public ServerNonce: ByteString
    ) { }

    public static decode(reader: BufferReader): OpenSecureChannelResponse {
        const obj = new OpenSecureChannelResponse(
            ResponseHeader.decode(reader),
            reader.readUInt32(),
            ChannelSecurityToken.decode(reader),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        writer.writeUInt32(this.ServerProtocolVersion);
        this.SecurityToken.encode(writer);
        this.ServerNonce.encode(writer);
    }
}
