// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.4/#5.10.4.2
 */
export class QueryNextRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReleaseContinuationPoint: boolean,
        public ContinuationPoint: ByteString
    ) { }

    readonly id = 619
}
