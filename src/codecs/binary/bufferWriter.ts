import { UInt32, UInt8, Int16, UInt16, Int32, Int64, UInt64, Float32, Float64 } from "../../types/baseTypes";
import { ByteString } from "../../types/byteString";
import { Guid } from "../../types/guid";
import { DateTime } from "../../types/dateTime";
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

    public writeDouble(value: Float64): void {
        this.ensureCapacity(8);
        this.buffer.writeDoubleLE(value, this.position);
        this.position += 8;
    }

    public writeBoolean(value: boolean): void {
        this.writeUint8(value ? 1 : 0);
    }

    public writeString(value: string | undefined): void {
        let encoded = undefined
        if (value) {
            encoded = new TextEncoder().encode(value);
        }
        this.writeByteArray(encoded);
    }

    public writeBytes(value: Uint8Array): void {
        this.ensureCapacity(value.length);
        this.buffer.set(value, this.position);
        this.position += value.length;
    }

    public writeDirect(value: Uint8Array): void {
        this.ensureCapacity(value.length);
        this.buffer.set(value, this.position);
        this.position += value.length;
    }
    
    public writeDirectAt(encryptedBody: Uint8Array, position: number): void {
        this.ensureCapacity(Math.max(0, position + encryptedBody.length - this.position));
        this.buffer.set(encryptedBody, position);
    }

    public writeByteArray(value?: Uint8Array) {
        if (!value) {
            this.writeInt32(-1);
            return;
        }
        this.writeInt32(value.length);
        this.writeBytes(value);
    }

    public writeByteString(value?: ByteString): void {
        if (!value || value.value === undefined) {
            this.writeInt32(-1);
            return;
        }
        this.writeByteArray(value.value);
    }

    public writeGuid(value: Guid): void {
        value.encode(this);
    }

    public writeDateTime(value: DateTime): void {
        value.encode(this);
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
        value.encode(this);
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