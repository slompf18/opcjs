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

    getId(): number { return 447; }
}
