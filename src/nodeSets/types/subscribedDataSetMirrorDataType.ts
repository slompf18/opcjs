// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RolePermissionType } from "./rolePermissionType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.3.4
 */
export class SubscribedDataSetMirrorDataType implements IIdentifiable {
    constructor(
        public ParentNodeName: string | undefined,
        public RolePermissions: RolePermissionType[]
    ) { }

    readonly id = 15635

    public static decode(reader: BufferReader): SubscribedDataSetMirrorDataType {
        const obj = new SubscribedDataSetMirrorDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = RolePermissionType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ParentNodeName);
        {
            const arr = this.RolePermissions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
