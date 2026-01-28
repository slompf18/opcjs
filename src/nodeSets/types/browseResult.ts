// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { ByteString } from "../../types/baseTypes";
import { ReferenceDescription } from "./referenceDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.6
 */
export class BrowseResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public ContinuationPoint: ByteString,
        public References: ReferenceDescription[]
    ) { }

    getId(): number { return 522; }
}
