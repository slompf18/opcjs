// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { RelativePath } from "./relativePath";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4/#7.7.4.4
 */
export class AttributeOperand implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public Alias: string | undefined,
        public BrowsePath: RelativePath,
        public AttributeId: UInt32,
        public IndexRange: string | undefined
    ) { }

    readonly id = 598
}
