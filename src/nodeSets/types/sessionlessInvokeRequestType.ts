// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * SessionlessInvokeRequestType
 */
export class SessionlessInvokeRequestType implements IIdentifiable {
    constructor(
        public UrisVersion: UInt32,
        public NamespaceUris: string | undefined[],
        public ServerUris: string | undefined[],
        public LocaleIds: string | undefined[],
        public ServiceId: UInt32
    ) { }

    readonly id = 15901

    public static decode(reader: BufferReader): SessionlessInvokeRequestType {
        const obj = new SessionlessInvokeRequestType(
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.UrisVersion);
        {
            const arr = this.NamespaceUris ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        {
            const arr = this.ServerUris ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        {
            const arr = this.LocaleIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeUInt32(this.ServiceId);
    }
}
