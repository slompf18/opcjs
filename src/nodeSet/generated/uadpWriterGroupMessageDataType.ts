// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64, UInt32 } from "../../types/baseTypes";
import { DataSetOrderingTypeEnum } from "./dataSetOrderingType";
import { UadpNetworkMessageContentMaskEnum } from "./uadpNetworkMessageContentMask";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.1.7
 */
export class UadpWriterGroupMessageDataType implements IEncodable {
    constructor(
        public GroupVersion: UInt32,
        public DataSetOrdering: DataSetOrderingTypeEnum,
        public NetworkMessageContentMask: UadpNetworkMessageContentMaskEnum,
        public SamplingOffset: Float64,
        public PublishingOffset: Float64[]
    ) { }

    public static decode(reader: BufferReader): UadpWriterGroupMessageDataType {
        const obj = new UadpWriterGroupMessageDataType(
            reader.readUInt32(),
            DataSetOrderingTypeEnum.decode(reader),
            UadpNetworkMessageContentMaskEnum.decode(reader),
            reader.readDouble(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDouble(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.GroupVersion);
        DataSetOrderingTypeEnum.encode(writer, this.DataSetOrdering);
        UadpNetworkMessageContentMaskEnum.encode(writer, this.NetworkMessageContentMask);
        writer.writeDouble(this.SamplingOffset);
        {
            const arr = this.PublishingOffset ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeDouble(v);
            }
        };
    }
}
