// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/9.1.11/#9.1.11.6
 */
export enum PubSubDiagnosticsCounterClassificationEnum {
    Information = 0,
    Error = 1,
}

export namespace PubSubDiagnosticsCounterClassificationEnum {
    export function decode(reader: BufferReader): PubSubDiagnosticsCounterClassificationEnum {
        return reader.readInt32() as PubSubDiagnosticsCounterClassificationEnum;
    }

    export function encode(writer: BufferWriter, value: PubSubDiagnosticsCounterClassificationEnum): void {
        writer.writeInt32(value as any);
    }
}
