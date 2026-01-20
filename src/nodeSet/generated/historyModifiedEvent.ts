// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ModificationInfo } from "./modificationInfo";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.5
 */
export class HistoryModifiedEvent implements IEncodable {
    constructor(
        public ModificationInfos: ModificationInfo[]
    ) { }

    public static decode(reader: BufferReader): HistoryModifiedEvent {
        const obj = new HistoryModifiedEvent(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ModificationInfo.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.ModificationInfos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
