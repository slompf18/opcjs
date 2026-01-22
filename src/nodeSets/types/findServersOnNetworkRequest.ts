// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.3/#5.5.3.2
 */
export class FindServersOnNetworkRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public StartingRecordId: UInt32,
        public MaxRecordsToReturn: UInt32,
        public ServerCapabilityFilter: string | undefined[]
    ) { }

    readonly id = 12190
}
