// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.4/#5.9.4.2
 */
export class BrowsePathTarget implements IIdentifiable {
    constructor(
        public TargetId: ExpandedNodeId,
        public RemainingPathIndex: UInt32
    ) { }

    getId(): number { return 546; }
}
