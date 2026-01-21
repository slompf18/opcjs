// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { UInt32 } from "../../types/baseTypes";
import { NotificationMessage } from "./notificationMessage";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.5/#5.14.5.2
 */
export class PublishResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public SubscriptionId: UInt32,
        public AvailableSequenceNumbers: UInt32[],
        public MoreNotifications: boolean,
        public NotificationMessage: NotificationMessage,
        public Results: StatusCode[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 827

    public static decode(reader: BufferReader): PublishResponse {
        const obj = new PublishResponse(
            ResponseHeader.decode(reader),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readBoolean(),
            NotificationMessage.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        {
            const arr = this.AvailableSequenceNumbers ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
        writer.writeBoolean(this.MoreNotifications);
        this.NotificationMessage.encode(writer);
        {
            const arr = this.Results ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.DiagnosticInfos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
