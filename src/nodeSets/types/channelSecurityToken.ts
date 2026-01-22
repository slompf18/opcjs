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
}
