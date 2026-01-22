import { UInt32, UInt8, Int16, UInt16, Int32, Int64, UInt64, Float32, Float64, ByteString } from "../../types/baseTypes";
import { Guid } from "../../types/guid";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { LocalizedText } from "../../types/localizedText";
import { StatusCode } from "../../types/statusCode";
import { ExtensionObject } from "../../types/extensionObject";
import { XmlElement } from "../../types/xmlElement";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { DataValue } from "../../types/dataValue";
import { Variant } from "../../types/variant";
import { write } from "node:fs";

export class BufferWriter {
    private buffer: Buffer;
    private position: number = 0;
    private readonly initialSize: number = 512; // Start with 512 bytes
    private readonly growthFactor: number = 2;

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

    public writeUInt16(value: UInt16): void {
        this.ensureCapacity(2);
        this.buffer.writeUInt16LE(value, this.position);
        this.position += 2;
    }

    public writeInt16(value: Int16): void {
        this.ensureCapacity(2);
        this.buffer.writeInt16LE(value, this.position);
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

    public writeUInt32At(value: UInt32, position: number): void {
        this.ensureCapacity(Math.max(0, position + 4 - this.position));
        this.buffer.writeUInt32LE(value, position);
    }

    public writeInt64(value: Int64): void {
        this.ensureCapacity(8);
        this.buffer.writeBigInt64LE(BigInt(value), this.position);
        this.position += 8;
    }

    public writeUInt64(value: UInt64): void {
        this.ensureCapacity(8);
        this.buffer.writeBigUInt64LE(BigInt(value), this.position);
        this.position += 8;
    }

    public writeFloat(value: Float32): void {
        this.ensureCapacity(4);
        this.buffer.writeFloatLE(value, this.position);
        this.position += 4;
    }

    public writeFloat32(value: Float32): void {
        this.writeFloat(value);
    }

    public writeDouble(value: Float64): void {
        this.ensureCapacity(8);
        this.buffer.writeDoubleLE(value, this.position);
        this.position += 8;
    }

    public writeFloat64(value: Float64): void {
        this.writeDouble(value);
    }

    public writeBoolean(value: boolean): void {
        this.writeUint8(value ? 1 : 0);
    }

    public writeString(value: string | undefined): void {
        let encoded = undefined
        if (value && value !== '') {
            encoded = new TextEncoder().encode(value);
        }
        this.writeByteString(encoded);
    }

    public writeBytes(value: Uint8Array): void {
        this.ensureCapacity(value.length);
        this.buffer.set(value, this.position);
        this.position += value.length;
    }

    public writeBytesAt(encryptedBody: Uint8Array, position: number): void {
        this.ensureCapacity(Math.max(0, position + encryptedBody.length - this.position));
        this.buffer.set(encryptedBody, position);
    }

    public insertBytesAt(bytes: Uint8Array, position: number): void {        
        const insertLength = bytes.length;
        this.ensureCapacity(insertLength);
        
        // Shift existing content to the right
        if (position < this.position) {
            this.buffer.copy(this.buffer, position + insertLength, position, this.position);
        }
        
        // Insert the new bytes
        this.buffer.set(bytes, position);
        
        // Update position
        this.position += insertLength;
    }

    public writeByteString(value: ByteString|undefined): void {
        if (!value) {
            this.writeInt32(-1);
            return;
        }
        this.writeInt32(value.length);
        this.writeBytes(value);
    }

    public writeGuid(value: Guid): void {
        value.encode(this);
    }

    public writeDateTime(value: Date): void {
        this.ensureCapacity(8);
        const ticks =
            BigInt(value.getTime()) * BigInt(1e4) + BigInt(116444736000000000);
        this.buffer.writeBigInt64LE(ticks, this.position);
        this.position += 8;
    }

    public writeNodeId(value: NodeId): void {
        value.encode(this);
    }

    public writeExpandedNodeId(value: ExpandedNodeId): void {
        value.encode(this);
    }

    public writeQualifiedName(value: QualifiedName): void {
        value.encode(this);
    }

    public writeLocalizedText(value: LocalizedText): void {
        value.encode(this);
    }

    public writeStatusCode(value: StatusCode): void {
        this.writeUInt32(value)
    }

    public writeExtensionObject(value: ExtensionObject): void {
        value.encode(this);
    }

    public writeXmlElement(value: XmlElement): void {
        value.encode(this);
    }

    public writeDiagnosticInfo(value: DiagnosticInfo): void {
        value.encode(this);
    }

    public writeDataValue(value: DataValue): void {
        value.encode(this);
    }

    public writeVariant(value: Variant): void {
        value.encode(this);
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

    public getLength(): number {
        return this.position;
    }

    constructor(initialSize?: number) {
        this.initialSize = initialSize || this.initialSize;
        this.buffer = Buffer.allocUnsafe(this.initialSize);
    }
}