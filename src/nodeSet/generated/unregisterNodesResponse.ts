// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.6/#5.9.6.2
 */
export class UnregisterNodesResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader
    ) { }

    public static decode(reader: BufferReader): UnregisterNodesResponse {
        const obj = new UnregisterNodesResponse(
            ResponseHeader.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
    }
}
