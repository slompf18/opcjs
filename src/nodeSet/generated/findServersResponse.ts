// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { ApplicationDescription } from "./applicationDescription";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.2/#5.5.2.2
 */
export class FindServersResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Servers: ApplicationDescription[]
    ) { }

    public static decode(reader: BufferReader): FindServersResponse {
        const obj = new FindServersResponse(
            ResponseHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ApplicationDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        {
            const arr = this.Servers ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
