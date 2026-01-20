// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { DateTime } from "../../types/dateTime";
import { UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.32
 */
export class RequestHeader implements IEncodable {
    constructor(
        public AuthenticationToken: NodeId,
        public Timestamp: DateTime,
        public RequestHandle: UInt32,
        public ReturnDiagnostics: UInt32,
        public AuditEntryId: string | undefined,
        public TimeoutHint: UInt32,
        public AdditionalHeader: ExtensionObject
    ) { }

    public static decode(reader: BufferReader): RequestHeader {
        const obj = new RequestHeader(
            reader.readNodeId(),
            DateTime.decode(reader),
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
        this.Timestamp.encode(writer);
        writer.writeUInt32(this.RequestHandle);
        writer.writeUInt32(this.ReturnDiagnostics);
        writer.writeString(this.AuditEntryId);
        writer.writeUInt32(this.TimeoutHint);
        this.AdditionalHeader.encode(writer);
    }
}
