import {
    CreateSubscriptionRequest, CreateSubscriptionResponse, getLogger, ISecureChannel, NodeId,
    PublishRequest, PublishResponse, StatusCode, StatusCodeToString, SubscriptionAcknowledgement,
} from "opcjs-base";
import { ServiceBase } from "./serviceBase";
import { SubscriptionOptions } from "./subscriptionOptions";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14
export class SubscriptionService extends ServiceBase {
    private logger = getLogger("services.SubscriptionService");

    /**
     * Creates a new subscription on the server (OPC UA Part 4, Section 5.14.2).
     * @param options - Optional subscription parameters; server revises all values.
     * @returns The server-assigned subscription ID.
     */
    // https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.2
    async createSubscription(options?: SubscriptionOptions): Promise<number> {
        const request = new CreateSubscriptionRequest();
        request.requestHeader = this.createRequestHeader();
        request.requestedPublishingInterval = options?.requestedPublishingInterval ?? 2000;
        request.requestedLifetimeCount = options?.requestedLifetimeCount ?? 360000;
        request.requestedMaxKeepAliveCount = options?.requestedMaxKeepAliveCount ?? 60000;
        request.maxNotificationsPerPublish = options?.maxNotificationsPerPublish ?? 200;
        request.publishingEnabled = true;
        request.priority = options?.priority ?? 1;

        this.logger.debug("Sending CreateSubscriptionRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as CreateSubscriptionResponse;

        const serviceResult = response.responseHeader?.serviceResult;
        if (serviceResult !== undefined && serviceResult !== StatusCode.Good) {
            throw new Error(`CreateSubscriptionRequest failed: ${StatusCodeToString(serviceResult)}`);
        }

        this.logger.debug(`Subscription created with id: ${response.subscriptionId}`);
        return response.subscriptionId;
    }

    /**
     * Sends a publish request to receive notifications from active subscriptions (OPC UA Part 4, Section 5.14.5).
     * @param acknowledgements - Sequence numbers to acknowledge from previous publish responses.
     * @returns The publish response containing notification data.
     */
    // https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.5
    async publish(acknowledgements: SubscriptionAcknowledgement[]): Promise<PublishResponse> {
        const request = new PublishRequest();
        request.requestHeader = this.createRequestHeader();
        request.subscriptionAcknowledgements = acknowledgements;

        this.logger.debug("Sending PublishRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as PublishResponse;

        const serviceResult = response.responseHeader?.serviceResult;
        if (serviceResult !== undefined && serviceResult !== StatusCode.Good) {
            throw new Error(`PublishRequest failed: ${StatusCodeToString(serviceResult)}`);
        }

        this.logger.debug("Received PublishResponse.");
        return response;
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}