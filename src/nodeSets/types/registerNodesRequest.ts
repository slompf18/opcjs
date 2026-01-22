// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.5/#5.9.5.2
 */
export class RegisterNodesRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public NodesToRegister: NodeId[]
    ) { }

    readonly id = 558
}
