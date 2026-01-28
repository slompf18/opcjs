// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { QualifiedName } from "../../types/qualifiedName";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.21
 */
export class KeyValuePair implements IIdentifiable {
    constructor(
        public Key: QualifiedName,
        public Value: Variant
    ) { }

    getId(): number { return 14533; }
}
