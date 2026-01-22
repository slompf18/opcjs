// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/B.2.5
 */
export class QueryDataSet implements IIdentifiable {
    constructor(
        public NodeId: ExpandedNodeId,
        public TypeDefinitionNode: ExpandedNodeId,
        public Values: Variant[]
    ) { }

    readonly id = 577
}
