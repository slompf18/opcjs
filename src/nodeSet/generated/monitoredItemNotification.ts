// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { DataValue } from "../../types/dataValue";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.2
 */
export class MonitoredItemNotification implements IEncodable {
    constructor(
        public ClientHandle: UInt32,
        public Value: DataValue
    ) { }

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
