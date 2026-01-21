// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.5/#12.2.5.3
 */
export enum StructureTypeEnum {
    Structure = 0,
    StructureWithOptionalFields = 1,
    Union = 2,
    StructureWithSubtypedValues = 3,
    UnionWithSubtypedValues = 4,
}

export namespace StructureTypeEnum {
    export function decode(reader: BufferReader): StructureTypeEnum {
        return reader.readInt32() as StructureTypeEnum;
    }

    export function encode(writer: BufferWriter, value: StructureTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
