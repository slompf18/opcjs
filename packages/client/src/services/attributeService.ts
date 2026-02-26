import { ISecureChannel, NodeId, QualifiedName, ReadRequest, ReadResponse, ReadValueId, TimestampsToReturnEnum } from "@opcua/base";
import { AttrIdValue } from "./attributeServiceAttributes";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.11
export class AttributeService extends ServiceBase {
    async ReadValue(nodeIds: NodeId[]): Promise<{ status: string, value: unknown }[]> {
        const readValueIds = nodeIds.map(ni => {
            const readValueId = new ReadValueId();
            readValueId.nodeId = ni;
            readValueId.attributeId = AttrIdValue;
            readValueId.indexRange = '';
            readValueId.dataEncoding = new QualifiedName(0, '');
            return readValueId;
        });

        const request = new ReadRequest();
        request.requestHeader = this.createRequestHeader();
        request.maxAge = 60000; // one minute
        request.timestampsToReturn = TimestampsToReturnEnum.Source;
        request.nodesToRead = readValueIds;

        console.log("Sending ReadRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as ReadResponse;

        const results = new Array<{ status: string, value: unknown }>()
        for (let dataValue of response.results ?? []) {
            const result = {
                status: dataValue.statusCode?.toString() ?? 'Unknown',
                value: dataValue.value as unknown
            }
            results.push(result)
        }
        return results;
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}