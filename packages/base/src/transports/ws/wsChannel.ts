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
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            }

            // OPC UA WebSocket connections must use the 'opcua+uacp' subprotocol for binary encoding
            this.ws = new WebSocket(endpointUrl, 'opcua+uacp');
            this.ws.binaryType = "arraybuffer";

            this.ws.onopen = () => {
                console.log("WebSocket connection opened.");
                resolve();
            };

            this.ws.onmessage = (event) => {
                console.log("WebSocket message received, size:", event.data.byteLength);
                
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
                console.error("WebSocket error observed:", error);
                reject();
                if (this.onError) {
                    this.onError('WebSocket connection failed');
                }
            };

        });
    }

    async send(data: Uint8Array): Promise<void> {
        console.log("WsChannel sending data of length:", data.length);
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // Debug: show first 32 bytes in hex
            const hexBytes = Array.from(data.slice(0, 32))
                .map(b => b.toString(16).padStart(2, '0').toUpperCase())
                .join(' ');
            // console.log("Sending data - first 32 bytes (hex):", hexBytes);
            // console.log("Total size:", data.length, "bytes");

            this.ws.send(data);
        } else {
            console.error("WebSocket is not open. Unable to send data.");
        }
    }

    public disconnect(): Promise<void> {
        console.log("WsChannel disconnecting...");
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