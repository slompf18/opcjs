// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
}
