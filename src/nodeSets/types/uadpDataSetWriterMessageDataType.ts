// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UadpDataSetMessageContentMaskEnum } from "./uadpDataSetMessageContentMask";
import { UInt16 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.3.6
 */
export class UadpDataSetWriterMessageDataType implements IIdentifiable {
    constructor(
        public DataSetMessageContentMask: UadpDataSetMessageContentMaskEnum,
        public ConfiguredSize: UInt16,
        public NetworkMessageNumber: UInt16,
        public DataSetOffset: UInt16
    ) { }

    readonly id = 15652
}
