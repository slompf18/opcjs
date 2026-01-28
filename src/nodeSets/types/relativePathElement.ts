// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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

    getId(): number { return 537; }
}
