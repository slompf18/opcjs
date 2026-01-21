// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Float64, UInt32, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.15
 */
export class SubscriptionDiagnosticsDataType implements IIdentifiable {
    constructor(
        public SessionId: NodeId,
        public SubscriptionId: UInt32,
        public Priority: UInt8,
        public PublishingInterval: Float64,
        public MaxKeepAliveCount: UInt32,
        public MaxLifetimeCount: UInt32,
        public MaxNotificationsPerPublish: UInt32,
        public PublishingEnabled: boolean,
        public ModifyCount: UInt32,
        public EnableCount: UInt32,
        public DisableCount: UInt32,
        public RepublishRequestCount: UInt32,
        public RepublishMessageRequestCount: UInt32,
        public RepublishMessageCount: UInt32,
        public TransferRequestCount: UInt32,
        public TransferredToAltClientCount: UInt32,
        public TransferredToSameClientCount: UInt32,
        public PublishRequestCount: UInt32,
        public DataChangeNotificationsCount: UInt32,
        public EventNotificationsCount: UInt32,
        public NotificationsCount: UInt32,
        public LatePublishRequestCount: UInt32,
        public CurrentKeepAliveCount: UInt32,
        public CurrentLifetimeCount: UInt32,
        public UnacknowledgedMessageCount: UInt32,
        public DiscardedMessageCount: UInt32,
        public MonitoredItemCount: UInt32,
        public DisabledMonitoredItemCount: UInt32,
        public MonitoringQueueOverflowCount: UInt32,
        public NextSequenceNumber: UInt32,
        public EventQueueOverflowCount: UInt32
    ) { }

    readonly id = 874

    public static decode(reader: BufferReader): SubscriptionDiagnosticsDataType {
        const obj = new SubscriptionDiagnosticsDataType(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readUInt8(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readBoolean(),
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
        this.SessionId.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        writer.writeUint8(this.Priority);
        writer.writeFloat64(this.PublishingInterval);
        writer.writeUInt32(this.MaxKeepAliveCount);
        writer.writeUInt32(this.MaxLifetimeCount);
        writer.writeUInt32(this.MaxNotificationsPerPublish);
        writer.writeBoolean(this.PublishingEnabled);
        writer.writeUInt32(this.ModifyCount);
        writer.writeUInt32(this.EnableCount);
        writer.writeUInt32(this.DisableCount);
        writer.writeUInt32(this.RepublishRequestCount);
        writer.writeUInt32(this.RepublishMessageRequestCount);
        writer.writeUInt32(this.RepublishMessageCount);
        writer.writeUInt32(this.TransferRequestCount);
        writer.writeUInt32(this.TransferredToAltClientCount);
        writer.writeUInt32(this.TransferredToSameClientCount);
        writer.writeUInt32(this.PublishRequestCount);
        writer.writeUInt32(this.DataChangeNotificationsCount);
        writer.writeUInt32(this.EventNotificationsCount);
        writer.writeUInt32(this.NotificationsCount);
        writer.writeUInt32(this.LatePublishRequestCount);
        writer.writeUInt32(this.CurrentKeepAliveCount);
        writer.writeUInt32(this.CurrentLifetimeCount);
        writer.writeUInt32(this.UnacknowledgedMessageCount);
        writer.writeUInt32(this.DiscardedMessageCount);
        writer.writeUInt32(this.MonitoredItemCount);
        writer.writeUInt32(this.DisabledMonitoredItemCount);
        writer.writeUInt32(this.MonitoringQueueOverflowCount);
        writer.writeUInt32(this.NextSequenceNumber);
        writer.writeUInt32(this.EventQueueOverflowCount);
    }
}
