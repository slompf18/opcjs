// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Int32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * EndpointConfiguration
 */
export class EndpointConfiguration implements IIdentifiable {
    constructor(
        public OperationTimeout: Int32,
        public UseBinaryEncoding: boolean,
        public MaxStringLength: Int32,
        public MaxByteStringLength: Int32,
        public MaxArrayLength: Int32,
        public MaxMessageSize: Int32,
        public MaxBufferSize: Int32,
        public ChannelLifetime: Int32,
        public SecurityTokenLifetime: Int32
    ) { }

    readonly id = 331
}
