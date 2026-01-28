// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { Float64, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.3/#5.14.3.2
 */
export class ModifySubscriptionResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public RevisedPublishingInterval: Float64,
        public RevisedLifetimeCount: UInt32,
        public RevisedMaxKeepAliveCount: UInt32
    ) { }

    getId(): number { return 794; }
}
