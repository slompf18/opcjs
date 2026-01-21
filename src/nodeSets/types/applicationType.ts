// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.4
 */
export enum ApplicationTypeEnum {
    Server = 0,
    Client = 1,
    ClientAndServer = 2,
    DiscoveryServer = 3,
}

export namespace ApplicationTypeEnum {
    export function decode(reader: BufferReader): ApplicationTypeEnum {
        return reader.readInt32() as ApplicationTypeEnum;
    }

    export function encode(writer: BufferWriter, value: ApplicationTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
