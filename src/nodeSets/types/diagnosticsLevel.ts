// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/9.1.11/#9.1.11.4
 */
export enum DiagnosticsLevelEnum {
    Basic = 0,
    Advanced = 1,
    Info = 2,
    Log = 3,
    Debug = 4,
}

export namespace DiagnosticsLevelEnum {
    export function decode(reader: BufferReader): DiagnosticsLevelEnum {
        return reader.readInt32() as DiagnosticsLevelEnum;
    }

    export function encode(writer: BufferWriter, value: DiagnosticsLevelEnum): void {
        writer.writeInt32(value as any);
    }
}
