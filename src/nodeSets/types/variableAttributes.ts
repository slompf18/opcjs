// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { NodeId } from "../../types/nodeId";
import { Float64, Int32, UInt32, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.3
 */
export class VariableAttributes implements IIdentifiable {
    constructor(
        public Value: Variant,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public AccessLevel: UInt8,
        public UserAccessLevel: UInt8,
        public MinimumSamplingInterval: Float64,
        public Historizing: boolean
    ) { }

    getId(): number { return 355; }
}
