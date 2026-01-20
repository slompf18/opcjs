import { UInt32, UInt8 } from "../../types/baseTypes";

export class BufferReader {
    private buffer: Buffer;
    private position: number = 0;
    
    public readUInt32(): UInt32 {
        const value = this.buffer.readUInt32LE(this.position);
        this.position += 4;
        return value;
    }

    public rewind(): void {
        this.position = 0;
    }

    constructor(data: Uint8Array) {
        this.buffer = Buffer.from(data);
    }
}