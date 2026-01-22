// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { DataSetFieldFlagsEnum } from "./dataSetFieldFlags";
import { Int32, UInt32, UInt8 } from "../../types/baseTypes";
import { NodeId } from "../../types/nodeId";
import { Guid } from "../../types/guid";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.2.4
 */
export class FieldMetaData implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Description: LocalizedText,
        public FieldFlags: DataSetFieldFlagsEnum,
        public BuiltInType: UInt8,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public MaxStringLength: UInt32,
        public DataSetFieldId: Guid,
        public Properties: KeyValuePair[]
    ) { }

    readonly id = 14524
}
