// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.4/#5.7.4.2
 */
export class CloseSessionRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public DeleteSubscriptions: boolean
    ) { }

    readonly id = 471

    public static decode(reader: BufferReader): CloseSessionRequest {
        const obj = new CloseSessionRequest(
            RequestHeader.decode(reader),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeBoolean(this.DeleteSubscriptions);
    }
}
