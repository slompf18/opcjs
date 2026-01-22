// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.7
 */
export class ReferenceTypeAttributes implements IIdentifiable {
    constructor(
        public IsAbstract: boolean,
        public Symmetric: boolean,
        public InverseName: LocalizedText
    ) { }

    readonly id = 367
}
