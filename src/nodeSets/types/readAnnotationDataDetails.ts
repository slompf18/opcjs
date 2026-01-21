// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.6/#6.5.6.1
 */
export class ReadAnnotationDataDetails implements IIdentifiable {
    constructor(
        public ReqTimes: Date[]
    ) { }

    readonly id = 23497

    public static decode(reader: BufferReader): ReadAnnotationDataDetails {
        const obj = new ReadAnnotationDataDetails(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDateTime(); } return arr; })()
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
    }
}
