// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.5/#5.5.5.2
 */
export class RegisterServerResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader
    ) { }

    public static decode(reader: BufferReader): RegisterServerResponse {
        const obj = new RegisterServerResponse(
            ResponseHeader.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
    }
}
