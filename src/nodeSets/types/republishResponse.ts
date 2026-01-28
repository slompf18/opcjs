// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { NotificationMessage } from "./notificationMessage";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.6/#5.14.6.2
 */
export class RepublishResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public NotificationMessage: NotificationMessage
    ) { }

    getId(): number { return 833; }
}
