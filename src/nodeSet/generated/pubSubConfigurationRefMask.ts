// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/9.1.3/#9.1.3.7.2
 */
export enum PubSubConfigurationRefMaskEnum {
    ElementAdd = 0,
    ElementMatch = 1,
    ElementModify = 2,
    ElementRemove = 3,
    ReferenceWriter = 4,
    ReferenceReader = 5,
    ReferenceWriterGroup = 6,
    ReferenceReaderGroup = 7,
    ReferenceConnection = 8,
    ReferencePubDataset = 9,
    ReferenceSubDataset = 10,
    ReferenceSecurityGroup = 11,
    ReferencePushTarget = 12,
}

export namespace PubSubConfigurationRefMaskEnum {
    export function decode(reader: BufferReader): PubSubConfigurationRefMaskEnum {
        return reader.readInt32() as PubSubConfigurationRefMaskEnum;
    }

    export function encode(writer: BufferWriter, value: PubSubConfigurationRefMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
