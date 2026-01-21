// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.3/#5.5.3.2
 */
export class ServerOnNetwork implements IIdentifiable {
    constructor(
        public RecordId: UInt32,
        public ServerName: string | undefined,
        public DiscoveryUrl: string | undefined,
        public ServerCapabilities: string | undefined[]
    ) { }

    readonly id = 12189

    public static decode(reader: BufferReader): ServerOnNetwork {
        const obj = new ServerOnNetwork(
            reader.readUInt32(),
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.RecordId);
        writer.writeString(this.ServerName);
        writer.writeString(this.DiscoveryUrl);
        {
            const arr = this.ServerCapabilities ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
