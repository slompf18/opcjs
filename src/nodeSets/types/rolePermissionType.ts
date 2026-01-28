// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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

    getId(): number { return 96; }
}
