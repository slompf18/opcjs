// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64, UInt16, UInt32 } from "../../types/baseTypes";
import { Guid } from "../../types/guid";
import { UadpNetworkMessageContentMaskEnum } from "./uadpNetworkMessageContentMask";
import { UadpDataSetMessageContentMaskEnum } from "./uadpDataSetMessageContentMask";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.4.10
 */
export class UadpDataSetReaderMessageDataType implements IEncodable {
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

    public static decode(reader: BufferReader): UadpDataSetReaderMessageDataType {
        const obj = new UadpDataSetReaderMessageDataType(
            reader.readUInt32(),
            reader.readUInt16(),
            reader.readUInt16(),
            Guid.decode(reader),
            UadpNetworkMessageContentMaskEnum.decode(reader),
            UadpDataSetMessageContentMaskEnum.decode(reader),
            reader.readDouble(),
            reader.readDouble(),
            reader.readDouble()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.GroupVersion);
        writer.writeUInt16(this.NetworkMessageNumber);
        writer.writeUInt16(this.DataSetOffset);
        this.DataSetClassId.encode(writer);
        UadpNetworkMessageContentMaskEnum.encode(writer, this.NetworkMessageContentMask);
        UadpDataSetMessageContentMaskEnum.encode(writer, this.DataSetMessageContentMask);
        writer.writeDouble(this.PublishingInterval);
        writer.writeDouble(this.ReceiveOffset);
        writer.writeDouble(this.ProcessingOffset);
    }
}
