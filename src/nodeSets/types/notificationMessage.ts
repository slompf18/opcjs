// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { DateTime } from "../../types/dateTime";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.26
 */
export class NotificationMessage implements IIdentifiable {
    constructor(
        public SequenceNumber: UInt32,
        public PublishTime: DateTime,
        public NotificationData: ExtensionObject[]
    ) { }

    readonly id = 803

    public static decode(reader: BufferReader): NotificationMessage {
        const obj = new NotificationMessage(
            reader.readUInt32(),
            DateTime.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.SequenceNumber);
        this.PublishTime.encode(writer);
        {
            const arr = this.NotificationData ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
