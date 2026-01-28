// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.4/#5.7.4.2
 */
export class CloseSessionRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public DeleteSubscriptions: boolean
    ) { }

    getId(): number { return 471; }
}
