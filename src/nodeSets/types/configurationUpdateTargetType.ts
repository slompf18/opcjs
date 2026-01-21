// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ConfigurationUpdateTypeEnum } from "./configurationUpdateType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.5/#7.8.5.6
 */
export class ConfigurationUpdateTargetType implements IIdentifiable {
    constructor(
        public Path: string | undefined,
        public UpdateType: ConfigurationUpdateTypeEnum
    ) { }

    readonly id = 15538

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
