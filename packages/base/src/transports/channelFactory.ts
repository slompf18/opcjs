import { ChannelBase } from "./channelBase";
import { ITransportChannel } from "./iTransportChannel";
import { WsChannel } from "./ws/wsChannel";

export class ChannelFactory {
    public static createChannel(endpointUrl: string): ITransportChannel {
        // todo: parse endpointUrl to choose channel type
        return new ChannelBase(endpointUrl,new WsChannel());
    }
}