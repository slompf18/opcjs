// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * ModelChangeStructureVerbMask
 */
export enum ModelChangeStructureVerbMaskEnum {
    NodeAdded = 1,
    NodeDeleted = 2,
    ReferenceAdded = 4,
    ReferenceDeleted = 8,
    DataTypeChanged = 16,
}

export namespace ModelChangeStructureVerbMaskEnum {
    export function decode(reader: BufferReader): ModelChangeStructureVerbMaskEnum {
        return reader.readInt32() as ModelChangeStructureVerbMaskEnum;
    }

    export function encode(writer: BufferWriter, value: ModelChangeStructureVerbMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
