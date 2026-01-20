// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { FilterOperatorEnum } from "./filterOperator";
import { ExtensionObject } from "../../types/extensionObject";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.1
 */
export class ContentFilterElement implements IEncodable {
    constructor(
        public FilterOperator: FilterOperatorEnum,
        public FilterOperands: ExtensionObject[]
    ) { }

    public static decode(reader: BufferReader): ContentFilterElement {
        const obj = new ContentFilterElement(
            FilterOperatorEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        FilterOperatorEnum.encode(writer, this.FilterOperator);
        {
            const arr = this.FilterOperands ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
