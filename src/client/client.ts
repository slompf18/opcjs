import { SecureChannel } from "../secureChannel/secureChannel";
import { ChannelFactory } from "../transports/channelFactory";

export class Client {

    private endpointUrl: string;
    private channel?: SecureChannel;

    constructor(endpointUrl: string) {
        this.endpointUrl = endpointUrl;
    }

    async connect(): Promise<void> {
        console.log(`Connecting to OPC UA server at ${this.endpointUrl}...`);
        ChannelFactory.createChannel(this.endpointUrl);
        const channel = ChannelFactory.createChannel(this.endpointUrl);
        await channel.connect(this.endpointUrl);
        console.log('Connected to OPC UA server.');

        this.channel = new SecureChannel(channel);
        this.channel.openSecureChannelRequest();

    }

    async disconnect(): Promise<void> {
        console.log('Disconnecting from OPC UA server...');
        // Implementation of disconnection logic goes here
        if (this.channel) {
            await this.channel.disconnect();
        }
    }
}