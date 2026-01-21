// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ChannelSecurityToken
 */
export class ChannelSecurityToken implements IIdentifiable {
    constructor(
        public ChannelId: UInt32,
        public TokenId: UInt32,
        public CreatedAt: Date,
        public RevisedLifetime: UInt32
    ) { }

    readonly id = 441

    public static decode(reader: BufferReader): ChannelSecurityToken {
        const obj = new ChannelSecurityToken(
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.ChannelId);
        writer.writeUInt32(this.TokenId);
        writer.writeDateTime(this.CreatedAt);
        writer.writeUInt32(this.RevisedLifetime);
    }
}
