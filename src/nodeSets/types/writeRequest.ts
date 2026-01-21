// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { WriteValue } from "./writeValue";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.4/#5.11.4.2
 */
export class WriteRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public NodesToWrite: WriteValue[]
    ) { }

    readonly id = 671

    public static decode(reader: BufferReader): WriteRequest {
        const obj = new WriteRequest(
            RequestHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = WriteValue.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        {
            const arr = this.NodesToWrite ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
