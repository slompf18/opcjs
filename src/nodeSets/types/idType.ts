// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.5/#12.2.5.1
 */
export enum IdTypeEnum {
    Numeric = 0,
    String = 1,
    Guid = 2,
    Opaque = 3,
}

export namespace IdTypeEnum {
    export function decode(reader: BufferReader): IdTypeEnum {
        return reader.readInt32() as IdTypeEnum;
    }

    export function encode(writer: BufferWriter, value: IdTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
