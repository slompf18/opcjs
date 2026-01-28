// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ViewDescription } from "./viewDescription";
import { NodeTypeDescription } from "./nodeTypeDescription";
import { ContentFilter } from "./contentFilter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class QueryFirstRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public View: ViewDescription,
        public NodeTypes: NodeTypeDescription[],
        public Filter: ContentFilter,
        public MaxDataSetsToReturn: UInt32,
        public MaxReferencesToReturn: UInt32
    ) { }

    getId(): number { return 613; }
}
