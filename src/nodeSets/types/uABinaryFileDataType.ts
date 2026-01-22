// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { KeyValuePair } from "./keyValuePair";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.36
 */
export class UABinaryFileDataType implements IIdentifiable {
    constructor(
        public SchemaLocation: string | undefined,
        public FileHeader: KeyValuePair[],
        public Body: Variant
    ) { }

    readonly id = 15006
}
