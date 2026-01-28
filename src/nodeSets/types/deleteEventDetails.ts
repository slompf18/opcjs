// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.7/#6.9.7.1
 */
export class DeleteEventDetails implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public EventIds: ByteString[]
    ) { }

    getId(): number { return 692; }
}
