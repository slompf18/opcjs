// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.3/#5.11.3.2
 */
export class HistoryReadValueId implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public IndexRange: string | undefined,
        public DataEncoding: QualifiedName,
        public ContinuationPoint: ByteString
    ) { }

    public static decode(reader: BufferReader): HistoryReadValueId {
        const obj = new HistoryReadValueId(
            reader.readNodeId(),
            reader.readString(),
            reader.readQualifiedName(),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeString(this.IndexRange);
        this.DataEncoding.encode(writer);
        this.ContinuationPoint.encode(writer);
    }
}
