// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { NotificationMessage } from "./notificationMessage";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.6/#5.14.6.2
 */
export class RepublishResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public NotificationMessage: NotificationMessage
    ) { }

    public static decode(reader: BufferReader): RepublishResponse {
        const obj = new RepublishResponse(
            ResponseHeader.decode(reader),
            NotificationMessage.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        this.NotificationMessage.encode(writer);
    }
}
