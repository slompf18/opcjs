import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";
import { ITransportChannel } from "../iTransportChannel";

// Detect Node.js environment
const isNodeJS = typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;

export class WsChannel implements ITransportChannel {
    private ws?: WebSocket;

    async connect(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // In Node.js, allow self-signed certificates for development
            // This has no effect in browsers (browsers use their own certificate validation)
            if (isNodeJS && url.startsWith('wss://')) {
                // @ts-ignore - Node.js specific
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            }

            this.ws = new WebSocket(url);
            this.ws.binaryType = "arraybuffer";

            this.ws.onopen = () => {
                console.log("WebSocket connection opened.");
                resolve();
            };

            this.ws.onmessage = (event) => {
                console.log("Message received from server:", event.data);
                
                // Debug: show first 32 bytes in hex
                if (event.data instanceof ArrayBuffer) {
                    const view = new Uint8Array(event.data);
                    const hexBytes = Array.from(view.slice(0, 32))
                        .map(b => b.toString(16).padStart(2, '0').toUpperCase())
                        .join(' ');
                    console.log("Received data - first 32 bytes (hex):", hexBytes);
                    console.log("Total size:", event.data.byteLength, "bytes");
                }
            };

            this.ws.onclose = (e) => {
                this.onClose(e, resolve);
            };

            this.ws.onerror = (error) => {
                this.onError(error, reject);
            };
        });
    }

    disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.ws) {
                // replace onclose to capture close event
                this.ws.onclose = (e) => {
                    this.onClose(e, resolve);
                };
                // replace onerror to capture reject
                this.ws.onerror = (error) => {
                    this.onError(error, reject);
                };
                this.ws.close();
            } else {
                resolve();
            }
        });
    }

    onClose(event: CloseEvent, resolve: (value: void | PromiseLike<void>) => void): void {
        console.log("WebSocket connection closed:", event.code, event.reason);
        switch (event.code) {
            case 1000: console.log('=> Normal closure'); break;
            case 1001: console.log('=> Going away'); break;
            case 1006: console.log('=> Abnormal closure (no close frame)'); break;
            case 1008: console.log('=> Policy violation'); break;
            case 1009: console.log('=> Message too big'); break;
            default: console.log(`=> Unknown code: ${event.code}`);
        }
        resolve();
    }

    onError(error: Event, reject: (reason?: any) => void): void {
        console.error("WebSocket error:", error);
        reject(new Error('WebSocket connection failed'));
    }

    send(msg: IEncodable): void {
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

    close(): void {
        if (this.ws) {
            this.ws.close();
        }
    }

    getReciverChannel(): ReadableStream<ArrayBuffer> {
        throw new Error("Method not implemented.");
    }

    getSenderChannel(): ReadableStream<ArrayBuffer> {
        throw new Error("Method not implemented.");
    }

    getSendBufferSize(): number {
        throw new Error("Method not implemented.");
    }

    getRecvBufferSize(): number {
        throw new Error("Method not implemented.");
    }

    getCancelFunc(): () => void {
        throw new Error("Method not implemented.");
    }
}