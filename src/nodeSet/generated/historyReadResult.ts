// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { ByteString } from "../../types/byteString";
import { ExtensionObject } from "../../types/extensionObject";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.3/#5.11.3.2
 */
export class HistoryReadResult implements IEncodable {
    constructor(
        public StatusCode: StatusCode,
        public ContinuationPoint: ByteString,
        public HistoryData: ExtensionObject
    ) { }

    public static decode(reader: BufferReader): HistoryReadResult {
        const obj = new HistoryReadResult(
            reader.readStatusCode(),
            ByteString.decode(reader),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StatusCode.encode(writer);
        this.ContinuationPoint.encode(writer);
        this.HistoryData.encode(writer);
    }
}
