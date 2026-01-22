// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.5/#7.8.5.5
 */
export class BaseConfigurationRecordDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public RecordProperties: KeyValuePair[]
    ) { }

    readonly id = 15435
}
