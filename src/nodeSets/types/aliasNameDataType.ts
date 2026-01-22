// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { QualifiedName } from "../../types/qualifiedName";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part17/7.2
 */
export class AliasNameDataType implements IIdentifiable {
    constructor(
        public AliasName: QualifiedName,
        public ReferencedNodes: ExpandedNodeId[]
    ) { }

    readonly id = 23468
}
