import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { Int32, UInt32, UInt8 } from "./baseTypes";
import { StatusCode } from "./statusCode";

// https://reference.opcfoundation.org/v105/Core/docs/Part6/5.2.2/#5.2.2.12
export class DiagnosticInfo {
    private static readonly MaskSymbolicId = 0x1
    private static readonly MaskNamespaceUri = 0x2
    private static readonly MaskLocalizedText = 0x4
    private static readonly MaskLocale = 0x8
    private static readonly MaskAdditionalInfo = 0x10
    private static readonly MaskInnerStatusCode = 0x20
    private static readonly MaskInnerDiagnosticInfo = 0x40

    public static Has(mask1: UInt8, mask2: UInt8): boolean {
        return (mask1 & mask2) === mask2
    }

    public static decode(buffer: BufferReader): DiagnosticInfo {
        const encodingMask = buffer.readUInt8()
        let symbolicId :UInt32|undefined
        let namespaceUri :UInt32|undefined
        let locale :UInt32|undefined
        let localizedText :UInt32|undefined
        let additionalInfo :string|undefined
        let innerStatusCode :StatusCode|undefined
        let innerDiagnosticInfo: DiagnosticInfo | undefined

        if (DiagnosticInfo.Has(encodingMask, DiagnosticInfo.MaskSymbolicId)) {
            symbolicId = buffer.readInt32()
        }

        if (DiagnosticInfo.Has(encodingMask, DiagnosticInfo.MaskNamespaceUri)) {
            namespaceUri = buffer.readInt32()
        }

        if (DiagnosticInfo.Has(encodingMask, DiagnosticInfo.MaskLocale)) {
            locale = buffer.readInt32()
        }

        if (DiagnosticInfo.Has(encodingMask, DiagnosticInfo.MaskLocalizedText)) {
            localizedText = buffer.readInt32()
        }

        if (DiagnosticInfo.Has(encodingMask, DiagnosticInfo.MaskAdditionalInfo)) {
            additionalInfo = buffer.readString() 
        }

        if (DiagnosticInfo.Has(encodingMask, DiagnosticInfo.MaskInnerStatusCode)) {
            innerStatusCode = buffer.readStatusCode()
        }

        if (DiagnosticInfo.Has(encodingMask, DiagnosticInfo.MaskInnerDiagnosticInfo)) {
            innerDiagnosticInfo = buffer.readDiagnosticInfo()
        }
        return new DiagnosticInfo(encodingMask, symbolicId, namespaceUri, locale, localizedText,
            additionalInfo, innerStatusCode, innerDiagnosticInfo);
    }

    encode(buffer: BufferWriter) {
        buffer.writeUint8(this.EncodingMask)

        if (DiagnosticInfo.Has(this.EncodingMask, DiagnosticInfo.MaskSymbolicId)) {
            buffer.writeInt32(this.SymbolicId as UInt32)
        }

        if (DiagnosticInfo.Has(this.EncodingMask, DiagnosticInfo.MaskNamespaceUri)) {
            buffer.writeInt32(this.NamespaceUri as UInt32)
        }

        if (DiagnosticInfo.Has(this.EncodingMask, DiagnosticInfo.MaskLocale)) {
            buffer.writeInt32(this.Locale as UInt32)
        }

        if (DiagnosticInfo.Has(this.EncodingMask, DiagnosticInfo.MaskLocalizedText)) {
            buffer.writeUInt32(this.LocalizedText as UInt32)
        }

        if (DiagnosticInfo.Has(this.EncodingMask, DiagnosticInfo.MaskAdditionalInfo)) {
            buffer.writeString(this.AdditionalInfo)
        }

        if (DiagnosticInfo.Has(this.EncodingMask, DiagnosticInfo.MaskInnerStatusCode)) {
            buffer.writeStatusCode(this.InnerStatusCode as StatusCode)
        }

        if (DiagnosticInfo.Has(this.EncodingMask, DiagnosticInfo.MaskInnerDiagnosticInfo)) {
            buffer.writeDiagnosticInfo(this.InnerDiagnosticInfo as DiagnosticInfo)
        }
    }

    constructor(
        public EncodingMask: UInt8,
        public SymbolicId: UInt32 |undefined,
        public NamespaceUri: UInt32 |undefined,
        public Locale: UInt32 |undefined,
        public LocalizedText: UInt32 |undefined,
        public AdditionalInfo: string |undefined,
        public InnerStatusCode: StatusCode |undefined,
        public InnerDiagnosticInfo: DiagnosticInfo | undefined
    ) {
    }
}