// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { ServerOnNetwork } from "./serverOnNetwork";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.3/#5.5.3.2
 */
export class FindServersOnNetworkResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public LastCounterResetTime: Date,
        public Servers: ServerOnNetwork[]
    ) { }

    readonly id = 12191

    public static decode(reader: BufferReader): FindServersOnNetworkResponse {
        const obj = new FindServersOnNetworkResponse(
            ResponseHeader.decode(reader),
            reader.readDateTime(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ServerOnNetwork.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        writer.writeDateTime(this.LastCounterResetTime);
        {
            const arr = this.Servers ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
