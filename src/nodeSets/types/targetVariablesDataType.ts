// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { FieldTargetDataType } from "./fieldTargetDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.2.2
 */
export class TargetVariablesDataType implements IIdentifiable {
    constructor(
        public TargetVariables: FieldTargetDataType[]
    ) { }

    readonly id = 15631

    public static decode(reader: BufferReader): TargetVariablesDataType {
        const obj = new TargetVariablesDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = FieldTargetDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.TargetVariables ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
