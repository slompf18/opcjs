// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { SortRuleElement } from "./sortRuleElement";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.2/#6.5.2.5
 */
export class ReadEventDetailsSorted implements IIdentifiable {
    constructor(
        public SortClause: SortRuleElement[]
    ) { }

    readonly id = 18649

    public static decode(reader: BufferReader): ReadEventDetailsSorted {
        const obj = new ReadEventDetailsSorted(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SortRuleElement.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.SortClause ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
