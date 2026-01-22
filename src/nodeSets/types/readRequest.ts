// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { Float64 } from "../../types/baseTypes";
import { TimestampsToReturnEnum } from "./timestampsToReturn";
import { ReadValueId } from "./readValueId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.2/#5.11.2.2
 */
export class ReadRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public MaxAge: Float64,
        public TimestampsToReturn: TimestampsToReturnEnum,
        public NodesToRead: ReadValueId[]
    ) { }

    readonly id = 629
}
