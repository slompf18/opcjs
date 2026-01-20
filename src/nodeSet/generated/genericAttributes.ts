// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { GenericAttributeValue } from "./genericAttributeValue";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.10
 */
export class GenericAttributes implements IEncodable {
    constructor(
        public AttributeValues: GenericAttributeValue[]
    ) { }

    public static decode(reader: BufferReader): GenericAttributes {
        const obj = new GenericAttributes(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = GenericAttributeValue.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.AttributeValues ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
