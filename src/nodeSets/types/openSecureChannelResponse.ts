// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { ByteString, UInt32 } from "../../types/baseTypes";
import { ChannelSecurityToken } from "./channelSecurityToken";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * OpenSecureChannelResponse
 */
export class OpenSecureChannelResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public ServerProtocolVersion: UInt32,
        public SecurityToken: ChannelSecurityToken,
        public ServerNonce: ByteString
    ) { }

    readonly id = 447

    public static decode(reader: BufferReader): OpenSecureChannelResponse {
        const obj = new OpenSecureChannelResponse(
            ResponseHeader.decode(reader),
            reader.readUInt32(),
            ChannelSecurityToken.decode(reader),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        writer.writeUInt32(this.ServerProtocolVersion);
        this.SecurityToken.encode(writer);
        writer.writeByteString(this.ServerNonce);
    }
}
