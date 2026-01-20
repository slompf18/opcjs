// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { PublishedDataSetDataType } from "./publishedDataSetDataType";
import { PubSubConnectionDataType } from "./pubSubConnectionDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.12/#6.2.12.1
 */
export class PubSubConfigurationDataType implements IEncodable {
    constructor(
        public PublishedDataSets: PublishedDataSetDataType[],
        public Connections: PubSubConnectionDataType[],
        public Enabled: boolean
    ) { }

    public static decode(reader: BufferReader): PubSubConfigurationDataType {
        const obj = new PubSubConfigurationDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = PublishedDataSetDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = PubSubConnectionDataType.decode(reader); } return arr; })(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.PublishedDataSets ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.Connections ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeBoolean(this.Enabled);
    }
}
