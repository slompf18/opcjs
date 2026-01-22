// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.6/#6.9.6.1
 */
export class DeleteAtTimeDetails implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public ReqTimes: Date[]
    ) { }

    readonly id = 689
}
