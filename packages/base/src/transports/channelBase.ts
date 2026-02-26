import { BinaryReader } from "../codecs/binary/binaryReader";
import { BinaryWriter } from "../codecs/binary/binaryWriter";
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
    private connectResolve?: (success: boolean) => void;

    public async connect(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await this.socket.connect(this.endpointUrl);
            this.socket.onMessage = (data: ArrayBuffer) => this.onMessageReceived(new Uint8Array(data));
            this.socket.onError = (error: string) => this.onError(error);
            this.socket.onClose = () => this.onClose();

            this.connectResolve = resolve;
            const msg = new MsgHello(0, this.DefaultReceiveBufferSize, this.DefaultSendBufferSize, 0, 0, this.endpointUrl);

            const bufferWriter = new BinaryWriter();
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

    getEndpointUrl(): string {
        return this.endpointUrl;
    }

    getCodecType(): string {
        // todo: determine from endpoint url
        // Here's how it works by transport:

        // opc.tcp:// (OPC UA TCP – §7.2)
        // Always binary. No negotiation—the entire channel is binary from the first byte of the Hello message onward. The Hello/ACK exchange (§7.1.2) only negotiates buffer sizes, not encoding.

        // opc.wss:// (WebSocket – §7.5, Table 79)
        // Encoding is determined by the WebSocket sub-protocol selected during the HTTP Upgrade handshake (before any OPC UA message is sent):

        // opcua+uacp → binary
        // opcua+uajson → JSON
        // opcua+openapi → JSON
        // opc.https:// (HTTPS – §7.4)
        // Determined by the HTTP Content-Type header on each POST request:

        // application/opcua+binary → binary
        // application/opcua+xml → XML

        return "binary";
    }

    private onMessageReceived(data: Uint8Array): void {
        //console.log("Message received from server:", data);
        while (data.length > 0) {
            const bufferReader = new BinaryReader(data);
            const header = MsgHeader.decode(bufferReader);

            switch (header.messageType) {
                case MsgTypeAck:
                    bufferReader.rewind();
                    this.onAckMessage(bufferReader);
                    data = data.subarray(header.messageSize);
                    break;
                case MsgTypeHello:
                    console.error("Unexpected Hello message received from server.");
                    data = data.subarray(header.messageSize);
                    break;
                case MsgTypeError:
                    bufferReader.rewind();
                    this.onErrorMessage(bufferReader);
                    data = data.subarray(header.messageSize);
                    break;
                case MsgTypeReverseHello:
                    console.error("Unexpected ReverseHello message received from server.");
                    data = data.subarray(header.messageSize);
                    break;
                default:
                    // split data into messages
                    const messageData = data.subarray(0, header.messageSize);
                    data = data.subarray(header.messageSize);
                    this.onMessage?.(messageData);
            }
        }
    }

    private onAckMessage(bufferReader: BinaryReader): void {
        const msgAck = MsgAck.decode(bufferReader);

        // todo: handle ack parameters
        if (this.connectResolve) {
            this.connectResolve(true);
            this.connectResolve = undefined;
        }
    }

    private onErrorMessage(bufferReader: BinaryReader): void {
        const errorMsg = MsgError.decode(bufferReader);
        console.error("Error message received from server:", errorMsg);
        if (this.connectResolve) {
            this.connectResolve(false);
            this.connectResolve = undefined;
        }
    }

    constructor(private endpointUrl: string, private socket: ISocket) { }
}