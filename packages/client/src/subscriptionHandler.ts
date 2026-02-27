import { DataChangeNotification, SubscriptionAcknowledgement } from "@opcua/base";
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
            const acknowledgement = new SubscriptionAcknowledgement();
            acknowledgement.subscriptionId = this.entries[i].subscriptionId;
            acknowledgement.sequenceNumber = acknowledgeSequenceNumbers[i];
            acknowledgements.push(acknowledgement);
        }
        const response = await this.subscriptionService.publish(acknowledgements);

        const messagesToAcknowledge = response.notificationMessage.sequenceNumber
        // todo: evaluatin status codes
        const notificationDatas = response.notificationMessage.notificationData

        for (let notificationData of notificationDatas) {
            const decodedData = notificationData.data;
            const typeNodeId = notificationData.typeId;
            if (typeNodeId.namespace === 0 && typeNodeId.identifier === 811) {
                const dataChangeNotification = decodedData as DataChangeNotification;
                for (let item of dataChangeNotification.monitoredItems) {
                    const clientHandle = item.clientHandle;
                    const value = item.value;
                    const entry = this.entries.find(e => e.handle == clientHandle);
                    entry?.callback([{
                        id: entry.id,
                        value: value.value?.value
                    }]);
                }
            } else {
                console.log(`The change notification data type ${typeNodeId.namespace}:${typeNodeId.identifier} is not supported.`)
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