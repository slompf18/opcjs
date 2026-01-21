// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.10
 */
export enum PortIdSubtypeEnum {
    InterfaceAlias = 1,
    PortComponent = 2,
    MacAddress = 3,
    NetworkAddress = 4,
    InterfaceName = 5,
    AgentCircuitId = 6,
    Local = 7,
}

export namespace PortIdSubtypeEnum {
    export function decode(reader: BufferReader): PortIdSubtypeEnum {
        return reader.readInt32() as PortIdSubtypeEnum;
    }

    export function encode(writer: BufferWriter, value: PortIdSubtypeEnum): void {
        writer.writeInt32(value as any);
    }
}
