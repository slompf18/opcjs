// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.6/#5.9.6.2
 */
export class UnregisterNodesResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader
    ) { }

    readonly id = 567

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
