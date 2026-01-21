// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { TimestampsToReturnEnum } from "./timestampsToReturn";
import { MonitoredItemCreateRequest } from "./monitoredItemCreateRequest";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.2/#5.13.2.2
 */
export class CreateMonitoredItemsRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public TimestampsToReturn: TimestampsToReturnEnum,
        public ItemsToCreate: MonitoredItemCreateRequest[]
    ) { }

    readonly id = 749

    public static decode(reader: BufferReader): CreateMonitoredItemsRequest {
        const obj = new CreateMonitoredItemsRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            TimestampsToReturnEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = MonitoredItemCreateRequest.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        TimestampsToReturnEnum.encode(writer, this.TimestampsToReturn);
        {
            const arr = this.ItemsToCreate ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
