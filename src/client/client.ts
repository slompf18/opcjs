import { ITransportChannel } from "../transports/iTransportChannel";
import { MsgHello } from "../transports/messages/msgHello";
import { WsChannel } from "../transports/ws/wsChannel";

export class Client {
    private DefaultReceiveBufferSize = 0xffff
    private DefaultSendBufferSize = 0xffff

    private endpointUrl: string;
    private channel?: ITransportChannel;

    constructor(endpointUrl: string) {
        this.endpointUrl = endpointUrl;
    }

    async connect(): Promise<void> {
        console.log(`Connecting to OPC UA server at ${this.endpointUrl}...`);
        this.channel = new WsChannel();
        await this.channel.connect(this.endpointUrl);
        console.log('WebSocket connected. Sending Hello message...');

        const msgHello = new MsgHello(0, this.DefaultReceiveBufferSize, this.DefaultSendBufferSize, 0, 0, this.endpointUrl);
        
        this.channel.send(msgHello); 

    }

    async disconnect(): Promise<void> {
        console.log('Disconnecting from OPC UA server...');
        // Implementation of disconnection logic goes here
        if (this.channel) {
            await this.channel.disconnect();
        }
    }
}