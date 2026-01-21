import { UInt32, UInt8, Int16, UInt16, Int32, UInt64, Int64, Float32, Float64 } from "../../types/baseTypes";
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

export class BufferReader {
    private buffer: Buffer;
    private position: number = 0;

    public readInt8(): number {
        const value = this.buffer.readInt8(this.position);
        this.position += 1;
        return value;
    }

    public readUInt8(): UInt8 {
        const value = this.buffer.readUInt8(this.position) as UInt8;
        this.position += 1;
        return value;
    }

    public readInt16(): Int16 {
        const value = this.buffer.readInt16LE(this.position) as Int16;
        this.position += 2;
        return value;
    }

    public readUInt16(): UInt16 {
        const value = this.buffer.readUInt16LE(this.position) as UInt16;
        this.position += 2;
        return value;
    }

    public readInt32(): Int32 {
        const value = this.buffer.readInt32LE(this.position) as Int32;
        this.position += 4;
        return value;
    }

    public readUInt32(): UInt32 {
        const value = this.buffer.readUInt32LE(this.position);
        this.position += 4;
        return value;
    }

    public readInt64(): Int64 {
        const value = this.buffer.readBigInt64LE(this.position) as Int64;
        this.position += 8;
        return value;
    }

    public readUInt64(): UInt64 {
        const value = this.buffer.readBigUInt64LE(this.position) as UInt64;
        this.position += 8;
        return value;
    }

    public readFloat(): Float32 {
        const value = this.buffer.readFloatLE(this.position) as Float32;
        this.position += 4;
        return value;
    }

    public readDouble(): Float64 {
        const value = this.buffer.readDoubleLE(this.position) as Float64;
        this.position += 8;
        return value;
    }

    public readBoolean(): boolean {
        return this.readUInt8() !== 0;
    }

    public readString(): string {
        const bytes = this.readByteArray();
        return new TextDecoder().decode(bytes);
    }

    public readBytes(length: number): Uint8Array {
        const bytes = this.buffer.subarray(this.position, this.position + length);
        this.position += length;
        return bytes;
    }

    public readByteArray(): Uint8Array {
        const length = this.readInt32();
        if (length < 0) return new Uint8Array();
        return this.readBytes(length);
    }

    public readByteString(): ByteString {
        const length = this.readInt32();
        if (length < 0) return new ByteString();
        const bytes = this.readBytes(length);
        return new ByteString(bytes);
    }

    public readGuid(): Guid {
        // GUID is 16 bytes; consume even if we do not parse the structure
        const bytes = this.readBytes(16);
        return Guid.decodeRaw(bytes);
    }

    public readDateTime(): DateTime {
        return DateTime.decode(this);
    }

    public readNodeId(): NodeId {
        return NodeId.decode(this);
    }

    public readExpandedNodeId(): ExpandedNodeId {
        return ExpandedNodeId.decode(this);
    }

    public readQualifiedName(): QualifiedName {
        return QualifiedName.decode(this);
    }

    public readLocalizedText(): LocalizedText {
        return LocalizedText.decode(this);
    }

    public readStatusCode(): StatusCode {
        return StatusCode.decode(this);
    }

    public readExtensionObject(): ExtensionObject {
        return ExtensionObject.decode(this);
    }

    public readXmlElement(): XmlElement {
        return XmlElement.decode(this);
    }

    public readDiagnosticInfo(): DiagnosticInfo {
        return DiagnosticInfo.decode(this);
    }

    public readDataValue(): DataValue {
        return DataValue.decode(this);
    }

    public readVariant(): Variant {
        return Variant.decode(this);
    }

    public readRemainingBytes(): Uint8Array {
        const bytes = this.buffer.subarray(this.position);
        this.position = this.buffer.length;
        return bytes;
    }

    public rewind(): void {
        this.position = 0;
    }

    getPosition(): number {
        return this.position;
    }

    constructor(data: Uint8Array) {
        this.buffer = Buffer.from(data);
    }
}