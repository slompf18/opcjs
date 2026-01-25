// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ApplicationDescription } from "./applicationDescription";
import { Float64, UInt32 } from "../../types/baseTypes";
import { ServiceCounterDataType } from "./serviceCounterDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.11
 */
export class SessionDiagnosticsDataType implements IIdentifiable {
    constructor(
        public SessionId: NodeId,
        public SessionName: string | undefined,
        public ClientDescription: ApplicationDescription,
        public ServerUri: string | undefined,
        public EndpointUrl: string | undefined,
        public LocaleIds: string[],
        public ActualSessionTimeout: Float64,
        public MaxResponseMessageSize: UInt32,
        public ClientConnectionTime: Date,
        public ClientLastContactTime: Date,
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

    readonly id = 865
}
