// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { RelativePath } from "./relativePath";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part3/6.2.5
 */
export class BrowsePath implements IIdentifiable {
    constructor(
        public StartingNode: NodeId,
        public RelativePath: RelativePath
    ) { }

    getId(): number { return 543; }
}
