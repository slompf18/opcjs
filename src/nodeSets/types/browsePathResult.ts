// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { BrowsePathTarget } from "./browsePathTarget";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.4/#5.9.4.2
 */
export class BrowsePathResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public Targets: BrowsePathTarget[]
    ) { }

    getId(): number { return 549; }
}
