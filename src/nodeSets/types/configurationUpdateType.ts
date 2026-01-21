// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.5/#7.8.5.7
 */
export enum ConfigurationUpdateTypeEnum {
    Insert = 1,
    Replace = 2,
    InsertOrReplace = 3,
    Delete = 4,
}

export namespace ConfigurationUpdateTypeEnum {
    export function decode(reader: BufferReader): ConfigurationUpdateTypeEnum {
        return reader.readInt32() as ConfigurationUpdateTypeEnum;
    }

    export function encode(writer: BufferWriter, value: ConfigurationUpdateTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
