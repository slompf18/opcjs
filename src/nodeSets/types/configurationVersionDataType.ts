// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.2.6
 */
export class ConfigurationVersionDataType implements IIdentifiable {
    constructor(
        public MajorVersion: UInt32,
        public MinorVersion: UInt32
    ) { }

    readonly id = 14593

    public static decode(reader: BufferReader): ConfigurationVersionDataType {
        const obj = new ConfigurationVersionDataType(
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.MajorVersion);
        writer.writeUInt32(this.MinorVersion);
    }
}
