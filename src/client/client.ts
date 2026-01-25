import { SecureChannel } from "../secureChannel/secureChannel";
import { ChannelFactory } from "../transports/channelFactory";
import { SessionHandler } from "./sessions/sessionHandler";
import { ConfigurationClient } from "../configuration/configurationClient";
import { Session } from "./sessions/session";

export class Client {

    private endpointUrl: string;
    private channel?: SecureChannel;
    private session?: Session;

    getSession(): Session{
        if(!this.session){
            throw new Error("No session available");
        }
        return this.session;
    }

    async connect(): Promise<void> {
        console.log(`Connecting to OPC UA server at ${this.endpointUrl}...`);
        ChannelFactory.createChannel(this.endpointUrl);
        const channel = ChannelFactory.createChannel(this.endpointUrl);
        await channel.connect(this.endpointUrl);
        console.log('Connected to OPC UA server.');

        this.channel = new SecureChannel(channel);
        await this.channel.openSecureChannelRequest();

        const sessionHandler = new SessionHandler(this.channel, this.configuration);
        this.session = await sessionHandler.createNewSession();
    }

    async disconnect(): Promise<void> {
        console.log('Disconnecting from OPC UA server...');
        // Implementation of disconnection logic goes here
        if (this.channel) {
            await this.channel.disconnect();
        }
    }

    constructor(endpointUrl: string, private configuration: ConfigurationClient) {
        this.endpointUrl = endpointUrl;
    }
}