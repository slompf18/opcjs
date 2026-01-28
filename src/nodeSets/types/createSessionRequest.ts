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

    getId(): number { return 459; }
}
