// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.5/#5.9.5.2
 */
export class RegisterNodesResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public RegisteredNodeIds: NodeId[]
    ) { }

    getId(): number { return 561; }
}
