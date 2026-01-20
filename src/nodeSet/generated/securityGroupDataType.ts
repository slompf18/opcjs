// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64, UInt32 } from "../../types/baseTypes";
import { RolePermissionType } from "./rolePermissionType";
import { KeyValuePair } from "./keyValuePair";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.12/#6.2.12.2
 */
export class SecurityGroupDataType implements IEncodable {
    constructor(
        public Name: string | undefined,
        public SecurityGroupFolder: string | undefined[],
        public KeyLifetime: Float64,
        public SecurityPolicyUri: string | undefined,
        public MaxFutureKeyCount: UInt32,
        public MaxPastKeyCount: UInt32,
        public SecurityGroupId: string | undefined,
        public RolePermissions: RolePermissionType[],
        public GroupProperties: KeyValuePair[]
    ) { }

    public static decode(reader: BufferReader): SecurityGroupDataType {
        const obj = new SecurityGroupDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readDouble(),
            reader.readString(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = RolePermissionType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        {
            const arr = this.SecurityGroupFolder ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeDouble(this.KeyLifetime);
        writer.writeString(this.SecurityPolicyUri);
        writer.writeUInt32(this.MaxFutureKeyCount);
        writer.writeUInt32(this.MaxPastKeyCount);
        writer.writeString(this.SecurityGroupId);
        {
            const arr = this.RolePermissions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.GroupProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
