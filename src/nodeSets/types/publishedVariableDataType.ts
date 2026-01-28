// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Float64, UInt32 } from "../../types/baseTypes";
import { Variant } from "../../types/variant";
import { QualifiedName } from "../../types/qualifiedName";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.7.1
 */
export class PublishedVariableDataType implements IIdentifiable {
    constructor(
        public PublishedVariable: NodeId,
        public AttributeId: UInt32,
        public SamplingIntervalHint: Float64,
        public DeadbandType: UInt32,
        public DeadbandValue: Float64,
        public IndexRange: string | undefined,
        public SubstituteValue: Variant,
        public MetaDataProperties: QualifiedName[]
    ) { }

    getId(): number { return 14273; }
}
