// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.38
 */
export class PortableNodeId implements IIdentifiable {
    constructor(
        public NamespaceUri: string | undefined,
        public Identifier: NodeId
    ) { }

    getId(): number { return 24106; }
}
