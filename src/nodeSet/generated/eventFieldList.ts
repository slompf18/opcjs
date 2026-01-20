// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.3
 */
export class EventFieldList implements IEncodable {
    constructor(
        public ClientHandle: UInt32,
        public EventFields: Variant[]
    ) { }

    public static decode(reader: BufferReader): EventFieldList {
        const obj = new EventFieldList(
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.ClientHandle);
        {
            const arr = this.EventFields ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
