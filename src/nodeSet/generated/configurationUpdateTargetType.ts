// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ConfigurationUpdateTypeEnum } from "./configurationUpdateType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.5/#7.8.5.6
 */
export class ConfigurationUpdateTargetType implements IEncodable {
    constructor(
        public Path: string | undefined,
        public UpdateType: ConfigurationUpdateTypeEnum
    ) { }

    public static decode(reader: BufferReader): ConfigurationUpdateTargetType {
        const obj = new ConfigurationUpdateTargetType(
            reader.readString(),
            ConfigurationUpdateTypeEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Path);
        ConfigurationUpdateTypeEnum.encode(writer, this.UpdateType);
    }
}
