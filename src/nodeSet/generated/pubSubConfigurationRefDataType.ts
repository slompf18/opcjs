// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { PubSubConfigurationRefMaskEnum } from "./pubSubConfigurationRefMask";
import { UInt16 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/9.1.3/#9.1.3.7.3
 */
export class PubSubConfigurationRefDataType implements IEncodable {
    constructor(
        public ConfigurationMask: PubSubConfigurationRefMaskEnum,
        public ElementIndex: UInt16,
        public ConnectionIndex: UInt16,
        public GroupIndex: UInt16
    ) { }

    public static decode(reader: BufferReader): PubSubConfigurationRefDataType {
        const obj = new PubSubConfigurationRefDataType(
            PubSubConfigurationRefMaskEnum.decode(reader),
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readUInt16()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        PubSubConfigurationRefMaskEnum.encode(writer, this.ConfigurationMask);
        writer.writeUInt16(this.ElementIndex);
        writer.writeUInt16(this.ConnectionIndex);
        writer.writeUInt16(this.GroupIndex);
    }
}
