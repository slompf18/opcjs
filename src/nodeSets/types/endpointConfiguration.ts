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

    public static decode(reader: BufferReader): EndpointConfiguration {
        const obj = new EndpointConfiguration(
            reader.readInt32(),
            reader.readBoolean(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt32(this.OperationTimeout);
        writer.writeBoolean(this.UseBinaryEncoding);
        writer.writeInt32(this.MaxStringLength);
        writer.writeInt32(this.MaxByteStringLength);
        writer.writeInt32(this.MaxArrayLength);
        writer.writeInt32(this.MaxMessageSize);
        writer.writeInt32(this.MaxBufferSize);
        writer.writeInt32(this.ChannelLifetime);
        writer.writeInt32(this.SecurityTokenLifetime);
    }
}
