// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { SimpleAttributeOperand } from "./simpleAttributeOperand";
import { ContentFilter } from "./contentFilter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.3
 */
export class EventFilter implements IEncodable {
    constructor(
        public SelectClauses: SimpleAttributeOperand[],
        public WhereClause: ContentFilter
    ) { }

    public static decode(reader: BufferReader): EventFilter {
        const obj = new EventFilter(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SimpleAttributeOperand.decode(reader); } return arr; })(),
            ContentFilter.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.SelectClauses ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.WhereClause.encode(writer);
    }
}
