// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ExtensionObject } from "../../types/extensionObject";
import { TimestampsToReturnEnum } from "./timestampsToReturn";
import { HistoryReadValueId } from "./historyReadValueId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.3/#5.11.3.2
 */
export class HistoryReadRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public HistoryReadDetails: ExtensionObject,
        public TimestampsToReturn: TimestampsToReturnEnum,
        public ReleaseContinuationPoints: boolean,
        public NodesToRead: HistoryReadValueId[]
    ) { }

    readonly id = 662
}
