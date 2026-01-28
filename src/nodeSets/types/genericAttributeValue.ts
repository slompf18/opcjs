// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.10
 */
export class GenericAttributeValue implements IIdentifiable {
    constructor(
        public AttributeId: UInt32,
        public Value: Variant
    ) { }

    getId(): number { return 17606; }
}
