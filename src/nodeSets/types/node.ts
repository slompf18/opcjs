// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { NodeClassEnum } from "./nodeClass";
import { QualifiedName } from "../../types/qualifiedName";
import { LocalizedText } from "../../types/localizedText";
import { UInt16, UInt32 } from "../../types/baseTypes";
import { RolePermissionType } from "./rolePermissionType";
import { ReferenceNode } from "./referenceNode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part3/4.4.1
 */
export class Node implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public NodeClass: NodeClassEnum,
        public BrowseName: QualifiedName,
        public DisplayName: LocalizedText,
        public Description: LocalizedText,
        public WriteMask: UInt32,
        public UserWriteMask: UInt32,
        public RolePermissions: RolePermissionType[],
        public UserRolePermissions: RolePermissionType[],
        public AccessRestrictions: UInt16,
        public References: ReferenceNode[]
    ) { }

    readonly id = 258
}
