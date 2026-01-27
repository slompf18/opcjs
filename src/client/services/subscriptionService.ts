import { CreateSubscriptionRequest, CreateSubscriptionResponse, PublishRequest, PublishResponse, SubscriptionAcknowledgement } from "../../nodeSets/types";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { UInt32 } from "../../types/baseTypes";
import { NodeId } from "../../types/nodeId";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14
export class SubscriptionService extends ServiceBase {
    // https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.2
    async createSubscription(): Promise<UInt32> {
        const request = new CreateSubscriptionRequest(
            this.createRequestHeader(),
            2000, // 2 sec
            360000, // 5 min
            60000, // 1 min
            200,
            true,
            1
        )


        console.log("Sending createSubscription...");
        const response = await this.secureChannel.issueServiceRequest(request) as CreateSubscriptionResponse;
        console.log("Subscription created with id:", response.SubscriptionId);
        return response.SubscriptionId;
    }

    // https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.5
    async publish(acknowledgements: SubscriptionAcknowledgement[]): Promise<PublishResponse> {
        const request = new PublishRequest(
            this.createRequestHeader(),
            acknowledgements
        );

        console.log('Sending publish...');
        const response = await this.secureChannel.issueServiceRequest(request) as PublishResponse;
        console.log('Received publish response.')
        return response;
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}