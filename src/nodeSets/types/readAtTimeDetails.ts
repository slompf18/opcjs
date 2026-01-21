// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.5/#6.5.5.1
 */
export class ReadAtTimeDetails implements IIdentifiable {
    constructor(
        public ReqTimes: Date[],
        public UseSimpleBounds: boolean
    ) { }

    readonly id = 653

    public static decode(reader: BufferReader): ReadAtTimeDetails {
        const obj = new ReadAtTimeDetails(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDateTime(); } return arr; })(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.ReqTimes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeDateTime(v);
            }
        };
        writer.writeBoolean(this.UseSimpleBounds);
    }
}
