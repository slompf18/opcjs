import { ITransportChannel } from "../transports/iTransportChannel";

export class SecureChannel {
    public async open(): Promise<void> {
    }

    public async disconnect(): Promise<void> {
        this.channel.disconnect();
    }

    constructor(private channel: ITransportChannel) {}
}