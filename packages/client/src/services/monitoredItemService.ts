import {
    CreateMonitoredItemsRequest, CreateMonitoredItemsResponse,
    ExtensionObject, getLogger, ISecureChannel, MonitoredItemCreateRequest, MonitoringModeEnum,
    MonitoringParameters, NodeId, QualifiedName, ReadValueId, StatusCode, StatusCodeToString,
    TimestampsToReturnEnum,
} from "opcjs-base";
import { AttrIdValue } from "./attributeServiceAttributes";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.13.2
export class MonitoredItemService extends ServiceBase {
    private logger = getLogger("services.MonitoredItemService");

    /**
     * Creates monitored items within a subscription (OPC UA Part 4, Section 5.13.2).
     * @param subscriptionId - ID of the subscription to add monitored items to.
     * @param ids - Array of NodeIds and client handles identifying the items to monitor.
     * @param samplingInterval - Requested sampling interval in milliseconds. -1 = use subscription publishing interval.
     * @param queueSize - Requested queue size for each monitored item.
     */
    async createMonitoredItems(
        subscriptionId: number,
        ids: { id: NodeId, handle: number }[],
        samplingInterval: number = 1000,
        queueSize: number = 100,
    ): Promise<void> {
        const items = ids.map(ni => {
            const readValueId = new ReadValueId();
            readValueId.nodeId = ni.id;
            readValueId.attributeId = AttrIdValue;
            readValueId.indexRange = '';
            readValueId.dataEncoding = new QualifiedName(0, ''); // empty per OPC UA Part 4 §7.28 — no longer used

            const monitoringParameters = new MonitoringParameters();
            monitoringParameters.clientHandle = ni.handle;
            monitoringParameters.samplingInterval = samplingInterval;
            monitoringParameters.filter = ExtensionObject.newEmpty();
            monitoringParameters.queueSize = queueSize;
            monitoringParameters.discardOldest = true;

            const monitoredItemCreateRequest = new MonitoredItemCreateRequest();
            monitoredItemCreateRequest.itemToMonitor = readValueId;
            monitoredItemCreateRequest.monitoringMode = MonitoringModeEnum.Reporting;
            monitoredItemCreateRequest.requestedParameters = monitoringParameters;
            return monitoredItemCreateRequest;
        });

        const request = new CreateMonitoredItemsRequest();
        request.requestHeader = this.createRequestHeader();
        request.subscriptionId = subscriptionId;
        request.timestampsToReturn = TimestampsToReturnEnum.Source;
        request.itemsToCreate = items;

        this.logger.debug("Sending CreateMonitoredItemsRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as CreateMonitoredItemsResponse;

        const serviceResult = response.responseHeader?.serviceResult;
        if (serviceResult !== undefined && serviceResult !== StatusCode.Good) {
            throw new Error(`CreateMonitoredItemsRequest failed: ${StatusCodeToString(serviceResult)}`);
        }

        for (const result of response.results ?? []) {
            if (result.statusCode !== undefined && result.statusCode !== StatusCode.Good) {
                this.logger.warn(`Failed to create monitored item: ${StatusCodeToString(result.statusCode)}`);
            }
        }
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}