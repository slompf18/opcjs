// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.5/#5.13.5.2
 */
export class SetTriggeringRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public TriggeringItemId: UInt32,
        public LinksToAdd: UInt32[],
        public LinksToRemove: UInt32[]
    ) { }

    readonly id = 773

    public static decode(reader: BufferReader): SetTriggeringRequest {
        const obj = new SetTriggeringRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        writer.writeUInt32(this.TriggeringItemId);
        {
            const arr = this.LinksToAdd ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
        {
            const arr = this.LinksToRemove ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
    }
}
