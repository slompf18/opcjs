import { BufferReader } from "../coders/binary/bufferReader";
import { IEncodable } from "../coders/iEncodable";
import { ISocket } from "./iSocket";
import { ITransportChannel } from "./iTransportChannel";
import { MsgAck } from "./messages/msgAck";
import { MsgHeader } from "./messages/msgHeader";
import { MsgHello } from "./messages/msgHello";
import { MsgTypeAck } from "./messages/msgTypes";

export class ChannelBase implements ITransportChannel {
    private DefaultReceiveBufferSize = 0xffff
    private DefaultSendBufferSize = 0xffff
    private connectResolve?: () => void;

    public async connect(endpointUrl: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await this.socket.connect(endpointUrl);
            this.socket.onMessage = (data: ArrayBuffer) => this.onMessage(new Uint8Array(data));
            this.socket.onError = (error: string) => this.onError(error);
            this.socket.onClose = () => this.onClose();

            this.connectResolve = resolve;
            const msgHello = new MsgHello(0, this.DefaultReceiveBufferSize, this.DefaultSendBufferSize, 0, 0, endpointUrl);
            this.send(msgHello);
        });
    }

    onClose(): void {
        // todo: handle close
        throw new Error("Method not implemented.");
    }

    onError(error: string): void {
        // todo: handle error
        throw new Error("Method not implemented.");
    }

    disconnect(): Promise<void> {
        return this.socket.disconnect();
    }

    send(data: IEncodable): Promise<void> {
        return this.socket.send(data);
    }

    protected onMessage(data: Uint8Array): void {
        console.log("Message received from server:", data);
        const bufferReader = new BufferReader(data);
        const header = MsgHeader.decode(bufferReader);

        switch (header.messageType) {
            case MsgTypeAck:
                bufferReader.rewind();
                this.onAck(bufferReader);
                break;
            default:
                console.warn("Unknown message type received:", header.messageType);
                const hexBytes = Array.from(data.slice(0, 32))
                    .map(b => b.toString(16).padStart(2, '0').toUpperCase())
                    .join(' ');
                console.log("Received data - first 32 bytes (hex):", hexBytes);
                console.log("Total size:", data.byteLength, "bytes");
        }
    }

    private onAck(bufferReader: BufferReader): void {
        const msgAck = MsgAck.decode(bufferReader);

        // todo: handle ack parameters
        if (this.connectResolve) {
            this.connectResolve();
            this.connectResolve = undefined;
        }
    }

    constructor(private socket: ISocket) { }
}