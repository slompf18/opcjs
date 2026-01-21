// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.1
 */
export enum DuplexEnum {
    Full = 0,
    Half = 1,
    Unknown = 2,
}

export namespace DuplexEnum {
    export function decode(reader: BufferReader): DuplexEnum {
        return reader.readInt32() as DuplexEnum;
    }

    export function encode(writer: BufferWriter, value: DuplexEnum): void {
        writer.writeInt32(value as any);
    }
}
