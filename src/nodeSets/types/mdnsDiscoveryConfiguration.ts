// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.13.2
 */
export class MdnsDiscoveryConfiguration implements IIdentifiable {
    constructor(
        public MdnsServerName: string | undefined,
        public ServerCapabilities: string | undefined[]
    ) { }

    readonly id = 12891

    public static decode(reader: BufferReader): MdnsDiscoveryConfiguration {
        const obj = new MdnsDiscoveryConfiguration(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MdnsServerName);
        {
            const arr = this.ServerCapabilities ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
