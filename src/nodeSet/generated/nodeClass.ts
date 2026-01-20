// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.5/#12.2.5.2
 */
export enum NodeClassEnum {
    Unspecified = 0,
    Object = 1,
    Variable = 2,
    Method = 4,
    ObjectType = 8,
    VariableType = 16,
    ReferenceType = 32,
    DataType = 64,
    View = 128,
}

export namespace NodeClassEnum {
    export function decode(reader: BufferReader): NodeClassEnum {
        return reader.readInt32() as NodeClassEnum;
    }

    export function encode(writer: BufferWriter, value: NodeClassEnum): void {
        writer.writeInt32(value as any);
    }
}
