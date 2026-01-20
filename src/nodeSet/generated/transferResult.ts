// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { UInt32 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.7/#5.14.7.2
 */
export class TransferResult implements IEncodable {
    constructor(
        public StatusCode: StatusCode,
        public AvailableSequenceNumbers: UInt32[]
    ) { }

    public static decode(reader: BufferReader): TransferResult {
        const obj = new TransferResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StatusCode.encode(writer);
        {
            const arr = this.AvailableSequenceNumbers ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
    }
}
