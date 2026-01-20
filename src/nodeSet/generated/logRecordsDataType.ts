// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LogRecord } from "./logRecord";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.9
 */
export class LogRecordsDataType implements IEncodable {
    constructor(
        public LogRecordArray: LogRecord[]
    ) { }

    public static decode(reader: BufferReader): LogRecordsDataType {
        const obj = new LogRecordsDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = LogRecord.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.LogRecordArray ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
