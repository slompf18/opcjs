// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.5/#5.7.5.2
 */
export class CancelResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public CancelCount: UInt32
    ) { }

    readonly id = 480

    public static decode(reader: BufferReader): CancelResponse {
        const obj = new CancelResponse(
            ResponseHeader.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        writer.writeUInt32(this.CancelCount);
    }
}
