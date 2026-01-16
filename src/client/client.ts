import { ITransportChannel } from "../transports/iTransportChannel";
import { WsChannel } from "../transports/ws/wsChannel";

export class Client {
    private endpointUrl: string;
    private channel?: ITransportChannel;

    constructor(endpointUrl: string) {
        this.endpointUrl = endpointUrl;
    }

    async connect(): Promise<void> {
        console.log(`Connecting to OPC UA server at ${this.endpointUrl}...`);
        this.channel = new WsChannel();
        this.channel.connect(this.endpointUrl);
        // Additional connection logic goes here

    }

    async disconnect(): Promise<void> {
        console.log('Disconnecting from OPC UA server...');
        // Implementation of disconnection logic goes here
    }
}