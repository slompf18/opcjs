// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.5/#7.8.5.4
 */
export class BaseConfigurationDataType implements IIdentifiable {
    constructor(
        public ConfigurationVersion: UInt32,
        public ConfigurationProperties: KeyValuePair[]
    ) { }

    readonly id = 15434
}
