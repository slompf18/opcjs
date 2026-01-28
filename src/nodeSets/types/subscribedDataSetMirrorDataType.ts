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

    getId(): number { return 15635; }
}
