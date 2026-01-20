// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.3
 */
export enum FilterOperatorEnum {
    Equals = 0,
    IsNull = 1,
    GreaterThan = 2,
    LessThan = 3,
    GreaterThanOrEqual = 4,
    LessThanOrEqual = 5,
    Like = 6,
    Not = 7,
    Between = 8,
    InList = 9,
    And = 10,
    Or = 11,
    Cast = 12,
    InView = 13,
    OfType = 14,
    RelatedTo = 15,
    BitwiseAnd = 16,
    BitwiseOr = 17,
}

export namespace FilterOperatorEnum {
    export function decode(reader: BufferReader): FilterOperatorEnum {
        return reader.readInt32() as FilterOperatorEnum;
    }

    export function encode(writer: BufferWriter, value: FilterOperatorEnum): void {
        writer.writeInt32(value as any);
    }
}
