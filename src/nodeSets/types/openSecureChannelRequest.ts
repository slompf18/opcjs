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
}
