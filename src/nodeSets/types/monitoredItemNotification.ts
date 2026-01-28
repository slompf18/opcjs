// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { DataValue } from "../../types/dataValue";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.2
 */
export class MonitoredItemNotification implements IIdentifiable {
    constructor(
        public ClientHandle: UInt32,
        public Value: DataValue
    ) { }

    getId(): number { return 806; }
}
