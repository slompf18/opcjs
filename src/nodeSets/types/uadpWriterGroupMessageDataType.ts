// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt32 } from "../../types/baseTypes";
import { DataSetOrderingTypeEnum } from "./dataSetOrderingType";
import { UadpNetworkMessageContentMaskEnum } from "./uadpNetworkMessageContentMask";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.1.7
 */
export class UadpWriterGroupMessageDataType implements IIdentifiable {
    constructor(
        public GroupVersion: UInt32,
        public DataSetOrdering: DataSetOrderingTypeEnum,
        public NetworkMessageContentMask: UadpNetworkMessageContentMaskEnum,
        public SamplingOffset: Float64,
        public PublishingOffset: Float64[]
    ) { }

    readonly id = 15645
}
