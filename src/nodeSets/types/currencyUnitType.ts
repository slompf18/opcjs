// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Int16 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.2
 */
export class CurrencyUnitType implements IIdentifiable {
    constructor(
        public NumericCode: Int16,
        public Exponent: number,
        public AlphabeticCode: string | undefined,
        public Currency: LocalizedText
    ) { }

    readonly id = 23498
}
