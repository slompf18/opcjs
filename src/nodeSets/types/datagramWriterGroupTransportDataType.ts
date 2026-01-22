// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.3.3
 */
export class DatagramWriterGroupTransportDataType implements IIdentifiable {
    constructor(
        public MessageRepeatCount: UInt8,
        public MessageRepeatDelay: Float64
    ) { }

    readonly id = 15532
}
