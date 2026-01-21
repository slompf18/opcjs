// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.30
 */
export class RelativePathElement implements IIdentifiable {
    constructor(
        public ReferenceTypeId: NodeId,
        public IsInverse: boolean,
        public IncludeSubtypes: boolean,
        public TargetName: QualifiedName
    ) { }

    readonly id = 537

    public static decode(reader: BufferReader): RelativePathElement {
        const obj = new RelativePathElement(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readBoolean(),
            reader.readQualifiedName()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ReferenceTypeId.encode(writer);
        writer.writeBoolean(this.IsInverse);
        writer.writeBoolean(this.IncludeSubtypes);
        this.TargetName.encode(writer);
    }
}
