// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.3/#5.9.3.2
 */
export class BrowseNextRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReleaseContinuationPoints: boolean,
        public ContinuationPoints: ByteString[]
    ) { }

    readonly id = 531
}
