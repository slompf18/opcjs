// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.5/#5.7.5.2
 */
export class CancelRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public RequestHandle: UInt32
    ) { }

    getId(): number { return 477; }
}
