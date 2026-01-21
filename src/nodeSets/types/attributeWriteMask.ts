// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part3/8.60
 */
export enum AttributeWriteMaskEnum {
    AccessLevel = 0,
    ArrayDimensions = 1,
    BrowseName = 2,
    ContainsNoLoops = 3,
    DataType = 4,
    Description = 5,
    DisplayName = 6,
    EventNotifier = 7,
    Executable = 8,
    Historizing = 9,
    InverseName = 10,
    IsAbstract = 11,
    MinimumSamplingInterval = 12,
    NodeClass = 13,
    NodeId = 14,
    Symmetric = 15,
    UserAccessLevel = 16,
    UserExecutable = 17,
    UserWriteMask = 18,
    ValueRank = 19,
    WriteMask = 20,
    ValueForVariableType = 21,
    DataTypeDefinition = 22,
    RolePermissions = 23,
    AccessRestrictions = 24,
    AccessLevelEx = 25,
}

export namespace AttributeWriteMaskEnum {
    export function decode(reader: BufferReader): AttributeWriteMaskEnum {
        return reader.readInt32() as AttributeWriteMaskEnum;
    }

    export function encode(writer: BufferWriter, value: AttributeWriteMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
