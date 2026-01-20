// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { DateTime } from "../../types/dateTime";
import { IEncodable } from "../../coders/iEncodable";

/**
 * ChannelSecurityToken
 */
export class ChannelSecurityToken implements IEncodable {
    constructor(
        public ChannelId: UInt32,
        public TokenId: UInt32,
        public CreatedAt: DateTime,
        public RevisedLifetime: UInt32
    ) { }

    public static decode(reader: BufferReader): ChannelSecurityToken {
        const obj = new ChannelSecurityToken(
            reader.readUInt32(),
            reader.readUInt32(),
            DateTime.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.ChannelId);
        writer.writeUInt32(this.TokenId);
        this.CreatedAt.encode(writer);
        writer.writeUInt32(this.RevisedLifetime);
    }
}
