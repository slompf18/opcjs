import { DataChangeNotification, SubscriptionAcknowledgement } from "../nodeSets/types";
import { Id } from "./id";
import { MonitoredItemService } from "./services/monitoredItemService";
import { SubscriptionService } from "./services/subscriptionService";
import { SubscriptionHandlerEntry } from "./subscriptionHandlerEntry";

export class SubscriptionHandler {
    private entries = new Array<SubscriptionHandlerEntry>()
    private nextHandle = 0

    async subscribe(ids: Id[], callback: (data: { id: Id, value: unknown }[]) => void) {
        if (this.entries.length > 0) {
            throw new Error('Subscribing more than once is not implemented');
        }

        const subscriptionId = await this.subscriptionService.createSubscription()
        const items = []
        for (let id of ids) {
            const entry = new SubscriptionHandlerEntry(
                subscriptionId,
                this.nextHandle++,
                id,
                callback
            );
            this.entries.push(entry)
            const item = {
                id: id.toNodeId(),
                handle: entry.handle
            }
            items.push(item)
        }
        await this.monitoredItemService.createMonitoredItems(subscriptionId, items)
        this.publish([])
    }

    private async publish(acknowledgeSequenceNumbers: number[]) {
        const acknowledgements = []
        for (let i = 0; i < acknowledgeSequenceNumbers.length; i++) {
            const acknowledgement = new SubscriptionAcknowledgement(
                this.entries[i].subscriptionId,
                acknowledgeSequenceNumbers[i]);
            acknowledgements.push(acknowledgement);
        }
        const response = await this.subscriptionService.publish(acknowledgements);

        const messagesToAcknowledge = response.NotificationMessage.SequenceNumber
        // todo: evaluatin status codes
        const notificationDatas = response.NotificationMessage.NotificationData

        for (let notificationData of notificationDatas) {
            const decodedData = notificationData.decodeBody();
            const typeNodeId = notificationData.TypeId.NodeId;
            if (typeNodeId.Namespace === 0 && typeNodeId.Identifier === 811) {
                const dataChangeNotification = decodedData as DataChangeNotification;
                for (let item of dataChangeNotification.MonitoredItems) {
                    const clientHandle = item.ClientHandle;
                    const value = item.Value;
                    const entry = this.entries.find(e => e.handle == clientHandle);
                    entry?.callback([{
                        id: entry.id,
                        value: value.Value?.Value
                    }]);
                }
            } else {
                console.log(`The change notification data type ${typeNodeId.Namespace}:${typeNodeId.Identifier} is not supported.`)
            }
        }

        setTimeout(() => {
            this.publish([messagesToAcknowledge]);
        }, 500);
    }

    constructor(
        private subscriptionService: SubscriptionService,
        private monitoredItemService: MonitoredItemService
    ) {
    }
}