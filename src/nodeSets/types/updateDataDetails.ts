// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { PerformUpdateTypeEnum } from "./performUpdateType";
import { DataValue } from "../../types/dataValue";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.2/#6.9.2.1
 */
export class UpdateDataDetails implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public PerformInsertReplace: PerformUpdateTypeEnum,
        public UpdateValues: DataValue[]
    ) { }

    getId(): number { return 680; }
}
