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
}
