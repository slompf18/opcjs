// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.3/#5.5.3.2
 */
export class FindServersOnNetworkRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public StartingRecordId: UInt32,
        public MaxRecordsToReturn: UInt32,
        public ServerCapabilityFilter: string | undefined[]
    ) { }

    readonly id = 12190

    public static decode(reader: BufferReader): FindServersOnNetworkRequest {
        const obj = new FindServersOnNetworkRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.StartingRecordId);
        writer.writeUInt32(this.MaxRecordsToReturn);
        {
            const arr = this.ServerCapabilityFilter ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
