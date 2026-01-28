// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.3/#5.11.3.2
 */
export class HistoryReadValueId implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public IndexRange: string | undefined,
        public DataEncoding: QualifiedName,
        public ContinuationPoint: ByteString
    ) { }

    getId(): number { return 635; }
}
