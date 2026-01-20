// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ApplicationDescription } from "./applicationDescription";
import { Float64, UInt32 } from "../../types/baseTypes";
import { DateTime } from "../../types/dateTime";
import { ServiceCounterDataType } from "./serviceCounterDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.11
 */
export class SessionDiagnosticsDataType implements IEncodable {
    constructor(
        public SessionId: NodeId,
        public SessionName: string | undefined,
        public ClientDescription: ApplicationDescription,
        public ServerUri: string | undefined,
        public EndpointUrl: string | undefined,
        public LocaleIds: string | undefined[],
        public ActualSessionTimeout: Float64,
        public MaxResponseMessageSize: UInt32,
        public ClientConnectionTime: DateTime,
        public ClientLastContactTime: DateTime,
        public CurrentSubscriptionsCount: UInt32,
        public CurrentMonitoredItemsCount: UInt32,
        public CurrentPublishRequestsInQueue: UInt32,
        public TotalRequestCount: ServiceCounterDataType,
        public UnauthorizedRequestCount: UInt32,
        public ReadCount: ServiceCounterDataType,
        public HistoryReadCount: ServiceCounterDataType,
        public WriteCount: ServiceCounterDataType,
        public HistoryUpdateCount: ServiceCounterDataType,
        public CallCount: ServiceCounterDataType,
        public CreateMonitoredItemsCount: ServiceCounterDataType,
        public ModifyMonitoredItemsCount: ServiceCounterDataType,
        public SetMonitoringModeCount: ServiceCounterDataType,
        public SetTriggeringCount: ServiceCounterDataType,
        public DeleteMonitoredItemsCount: ServiceCounterDataType,
        public CreateSubscriptionCount: ServiceCounterDataType,
        public ModifySubscriptionCount: ServiceCounterDataType,
        public SetPublishingModeCount: ServiceCounterDataType,
        public PublishCount: ServiceCounterDataType,
        public RepublishCount: ServiceCounterDataType,
        public TransferSubscriptionsCount: ServiceCounterDataType,
        public DeleteSubscriptionsCount: ServiceCounterDataType,
        public AddNodesCount: ServiceCounterDataType,
        public AddReferencesCount: ServiceCounterDataType,
        public DeleteNodesCount: ServiceCounterDataType,
        public DeleteReferencesCount: ServiceCounterDataType,
        public BrowseCount: ServiceCounterDataType,
        public BrowseNextCount: ServiceCounterDataType,
        public TranslateBrowsePathsToNodeIdsCount: ServiceCounterDataType,
        public QueryFirstCount: ServiceCounterDataType,
        public QueryNextCount: ServiceCounterDataType,
        public RegisterNodesCount: ServiceCounterDataType,
        public UnregisterNodesCount: ServiceCounterDataType
    ) { }

    public static decode(reader: BufferReader): SessionDiagnosticsDataType {
        const obj = new SessionDiagnosticsDataType(
            reader.readNodeId(),
            reader.readString(),
            ApplicationDescription.decode(reader),
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readDouble(),
            reader.readUInt32(),
            DateTime.decode(reader),
            DateTime.decode(reader),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            ServiceCounterDataType.decode(reader),
            reader.readUInt32(),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader),
            ServiceCounterDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.SessionId.encode(writer);
        writer.writeString(this.SessionName);
        this.ClientDescription.encode(writer);
        writer.writeString(this.ServerUri);
        writer.writeString(this.EndpointUrl);
        {
            const arr = this.LocaleIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeDouble(this.ActualSessionTimeout);
        writer.writeUInt32(this.MaxResponseMessageSize);
        this.ClientConnectionTime.encode(writer);
        this.ClientLastContactTime.encode(writer);
        writer.writeUInt32(this.CurrentSubscriptionsCount);
        writer.writeUInt32(this.CurrentMonitoredItemsCount);
        writer.writeUInt32(this.CurrentPublishRequestsInQueue);
        this.TotalRequestCount.encode(writer);
        writer.writeUInt32(this.UnauthorizedRequestCount);
        this.ReadCount.encode(writer);
        this.HistoryReadCount.encode(writer);
        this.WriteCount.encode(writer);
        this.HistoryUpdateCount.encode(writer);
        this.CallCount.encode(writer);
        this.CreateMonitoredItemsCount.encode(writer);
        this.ModifyMonitoredItemsCount.encode(writer);
        this.SetMonitoringModeCount.encode(writer);
        this.SetTriggeringCount.encode(writer);
        this.DeleteMonitoredItemsCount.encode(writer);
        this.CreateSubscriptionCount.encode(writer);
        this.ModifySubscriptionCount.encode(writer);
        this.SetPublishingModeCount.encode(writer);
        this.PublishCount.encode(writer);
        this.RepublishCount.encode(writer);
        this.TransferSubscriptionsCount.encode(writer);
        this.DeleteSubscriptionsCount.encode(writer);
        this.AddNodesCount.encode(writer);
        this.AddReferencesCount.encode(writer);
        this.DeleteNodesCount.encode(writer);
        this.DeleteReferencesCount.encode(writer);
        this.BrowseCount.encode(writer);
        this.BrowseNextCount.encode(writer);
        this.TranslateBrowsePathsToNodeIdsCount.encode(writer);
        this.QueryFirstCount.encode(writer);
        this.QueryNextCount.encode(writer);
        this.RegisterNodesCount.encode(writer);
        this.UnregisterNodesCount.encode(writer);
    }
}
