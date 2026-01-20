// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UadpDataSetMessageContentMaskEnum } from "./uadpDataSetMessageContentMask";
import { UInt16 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.3.6
 */
export class UadpDataSetWriterMessageDataType implements IEncodable {
    constructor(
        public DataSetMessageContentMask: UadpDataSetMessageContentMaskEnum,
        public ConfiguredSize: UInt16,
        public NetworkMessageNumber: UInt16,
        public DataSetOffset: UInt16
    ) { }

    public static decode(reader: BufferReader): UadpDataSetWriterMessageDataType {
        const obj = new UadpDataSetWriterMessageDataType(
            UadpDataSetMessageContentMaskEnum.decode(reader),
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readUInt16()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        UadpDataSetMessageContentMaskEnum.encode(writer, this.DataSetMessageContentMask);
        writer.writeUInt16(this.ConfiguredSize);
        writer.writeUInt16(this.NetworkMessageNumber);
        writer.writeUInt16(this.DataSetOffset);
    }
}
