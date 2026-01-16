import { UInt32, UInt8 } from "../../common/baseTypes";

export class BufferWriter {
    private buffer: Buffer;
    private position: number = 0;
    private readonly initialSize: number = 512; // Start with 512 bytes
    private readonly growthFactor: number = 2;

    constructor(initialSize?: number) {
        this.initialSize = initialSize || this.initialSize;
        this.buffer = Buffer.allocUnsafe(this.initialSize);
    }

    private ensureCapacity(additionalBytes: number): void {
        const requiredSize = this.position + additionalBytes;
        if (requiredSize > this.buffer.length) {
            // Grow buffer by doubling or to required size, whichever is larger
            const newSize = Math.max(this.buffer.length * this.growthFactor, requiredSize);
            const newBuffer = Buffer.allocUnsafe(newSize);
            this.buffer.copy(newBuffer, 0, 0, this.position);
            this.buffer = newBuffer;
            console.log(`BufferWriter: resized buffer to ${newSize} bytes`);
        }
    }

    public getData(): Uint8Array {
        // Return a view of only the written portion - no copy needed
        // WebSocket.send() accepts Uint8Array directly
        return this.buffer.subarray(0, this.position);
    }

    public writeInt8(value: number): void {
        this.ensureCapacity(1);
        this.buffer.writeInt8(value, this.position);
        this.position += 1;
    }

    public writeUint8(value: UInt8): void {
        this.ensureCapacity(1);
        this.buffer.writeUInt8(value, this.position);
        this.position += 1;
    }

    public writeInt16(value: number): void {
        this.ensureCapacity(2);
        this.buffer.writeInt16LE(value, this.position);
        this.position += 2;
    }

    public writeUInt16(value: number): void {
        this.ensureCapacity(2);
        this.buffer.writeUInt16LE(value, this.position);
        this.position += 2;
    }

    public writeInt32(value: number): void {
        this.ensureCapacity(4);
        this.buffer.writeInt32LE(value, this.position);
        this.position += 4;
    }

    public writeUInt32(value: UInt32): void {
        this.ensureCapacity(4);
        this.buffer.writeUInt32LE(value, this.position);
        this.position += 4;
    }

    public writeString(value: string): void {
        let encoded = undefined
        if (value) {
            encoded = new TextEncoder().encode(value);
        }
        this.writeByteArray(encoded);
    }

    public writeByteArray(value?: Uint8Array) {
        if (!value) {
            this.writeInt32(-1);
            return;
        }
        this.writeInt32(value.length);
        this.ensureCapacity(value.length);
        this.buffer.set(value, this.position);
        this.position += value.length;
    }
}