// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { ApplicationDescription } from "./applicationDescription";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.21
 */
export class ApplicationIdentityDataType implements IEncodable {
    constructor(
        public ApplicationUri: string | undefined,
        public ApplicationNames: LocalizedText[],
        public AdditionalServers: ApplicationDescription[]
    ) { }

    public static decode(reader: BufferReader): ApplicationIdentityDataType {
        const obj = new ApplicationIdentityDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readLocalizedText(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ApplicationDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ApplicationUri);
        {
            const arr = this.ApplicationNames ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.AdditionalServers ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
