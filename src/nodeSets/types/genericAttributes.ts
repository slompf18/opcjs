// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { GenericAttributeValue } from "./genericAttributeValue";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.10
 */
export class GenericAttributes implements IIdentifiable {
    constructor(
        public AttributeValues: GenericAttributeValue[]
    ) { }

    readonly id = 17607
}
