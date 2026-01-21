// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { TimestampsToReturnEnum } from "./timestampsToReturn";
import { MonitoredItemModifyRequest } from "./monitoredItemModifyRequest";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.3/#5.13.3.2
 */
export class ModifyMonitoredItemsRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public TimestampsToReturn: TimestampsToReturnEnum,
        public ItemsToModify: MonitoredItemModifyRequest[]
    ) { }

    readonly id = 761

    public static decode(reader: BufferReader): ModifyMonitoredItemsRequest {
        const obj = new ModifyMonitoredItemsRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            TimestampsToReturnEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = MonitoredItemModifyRequest.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        TimestampsToReturnEnum.encode(writer, this.TimestampsToReturn);
        {
            const arr = this.ItemsToModify ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
