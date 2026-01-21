// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * NamingRuleType
 */
export enum NamingRuleTypeEnum {
    Mandatory = 1,
    Optional = 2,
    Constraint = 3,
}

export namespace NamingRuleTypeEnum {
    export function decode(reader: BufferReader): NamingRuleTypeEnum {
        return reader.readInt32() as NamingRuleTypeEnum;
    }

    export function encode(writer: BufferWriter, value: NamingRuleTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
