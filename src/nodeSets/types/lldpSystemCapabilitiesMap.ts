// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.3/#5.3.3.1
 */
export enum LldpSystemCapabilitiesMapEnum {
    Other = 0,
    Repeater = 1,
    Bridge = 2,
    WlanAccessPoint = 3,
    Router = 4,
    Telephone = 5,
    DocsisCableDevice = 6,
    StationOnly = 7,
    CvlanComponent = 8,
    SvlanComponent = 9,
    TwoPortMacRelay = 10,
}

export namespace LldpSystemCapabilitiesMapEnum {
    export function decode(reader: BufferReader): LldpSystemCapabilitiesMapEnum {
        return reader.readInt32() as LldpSystemCapabilitiesMapEnum;
    }

    export function encode(writer: BufferWriter, value: LldpSystemCapabilitiesMapEnum): void {
        writer.writeInt32(value as any);
    }
}
