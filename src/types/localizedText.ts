import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { UInt8 } from "./baseTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2.2.14
export class LocalizedText {
    private static readonly MaskLocale = 0x01;
    private static readonly MaskText = 0x02;

    public static Has(mask1: UInt8, mask2: UInt8): boolean {
        return (mask1 & mask2) === mask2;
    }

    public static decode(buffer: BufferReader): LocalizedText {
        const encodingMask = buffer.readUInt8();
        let locale: string | undefined;
        let text: string | undefined;

        if (LocalizedText.Has(encodingMask, LocalizedText.MaskLocale)) {
            locale = buffer.readString();
        }

        if (LocalizedText.Has(encodingMask, LocalizedText.MaskText)) {
            text = buffer.readString();
        }

        return new LocalizedText(encodingMask, locale, text);
    }

    encode(buffer: BufferWriter) {
        buffer.writeUint8(this.EncodingMask);

        if (LocalizedText.Has(this.EncodingMask, LocalizedText.MaskLocale)) {
            buffer.writeString(this.Locale as string);
        }

        if (LocalizedText.Has(this.EncodingMask, LocalizedText.MaskText)) {
            buffer.writeString(this.Text as string);
        }
    }

    constructor(
        public EncodingMask: UInt8 = 0,
        public Locale?: string,
        public Text?: string
    ) {}
}