// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.5
 */
export enum BrowseDirectionEnum {
    Forward = 0,
    Inverse = 1,
    Both = 2,
    Invalid = 3,
}

export namespace BrowseDirectionEnum {
    export function decode(reader: BufferReader): BrowseDirectionEnum {
        return reader.readInt32() as BrowseDirectionEnum;
    }

    export function encode(writer: BufferWriter, value: BrowseDirectionEnum): void {
        writer.writeInt32(value as any);
    }
}
