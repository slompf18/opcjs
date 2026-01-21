// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.4/#5.14.4.2
 */
export class SetPublishingModeRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public PublishingEnabled: boolean,
        public SubscriptionIds: UInt32[]
    ) { }

    readonly id = 797

    public static decode(reader: BufferReader): SetPublishingModeRequest {
        const obj = new SetPublishingModeRequest(
            RequestHeader.decode(reader),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeBoolean(this.PublishingEnabled);
        {
            const arr = this.SubscriptionIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
    }
}
