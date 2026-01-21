// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * BrowseResultMask
 */
export enum BrowseResultMaskEnum {
    None = 0,
    ReferenceTypeId = 1,
    IsForward = 2,
    NodeClass = 4,
    BrowseName = 8,
    DisplayName = 16,
    TypeDefinition = 32,
    All = 63,
    ReferenceTypeInfo = 3,
    TargetInfo = 60,
}

export namespace BrowseResultMaskEnum {
    export function decode(reader: BufferReader): BrowseResultMaskEnum {
        return reader.readInt32() as BrowseResultMaskEnum;
    }

    export function encode(writer: BufferWriter, value: BrowseResultMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
