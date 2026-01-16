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
                console.log("Message received:", event.data);
            };

            this.ws.onclose = (event) => {
                console.log("WebSocket connection closed:", event.code, event.reason);
                switch (event.code) {
                    case 1000: console.log('=> Normal closure'); break;
                    case 1001: console.log('=> Going away'); break;
                    case 1006: console.log('=> Abnormal closure (no close frame)'); break;
                    case 1008: console.log('=> Policy violation'); break;
                    case 1009: console.log('=> Message too big'); break;
                    default: console.log(`=> Unknown code: ${event.code}`);
                }
            };

            this.ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                reject(new Error('WebSocket connection failed'));
            };
        });
    }

    send(data: ArrayBuffer): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
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