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

    public static decode(reader: BufferReader): Node {
        const obj = new Node(
            reader.readNodeId(),
            NodeClassEnum.decode(reader),
            reader.readQualifiedName(),
            reader.readLocalizedText(),
            reader.readLocalizedText(),
            reader.readUInt32(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = RolePermissionType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = RolePermissionType.decode(reader); } return arr; })(),
            reader.readUInt16(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ReferenceNode.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        NodeClassEnum.encode(writer, this.NodeClass);
        this.BrowseName.encode(writer);
        this.DisplayName.encode(writer);
        this.Description.encode(writer);
        writer.writeUInt32(this.WriteMask);
        writer.writeUInt32(this.UserWriteMask);
        {
            const arr = this.RolePermissions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.UserRolePermissions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeUInt16(this.AccessRestrictions);
        {
            const arr = this.References ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
