// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part3/8.55
 */
export enum PermissionTypeEnum {
    Browse = 0,
    ReadRolePermissions = 1,
    WriteAttribute = 2,
    WriteRolePermissions = 3,
    WriteHistorizing = 4,
    Read = 5,
    Write = 6,
    ReadHistory = 7,
    InsertHistory = 8,
    ModifyHistory = 9,
    DeleteHistory = 10,
    ReceiveEvents = 11,
    Call = 12,
    AddReference = 13,
    RemoveReference = 14,
    DeleteNode = 15,
    AddNode = 16,
}

export namespace PermissionTypeEnum {
    export function decode(reader: BufferReader): PermissionTypeEnum {
        return reader.readInt32() as PermissionTypeEnum;
    }

    export function encode(writer: BufferWriter, value: PermissionTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
