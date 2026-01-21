// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.32
 */
export class RequestHeader implements IIdentifiable {
    constructor(
        public AuthenticationToken: NodeId,
        public Timestamp: Date,
        public RequestHandle: UInt32,
        public ReturnDiagnostics: UInt32,
        public AuditEntryId: string | undefined,
        public TimeoutHint: UInt32,
        public AdditionalHeader: ExtensionObject
    ) { }

    readonly id = 389

    public static decode(reader: BufferReader): RequestHeader {
        const obj = new RequestHeader(
            reader.readNodeId(),
            reader.readDateTime(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readString(),
            reader.readUInt32(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.AuthenticationToken.encode(writer);
        writer.writeDateTime(this.Timestamp);
        writer.writeUInt32(this.RequestHandle);
        writer.writeUInt32(this.ReturnDiagnostics);
        writer.writeString(this.AuditEntryId);
        writer.writeUInt32(this.TimeoutHint);
        this.AdditionalHeader.encode(writer);
    }
}
