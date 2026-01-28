// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { PubSubConfigurationRefDataType } from "./pubSubConfigurationRefDataType";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/9.1.3/#9.1.3.7.4
 */
export class PubSubConfigurationValueDataType implements IIdentifiable {
    constructor(
        public ConfigurationElement: PubSubConfigurationRefDataType,
        public Name: string | undefined,
        public Identifier: Variant
    ) { }

    getId(): number { return 25520; }
}
