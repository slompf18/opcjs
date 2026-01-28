// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ReferenceTypeNode
 */
export class ReferenceTypeNode implements IIdentifiable {
    constructor(
        public IsAbstract: boolean,
        public Symmetric: boolean,
        public InverseName: LocalizedText
    ) { }

    getId(): number { return 273; }
}
