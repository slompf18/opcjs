// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { PublishedVariableDataType } from "./publishedVariableDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.7.2
 */
export class PublishedDataItemsDataType implements IEncodable {
    constructor(
        public PublishedData: PublishedVariableDataType[]
    ) { }

    public static decode(reader: BufferReader): PublishedDataItemsDataType {
        const obj = new PublishedDataItemsDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = PublishedVariableDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.PublishedData ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
