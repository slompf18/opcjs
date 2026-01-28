// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt16, UInt32 } from "../../types/baseTypes";
import { Guid } from "../../types/guid";
import { UadpNetworkMessageContentMaskEnum } from "./uadpNetworkMessageContentMask";
import { UadpDataSetMessageContentMaskEnum } from "./uadpDataSetMessageContentMask";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.4.10
 */
export class UadpDataSetReaderMessageDataType implements IIdentifiable {
    constructor(
        public GroupVersion: UInt32,
        public NetworkMessageNumber: UInt16,
        public DataSetOffset: UInt16,
        public DataSetClassId: Guid,
        public NetworkMessageContentMask: UadpNetworkMessageContentMaskEnum,
        public DataSetMessageContentMask: UadpDataSetMessageContentMaskEnum,
        public PublishingInterval: Float64,
        public ReceiveOffset: Float64,
        public ProcessingOffset: Float64
    ) { }

    getId(): number { return 15653; }
}
