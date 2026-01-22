// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { QueryDataDescription } from "./queryDataDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class NodeTypeDescription implements IIdentifiable {
    constructor(
        public TypeDefinitionNode: ExpandedNodeId,
        public IncludeSubTypes: boolean,
        public DataToReturn: QueryDataDescription[]
    ) { }

    readonly id = 573
}
