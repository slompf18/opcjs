// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.24
 */
export class SecuritySettingsDataType implements IIdentifiable {
    constructor(
        public SecurityModes: MessageSecurityModeEnum[],
        public SecurityPolicyUris: string | undefined[],
        public CertificateGroupName: string | undefined
    ) { }

    readonly id = 15559

    public static decode(reader: BufferReader): SecuritySettingsDataType {
        const obj = new SecuritySettingsDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = MessageSecurityModeEnum.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.SecurityModes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                MessageSecurityModeEnum.encode(writer, v);
            }
        };
        {
            const arr = this.SecurityPolicyUris ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeString(this.CertificateGroupName);
    }
}
