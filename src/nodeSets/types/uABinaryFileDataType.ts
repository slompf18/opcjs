// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { KeyValuePair } from "./keyValuePair";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.36
 */
export class UABinaryFileDataType implements IIdentifiable {
    constructor(
        public SchemaLocation: string | undefined,
        public FileHeader: KeyValuePair[],
        public Body: Variant
    ) { }

    readonly id = 15006

    public static decode(reader: BufferReader): UABinaryFileDataType {
        const obj = new UABinaryFileDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })(),
            reader.readVariant()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.SchemaLocation);
        {
            const arr = this.FileHeader ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.Body.encode(writer);
    }
}
