// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.7/#5.14.7.2
 */
export class TransferResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public AvailableSequenceNumbers: UInt32[]
    ) { }

    readonly id = 836
}
