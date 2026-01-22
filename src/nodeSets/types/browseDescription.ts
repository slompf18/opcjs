// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { BrowseDirectionEnum } from "./browseDirection";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.2/#5.9.2.2
 */
export class BrowseDescription implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public BrowseDirection: BrowseDirectionEnum,
        public ReferenceTypeId: NodeId,
        public IncludeSubtypes: boolean,
        public NodeClassMask: UInt32,
        public ResultMask: UInt32
    ) { }

    readonly id = 514
}
