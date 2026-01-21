// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.5/#5.14.5.2
 */
export class SubscriptionAcknowledgement implements IIdentifiable {
    constructor(
        public SubscriptionId: UInt32,
        public SequenceNumber: UInt32
    ) { }

    readonly id = 821

    public static decode(reader: BufferReader): SubscriptionAcknowledgement {
        const obj = new SubscriptionAcknowledgement(
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.SubscriptionId);
        writer.writeUInt32(this.SequenceNumber);
    }
}
