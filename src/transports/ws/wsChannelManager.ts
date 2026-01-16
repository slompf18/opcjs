import { ITransportChannel } from "../iTransportChannel";

export class WsChannelManager {
    start(): void {
        // Implementation for starting the WebSocket channel manager
    }

    newChannel(): ReadableStream<ITransportChannel> {
        // Implementation for creating a new WebSocket transport channel
        return new ReadableStream<ITransportChannel>({
            start(controller) {
                // Logic to create and enqueue a new ITransportChannel
            }
        });
    }
}
