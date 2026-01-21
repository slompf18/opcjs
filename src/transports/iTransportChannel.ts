import { IEncodable } from "../codecs/iEncodable";

export interface ITransportChannel {
    // getReciverChannel(): ReadableStream<ArrayBuffer>;
    // getSenderChannel(): ReadableStream<ArrayBuffer>;
    // getSendBufferSize(): number;
    // getRecvBufferSize(): number;
    // getCancelFunc(): () => void;
    connect(endpointUrl: string): void;
    disconnect(): void;
    send(data: Uint8Array): Promise<void>;
    onMessage?: (data: Uint8Array) => void
}