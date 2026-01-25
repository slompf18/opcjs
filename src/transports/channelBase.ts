import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IEncodable } from "../codecs/iEncodable";
import { ISocket } from "./iSocket";
import { ITransportChannel } from "./iTransportChannel";
import { MsgAck } from "./messages/msgAck";
import { MsgError } from "./messages/msgError";
import { MsgHeader } from "./messages/msgHeader";
import { MsgHello } from "./messages/msgHello";
import { MsgTypeAck, MsgTypeError, MsgTypeHello, MsgTypeReverseHello } from "./messages/msgTypes";

export class ChannelBase implements ITransportChannel {
    private DefaultReceiveBufferSize = 0xffff
    private DefaultSendBufferSize = 0xffff
    private connectResolve?: () => void;

    public async connect(endpointUrl: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await this.socket.connect(endpointUrl);
            this.socket.onMessage = (data: ArrayBuffer) => this.onMessageReceived(new Uint8Array(data));
            this.socket.onError = (error: string) => this.onError(error);
            this.socket.onClose = () => this.onClose();

            this.connectResolve = resolve;
            const msg = new MsgHello(0, this.DefaultReceiveBufferSize, this.DefaultSendBufferSize, 0, 0, endpointUrl);

            const bufferWriter = new BufferWriter();
            msg.encode(bufferWriter);
            const data = bufferWriter.getData();

            return this.send(data);
        });
    }

    onClose(): void {
        // todo: handle close
        console.warn("Socket closed.");
    }

    onError(error: string): void {
        // todo: handle error
        console.error("Socket error:", error);
    }

    disconnect(): Promise<void> {
        console.log("ChannelBase disconnecting...");
        return this.socket.disconnect();
    }

    send(data: Uint8Array): Promise<void> {
        return this.socket.send(data);
    }

    onMessage?: ((data: Uint8Array) => void) | undefined;

    private onMessageReceived(data: Uint8Array): void {
        //console.log("Message received from server:", data);
        const bufferReader = new BufferReader(data);
        const header = MsgHeader.decode(bufferReader);

        switch (header.messageType) {
            case MsgTypeAck:
                bufferReader.rewind();
                this.onAckMessage(bufferReader);
                break;
            case MsgTypeHello:
                console.error("Unexpected Hello message received from server.");
                break;
            case MsgTypeError:
                bufferReader.rewind();
                this.onErrorMessage(bufferReader);
                break;
            case MsgTypeReverseHello:
                console.error("Unexpected ReverseHello message received from server.");
                break;
            default:
                this.onMessage?.(data);
        }
    }

    private onAckMessage(bufferReader: BufferReader): void {
        const msgAck = MsgAck.decode(bufferReader);

        // todo: handle ack parameters
        if (this.connectResolve) {
            this.connectResolve();
            this.connectResolve = undefined;
        }
    }

    private onErrorMessage(bufferReader: BufferReader): void {
        const errorMsg = MsgError.decode(bufferReader);
        console.error("Error message received from server:", errorMsg);
    }

    constructor(private socket: ISocket) { }
}