import { CreateMonitoredItemsRequest, CreateMonitoredItemsResponse, MonitoredItemCreateRequest, MonitoringModeEnum, MonitoringParameters, ReadValueId, TimestampsToReturnEnum } from "../../nodeSets/types";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { AttrIdValue } from "./attributeServiceAttributes";
import { ServiceBase } from "./serviceBase";

export class MonitoredItemService extends ServiceBase {

    async createMonitoredItems(subscriptionId: UInt32, ids: { id: NodeId, handle: UInt32 }[]): Promise<void> {
        const items = ids.map(ni => new MonitoredItemCreateRequest(
            new ReadValueId(
                ni.id,
                AttrIdValue,
                undefined,
                new QualifiedName(0, '')
            ),
            MonitoringModeEnum.Reporting,
            new MonitoringParameters(
                ni.handle,
                1000, // 1 sec
                ExtensionObject.newEmpty(),
                100,
                true
            )
        ));

        const request = new CreateMonitoredItemsRequest(
            this.createRequestHeader(),
            subscriptionId,
            TimestampsToReturnEnum.Source,
            items
        )

        console.log("Sending createMonitoredItems...");
        await this.secureChannel.issueServiceRequest(request) as CreateMonitoredItemsResponse;
        // todo: handle Statuscodes
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel)
    }
}