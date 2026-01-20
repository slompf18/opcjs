import { IEncodable } from "../coders/iEncodable"

export interface ISocket {
    connect(endpointUrl: string): Promise<void>
    send(msg: IEncodable): Promise<void>
    disconnect(): Promise<void>
    onMessage?: (data: ArrayBuffer) => void
    onClose?: () => void
    onError?: (error: string) => void
}