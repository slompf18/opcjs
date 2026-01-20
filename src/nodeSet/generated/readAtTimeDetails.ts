// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.5/#6.5.5.1
 */
export class ReadAtTimeDetails implements IEncodable {
    constructor(
        public ReqTimes: DateTime[],
        public UseSimpleBounds: boolean
    ) { }

    public static decode(reader: BufferReader): ReadAtTimeDetails {
        const obj = new ReadAtTimeDetails(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = DateTime.decode(reader); } return arr; })(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.ReqTimes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeBoolean(this.UseSimpleBounds);
    }
}
