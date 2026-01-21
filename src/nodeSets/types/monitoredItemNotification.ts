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

    readonly id = 806

    public static decode(reader: BufferReader): MonitoredItemNotification {
        const obj = new MonitoredItemNotification(
            reader.readUInt32(),
            reader.readDataValue()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.ClientHandle);
        this.Value.encode(writer);
    }
}
