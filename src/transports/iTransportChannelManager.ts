import { ITransportChannel } from "./iTransportChannel";

export interface ITransportChannelManager {
    start(): void;
    newChannel(): ReadableStream<ITransportChannel>;
}