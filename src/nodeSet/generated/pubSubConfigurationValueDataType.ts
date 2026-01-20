// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { PubSubConfigurationRefDataType } from "./pubSubConfigurationRefDataType";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/9.1.3/#9.1.3.7.4
 */
export class PubSubConfigurationValueDataType implements IEncodable {
    constructor(
        public ConfigurationElement: PubSubConfigurationRefDataType,
        public Name: string | undefined,
        public Identifier: Variant
    ) { }

    public static decode(reader: BufferReader): PubSubConfigurationValueDataType {
        const obj = new PubSubConfigurationValueDataType(
            PubSubConfigurationRefDataType.decode(reader),
            reader.readString(),
            reader.readVariant()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ConfigurationElement.encode(writer);
        writer.writeString(this.Name);
        this.Identifier.encode(writer);
    }
}
