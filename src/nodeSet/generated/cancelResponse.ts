// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { UInt32 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.5/#5.7.5.2
 */
export class CancelResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public CancelCount: UInt32
    ) { }

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
