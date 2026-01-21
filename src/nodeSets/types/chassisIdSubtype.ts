// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.9
 */
export enum ChassisIdSubtypeEnum {
    ChassisComponent = 1,
    InterfaceAlias = 2,
    PortComponent = 3,
    MacAddress = 4,
    NetworkAddress = 5,
    InterfaceName = 6,
    Local = 7,
}

export namespace ChassisIdSubtypeEnum {
    export function decode(reader: BufferReader): ChassisIdSubtypeEnum {
        return reader.readInt32() as ChassisIdSubtypeEnum;
    }

    export function encode(writer: BufferWriter, value: ChassisIdSubtypeEnum): void {
        writer.writeInt32(value as any);
    }
}
