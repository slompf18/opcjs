import { ReadRequest, ReadResponse, ReadValueId, TimestampsToReturnEnum } from "../../nodeSets/types";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { StatusCode, statusCodeToString } from "../../types/statusCode";
import { AttrIdValue } from "./attributeServiceAttributes";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.11
export class AttributeService extends ServiceBase {
    async ReadValue(nodeIds: NodeId[]): Promise<{ status: string, value: unknown }[]> {
        const readValueIds = nodeIds.map(ni => new ReadValueId(
            ni,
            AttrIdValue,
            undefined,
            new QualifiedName(0, '')
        ));

        const request = new ReadRequest(
            this.createRequestHeader(),
            60000, // one minute
            TimestampsToReturnEnum.Source,
            readValueIds
        )

        console.log("Sending ReadRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as ReadResponse;

        const results = new Array<{ status: string, value: unknown }>()
        for (let dataValue of response.Results) {
            const result = {
                status: statusCodeToString(dataValue.Status as StatusCode),
                value: dataValue.Value?.Value
            }
            results.push(result)
        }
        return results;
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}