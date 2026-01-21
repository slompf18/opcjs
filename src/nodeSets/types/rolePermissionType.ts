// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { PermissionTypeEnum } from "./permissionType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.9
 */
export class RolePermissionType implements IIdentifiable {
    constructor(
        public RoleId: NodeId,
        public Permissions: PermissionTypeEnum
    ) { }

    readonly id = 96

    public static decode(reader: BufferReader): RolePermissionType {
        const obj = new RolePermissionType(
            reader.readNodeId(),
            PermissionTypeEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RoleId.encode(writer);
        PermissionTypeEnum.encode(writer, this.Permissions);
    }
}
