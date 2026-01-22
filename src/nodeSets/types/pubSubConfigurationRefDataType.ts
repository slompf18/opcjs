// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { PubSubConfigurationRefMaskEnum } from "./pubSubConfigurationRefMask";
import { UInt16 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/9.1.3/#9.1.3.7.3
 */
export class PubSubConfigurationRefDataType implements IIdentifiable {
    constructor(
        public ConfigurationMask: PubSubConfigurationRefMaskEnum,
        public ElementIndex: UInt16,
        public ConnectionIndex: UInt16,
        public GroupIndex: UInt16
    ) { }

    readonly id = 25519
}
