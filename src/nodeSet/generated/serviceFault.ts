// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.34
 */
export class ServiceFault implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader
    ) { }

    public static decode(reader: BufferReader): ServiceFault {
        const obj = new ServiceFault(
            ResponseHeader.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
    }
}
