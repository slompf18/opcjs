// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt32 } from "../../types/baseTypes";
import { QualifiedName } from "../../types/qualifiedName";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.28
 */
export class ReadValueId implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public AttributeId: UInt32,
        public IndexRange: string | undefined,
        public DataEncoding: QualifiedName
    ) { }

    readonly id = 626
}
