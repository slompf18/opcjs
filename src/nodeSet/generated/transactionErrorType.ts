// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { StatusCode } from "../../types/statusCode";
import { LocalizedText } from "../../types/localizedText";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.18
 */
export class TransactionErrorType implements IEncodable {
    constructor(
        public TargetId: NodeId,
        public Error: StatusCode,
        public Message: LocalizedText
    ) { }

    public static decode(reader: BufferReader): TransactionErrorType {
        const obj = new TransactionErrorType(
            reader.readNodeId(),
            reader.readStatusCode(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.TargetId.encode(writer);
        this.Error.encode(writer);
        this.Message.encode(writer);
    }
}
