// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.5/#5.13.5.2
 */
export class SetTriggeringRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public TriggeringItemId: UInt32,
        public LinksToAdd: UInt32[],
        public LinksToRemove: UInt32[]
    ) { }

    readonly id = 773
}
