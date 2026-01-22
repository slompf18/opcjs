// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { WriteValue } from "./writeValue";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.4/#5.11.4.2
 */
export class WriteRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public NodesToWrite: WriteValue[]
    ) { }

    readonly id = 671
}
