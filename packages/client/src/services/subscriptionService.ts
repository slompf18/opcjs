import { CreateSubscriptionRequest, CreateSubscriptionResponse, ISecureChannel, NodeId, PublishRequest, PublishResponse, SubscriptionAcknowledgement } from "@opcua/base";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14
export class SubscriptionService extends ServiceBase {
    // https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.2
    async createSubscription(): Promise<number> {
        const request = new CreateSubscriptionRequest();
        request.requestHeader = this.createRequestHeader();
        request.requestedPublishingInterval = 2000; // 2 sec
        request.requestedLifetimeCount = 360000; // 5 min
        request.requestedMaxKeepAliveCount = 60000; // 1 min
        request.maxNotificationsPerPublish = 200;
        request.publishingEnabled = true;
        request.priority = 1;


        console.log("Sending createSubscription...");
        const response = await this.secureChannel.issueServiceRequest(request) as CreateSubscriptionResponse;
        console.log("Subscription created with id:", response.subscriptionId);
        return response.subscriptionId;
    }

    // https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.5
    async publish(acknowledgements: SubscriptionAcknowledgement[]): Promise<PublishResponse> {
        const request = new PublishRequest();
        request.requestHeader = this.createRequestHeader();
        request.subscriptionAcknowledgements = acknowledgements;

        console.log('Sending publish...');
        const response = await this.secureChannel.issueServiceRequest(request) as PublishResponse;
        console.log('Received publish response.')
        return response;
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}