// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { BrowsePath } from "./browsePath";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.4/#5.9.4.2
 */
export class TranslateBrowsePathsToNodeIdsRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public BrowsePaths: BrowsePath[]
    ) { }

    readonly id = 552
}
