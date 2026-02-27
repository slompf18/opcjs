export interface ISocket {
    connect(endpointUrl: string): Promise<void>
    send(msg: Uint8Array): Promise<void>
    disconnect(): Promise<void>
    onMessage?: (data: ArrayBuffer) => void
    onClose?: () => void
    onError?: (error: string) => void
}