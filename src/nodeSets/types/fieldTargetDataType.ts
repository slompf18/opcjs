// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Guid } from "../../types/guid";
import { NodeId } from "../../types/nodeId";
import { UInt32 } from "../../types/baseTypes";
import { OverrideValueHandlingEnum } from "./overrideValueHandling";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.2.3
 */
export class FieldTargetDataType implements IIdentifiable {
    constructor(
        public DataSetFieldId: Guid,
        public ReceiverIndexRange: string | undefined,
        public TargetNodeId: NodeId,
        public AttributeId: UInt32,
        public WriteIndexRange: string | undefined,
        public OverrideValueHandling: OverrideValueHandlingEnum,
        public OverrideValue: Variant
    ) { }

    readonly id = 14744
}
