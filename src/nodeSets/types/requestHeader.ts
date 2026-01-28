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

    getId(): number { return 389; }
}
