import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";
import { ChannelBase } from "../channelBase";
import { ISocket } from "../iSocket";

// Detect Node.js environment
const isNodeJS = typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;

// todo: how to handle reconnection?
export class WsChannel implements ISocket {
    private ws?: WebSocket;
    public onMessage?: (data: ArrayBuffer) => void;
    public onClose?: () => void;
    public onError?: (error: string) => void;

    public connect(endpointUrl: string): Promise<void> {
        return new Promise((resolve, reject) => {

            // In Node.js, allow self-signed certificates for development
            // This has no effect in browsers (browsers use their own certificate validation)
            if (isNodeJS && endpointUrl.startsWith('wss://')) {
                // @ts-ignore - Node.js specific
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            }

            this.ws = new WebSocket(endpointUrl);
            this.ws.binaryType = "arraybuffer";

            this.ws.onopen = () => {
                console.log("WebSocket connection opened.");
                resolve();
            };

            this.ws.onmessage = (event) => {
                if (this.onMessage) {
                    this.onMessage(event.data);
                }
            };

            this.ws.onclose = (e) => {
                console.log("WebSocket connection closed:", e.code, e.reason);
                switch (e.code) {
                    case 1000: console.log('=> Normal closure'); break;
                    case 1001: console.log('=> Going away'); break;
                    case 1006: console.log('=> Abnormal closure (no close frame)'); break;
                    case 1008: console.log('=> Policy violation'); break;
                    case 1009: console.log('=> Message too big'); break;
                    default: console.log(`=> Unknown code: ${e.code}`);
                }
                reject();
                if (this.onClose) {
                    this.onClose();
                }
            };

            this.ws.onerror = (error) => {
                reject();
                if (this.onError) {
                    this.onError('WebSocket connection failed');
                }
            };

        });
    }

    async send(msg: IEncodable): Promise<void> {
        const bufferWriter = new BufferWriter();
        msg.encode(bufferWriter);

        const data = bufferWriter.getData();
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // Debug: show first 32 bytes in hex
            const hexBytes = Array.from(data.slice(0, 32))
                .map(b => b.toString(16).padStart(2, '0').toUpperCase())
                .join(' ');
            console.log("Sending data - first 32 bytes (hex):", hexBytes);
            console.log("Total size:", data.length, "bytes");

            this.ws.send(data);
        } else {
            console.error("WebSocket is not open. Unable to send data.");
        }
    }

    public disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.ws) {
                // replace onclose to capture close event
                this.ws.onclose = (e) => {
                    resolve();
                };
                // replace onerror to capture reject
                this.ws.onerror = () => {
                    reject();
                };
                this.ws.close();
            } else {
                resolve();
            }
        });
    }
}