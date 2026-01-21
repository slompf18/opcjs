// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.3/#5.11.3.2
 */
export class HistoryReadValueId implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public IndexRange: string | undefined,
        public DataEncoding: QualifiedName,
        public ContinuationPoint: ByteString
    ) { }

    readonly id = 635

    public static decode(reader: BufferReader): HistoryReadValueId {
        const obj = new HistoryReadValueId(
            reader.readNodeId(),
            reader.readString(),
            reader.readQualifiedName(),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeString(this.IndexRange);
        this.DataEncoding.encode(writer);
        writer.writeByteString(this.ContinuationPoint);
    }
}
