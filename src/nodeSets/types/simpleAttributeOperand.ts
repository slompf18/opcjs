// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4/#7.7.4.5
 */
export class SimpleAttributeOperand implements IIdentifiable {
    constructor(
        public TypeDefinitionId: NodeId,
        public BrowsePath: QualifiedName[],
        public AttributeId: UInt32,
        public IndexRange: string | undefined
    ) { }

    readonly id = 601
}
