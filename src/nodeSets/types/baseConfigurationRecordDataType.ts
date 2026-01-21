// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.5/#7.8.5.5
 */
export class BaseConfigurationRecordDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public RecordProperties: KeyValuePair[]
    ) { }

    readonly id = 15435

    public static decode(reader: BufferReader): BaseConfigurationRecordDataType {
        const obj = new BaseConfigurationRecordDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        {
            const arr = this.RecordProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
