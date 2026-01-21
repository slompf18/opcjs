// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { MonitoringModeEnum } from "./monitoringMode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.4/#5.13.4.2
 */
export class SetMonitoringModeRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public MonitoringMode: MonitoringModeEnum,
        public MonitoredItemIds: UInt32[]
    ) { }

    readonly id = 767

    public static decode(reader: BufferReader): SetMonitoringModeRequest {
        const obj = new SetMonitoringModeRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            MonitoringModeEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        MonitoringModeEnum.encode(writer, this.MonitoringMode);
        {
            const arr = this.MonitoredItemIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
    }
}
