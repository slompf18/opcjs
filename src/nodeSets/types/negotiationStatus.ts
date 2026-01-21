// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.4
 */
export enum NegotiationStatusEnum {
    InProgress = 0,
    Complete = 1,
    Failed = 2,
    Unknown = 3,
    NoNegotiation = 4,
}

export namespace NegotiationStatusEnum {
    export function decode(reader: BufferReader): NegotiationStatusEnum {
        return reader.readInt32() as NegotiationStatusEnum;
    }

    export function encode(writer: BufferWriter, value: NegotiationStatusEnum): void {
        writer.writeInt32(value as any);
    }
}
