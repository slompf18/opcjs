// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { AddReferencesItem } from "./addReferencesItem";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.3/#5.8.3.2
 */
export class AddReferencesRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReferencesToAdd: AddReferencesItem[]
    ) { }

    public static decode(reader: BufferReader): AddReferencesRequest {
        const obj = new AddReferencesRequest(
            RequestHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = AddReferencesItem.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        {
            const arr = this.ReferencesToAdd ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
