export interface ITransportChannel {
    getReciverChannel(): ReadableStream<ArrayBuffer>;
    getSenderChannel(): ReadableStream<ArrayBuffer>;
    getSendBufferSize(): number;
    getRecvBufferSize(): number;
    getCancelFunc(): () => void;
    connect(endpointUrl: string): void;
}