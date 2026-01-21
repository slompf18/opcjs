// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.2/#7.8.2.8
 */
export class TrustListDataType implements IIdentifiable {
    constructor(
        public SpecifiedLists: UInt32,
        public TrustedCertificates: ByteString[],
        public TrustedCrls: ByteString[],
        public IssuerCertificates: ByteString[],
        public IssuerCrls: ByteString[]
    ) { }

    readonly id = 12554

    public static decode(reader: BufferReader): TrustListDataType {
        const obj = new TrustListDataType(
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.SpecifiedLists);
        {
            const arr = this.TrustedCertificates ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeByteString(v);
            }
        };
        {
            const arr = this.TrustedCrls ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeByteString(v);
            }
        };
        {
            const arr = this.IssuerCertificates ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeByteString(v);
            }
        };
        {
            const arr = this.IssuerCrls ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeByteString(v);
            }
        };
    }
}
