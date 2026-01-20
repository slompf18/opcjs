// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.11
 */
export enum ManAddrIfSubtypeEnum {
    None = 0,
    Unknown = 1,
    PortRef = 2,
    SystemPortNumber = 3,
}

export namespace ManAddrIfSubtypeEnum {
    export function decode(reader: BufferReader): ManAddrIfSubtypeEnum {
        return reader.readInt32() as ManAddrIfSubtypeEnum;
    }

    export function encode(writer: BufferWriter, value: ManAddrIfSubtypeEnum): void {
        writer.writeInt32(value as any);
    }
}
