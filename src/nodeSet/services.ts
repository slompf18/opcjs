import { UInt32 } from "../types/baseTypes"
import { ByteString } from "../types/byteString"

export class OpenSecureChannelRequest {
    constructor(
        public RequestHeader: RequestHeader,
        public ClientProtocolVersion: UInt32,
        public RequestType: SecurityTokenRequestType,
        public SecurityMode: MessageSecurityMode,
        public ClientNonce: ByteString,
        public RequestedLifetime: UInt32
    ) { }
}

export class OpenSecureChannelResponse {
    constructor(
        public ResponseHeader: ResponseHeader,
        public ServerProtocolVersion: UInt32,
        public SecurityToken: ChannelSecurityToken,
        public ServerNonce: ByteString
    ) { }
}