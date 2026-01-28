// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { StatusCode } from "../../types/statusCode";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.18
 */
export class TransactionErrorType implements IIdentifiable {
    constructor(
        public TargetId: NodeId,
        public Error: StatusCode,
        public Message: LocalizedText
    ) { }

    getId(): number { return 32285; }
}
