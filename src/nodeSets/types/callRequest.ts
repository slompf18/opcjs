// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { CallMethodRequest } from "./callMethodRequest";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.12.2/#5.12.2.2
 */
export class CallRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public MethodsToCall: CallMethodRequest[]
    ) { }

    getId(): number { return 710; }
}
