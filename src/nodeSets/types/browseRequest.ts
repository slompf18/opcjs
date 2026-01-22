// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ViewDescription } from "./viewDescription";
import { UInt32 } from "../../types/baseTypes";
import { BrowseDescription } from "./browseDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.2/#5.9.2.2
 */
export class BrowseRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public View: ViewDescription,
        public RequestedMaxReferencesPerNode: UInt32,
        public NodesToBrowse: BrowseDescription[]
    ) { }

    readonly id = 525
}
