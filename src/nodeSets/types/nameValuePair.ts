// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.6
 */
export class NameValuePair implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Value: Variant
    ) { }

    getId(): number { return 19748; }
}
