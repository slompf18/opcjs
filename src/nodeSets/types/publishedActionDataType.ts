// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { ActionTargetDataType } from "./actionTargetDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.10.4
 */
export class PublishedActionDataType implements IIdentifiable {
    constructor(
        public RequestDataSetMetaData: DataSetMetaDataType,
        public ActionTargets: ActionTargetDataType[]
    ) { }

    readonly id = 18594

    public static decode(reader: BufferReader): PublishedActionDataType {
        const obj = new PublishedActionDataType(
            DataSetMetaDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ActionTargetDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestDataSetMetaData.encode(writer);
        {
            const arr = this.ActionTargets ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
