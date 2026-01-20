// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Int16 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.2
 */
export class CurrencyUnitType implements IEncodable {
    constructor(
        public NumericCode: Int16,
        public Exponent: number,
        public AlphabeticCode: string | undefined,
        public Currency: LocalizedText
    ) { }

    public static decode(reader: BufferReader): CurrencyUnitType {
        const obj = new CurrencyUnitType(
            reader.readInt16(),
            reader.readInt8(),
            reader.readString(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt16(this.NumericCode);
        writer.writeInt8(this.Exponent);
        writer.writeString(this.AlphabeticCode);
        this.Currency.encode(writer);
    }
}
