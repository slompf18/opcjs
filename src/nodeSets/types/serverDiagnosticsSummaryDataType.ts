// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.9
 */
export class ServerDiagnosticsSummaryDataType implements IIdentifiable {
    constructor(
        public ServerViewCount: UInt32,
        public CurrentSessionCount: UInt32,
        public CumulatedSessionCount: UInt32,
        public SecurityRejectedSessionCount: UInt32,
        public RejectedSessionCount: UInt32,
        public SessionTimeoutCount: UInt32,
        public SessionAbortCount: UInt32,
        public CurrentSubscriptionCount: UInt32,
        public CumulatedSubscriptionCount: UInt32,
        public PublishingIntervalCount: UInt32,
        public SecurityRejectedRequestsCount: UInt32,
        public RejectedRequestsCount: UInt32
    ) { }

    readonly id = 859

    public static decode(reader: BufferReader): ServerDiagnosticsSummaryDataType {
        const obj = new ServerDiagnosticsSummaryDataType(
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.ServerViewCount);
        writer.writeUInt32(this.CurrentSessionCount);
        writer.writeUInt32(this.CumulatedSessionCount);
        writer.writeUInt32(this.SecurityRejectedSessionCount);
        writer.writeUInt32(this.RejectedSessionCount);
        writer.writeUInt32(this.SessionTimeoutCount);
        writer.writeUInt32(this.SessionAbortCount);
        writer.writeUInt32(this.CurrentSubscriptionCount);
        writer.writeUInt32(this.CumulatedSubscriptionCount);
        writer.writeUInt32(this.PublishingIntervalCount);
        writer.writeUInt32(this.SecurityRejectedRequestsCount);
        writer.writeUInt32(this.RejectedRequestsCount);
    }
}
