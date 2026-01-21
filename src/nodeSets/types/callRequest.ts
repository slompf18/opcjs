// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { CallMethodRequest } from "./callMethodRequest";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.12.2/#5.12.2.2
 */
export class CallRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public MethodsToCall: CallMethodRequest[]
    ) { }

    readonly id = 710

    public static decode(reader: BufferReader): CallRequest {
        const obj = new CallRequest(
            RequestHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = CallMethodRequest.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        {
            const arr = this.MethodsToCall ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
