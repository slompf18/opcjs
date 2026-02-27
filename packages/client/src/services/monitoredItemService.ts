import { 
    CreateMonitoredItemsRequest, CreateMonitoredItemsResponse, 
    ExtensionObject, ISecureChannel, MonitoredItemCreateRequest, MonitoringParameters, 
    NodeId, QualifiedName, ReadValueId, TimestampsToReturnEnum } from "opcjs-base";
import { AttrIdValue } from "./attributeServiceAttributes";
import { ServiceBase } from "./serviceBase";

export class MonitoredItemService extends ServiceBase {

    async createMonitoredItems(subscriptionId: number, ids: { id: NodeId, handle: number }[]): Promise<void> {
        const items = ids.map(ni => {
            const readValueId = new ReadValueId();
            readValueId.nodeId =                ni.id;
            readValueId.attributeId =                AttrIdValue;
            readValueId.indexRange =                '';
            readValueId.dataEncoding =                new QualifiedName(0, '');

            const monitoringParameters = new MonitoringParameters();
            monitoringParameters.clientHandle =                ni.handle;
            monitoringParameters.samplingInterval =                1000; // 1 sec
            monitoringParameters.filter =                ExtensionObject.newEmpty();
            monitoringParameters.queueSize =                100;
            monitoringParameters.discardOldest =                true;

            const monitoredItemCreateRequest = new MonitoredItemCreateRequest();
            monitoredItemCreateRequest.itemToMonitor = readValueId;
            monitoredItemCreateRequest.requestedParameters = monitoringParameters;
            return monitoredItemCreateRequest;            
        });

        const request = new CreateMonitoredItemsRequest();
        request.requestHeader = this.createRequestHeader();
        request.subscriptionId = subscriptionId;
        request.timestampsToReturn = TimestampsToReturnEnum.Source;
        request.itemsToCreate = items;

        console.log("Sending createMonitoredItems...");
        await this.secureChannel.issueServiceRequest(request) as CreateMonitoredItemsResponse;
        // todo: handle Statuscodes
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel)
    }
}