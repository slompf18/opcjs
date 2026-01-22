// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { NodeId } from "../../types/nodeId";
import { Int32, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.10
 */
export class StructureField implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Description: LocalizedText,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public MaxStringLength: UInt32,
        public IsOptional: boolean
    ) { }

    readonly id = 101
}
