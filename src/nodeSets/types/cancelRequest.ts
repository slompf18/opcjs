// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.5/#5.7.5.2
 */
export class CancelRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public RequestHandle: UInt32
    ) { }

    readonly id = 477

    public static decode(reader: BufferReader): CancelRequest {
        const obj = new CancelRequest(
            RequestHeader.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.RequestHandle);
    }
}
