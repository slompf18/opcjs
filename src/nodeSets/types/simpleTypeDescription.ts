// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.35
 */
export class SimpleTypeDescription implements IIdentifiable {
    constructor(
        public BaseDataType: NodeId,
        public BuiltInType: UInt8
    ) { }

    readonly id = 15005
}
