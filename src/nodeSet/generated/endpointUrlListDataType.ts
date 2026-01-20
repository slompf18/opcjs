// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.20
 */
export class EndpointUrlListDataType implements IEncodable {
    constructor(
        public EndpointUrlList: string | undefined[]
    ) { }

    public static decode(reader: BufferReader): EndpointUrlListDataType {
        const obj = new EndpointUrlListDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.EndpointUrlList ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
