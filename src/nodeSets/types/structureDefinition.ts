// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { StructureTypeEnum } from "./structureType";
import { StructureField } from "./structureField";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.5
 */
export class StructureDefinition implements IIdentifiable {
    constructor(
        public DefaultEncodingId: NodeId,
        public BaseDataType: NodeId,
        public StructureType: StructureTypeEnum,
        public Fields: StructureField[]
    ) { }

    readonly id = 99
}
