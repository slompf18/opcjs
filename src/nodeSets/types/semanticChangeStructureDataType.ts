// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.17
 */
export class SemanticChangeStructureDataType implements IIdentifiable {
    constructor(
        public Affected: NodeId,
        public AffectedType: NodeId
    ) { }

    getId(): number { return 897; }
}
