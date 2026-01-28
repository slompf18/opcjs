// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt32 } from "../../types/baseTypes";
import { RolePermissionType } from "./rolePermissionType";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.12/#6.2.12.2
 */
export class SecurityGroupDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public SecurityGroupFolder: string[],
        public KeyLifetime: Float64,
        public SecurityPolicyUri: string | undefined,
        public MaxFutureKeyCount: UInt32,
        public MaxPastKeyCount: UInt32,
        public SecurityGroupId: string | undefined,
        public RolePermissions: RolePermissionType[],
        public GroupProperties: KeyValuePair[]
    ) { }

    getId(): number { return 23601; }
}
