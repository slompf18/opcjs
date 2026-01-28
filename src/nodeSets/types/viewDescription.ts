// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.44
 */
export class ViewDescription implements IIdentifiable {
    constructor(
        public ViewId: NodeId,
        public Timestamp: Date,
        public ViewVersion: UInt32
    ) { }

    getId(): number { return 511; }
}
