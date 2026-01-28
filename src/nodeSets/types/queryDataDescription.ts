// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RelativePath } from "./relativePath";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class QueryDataDescription implements IIdentifiable {
    constructor(
        public RelativePath: RelativePath,
        public AttributeId: UInt32,
        public IndexRange: string | undefined
    ) { }

    getId(): number { return 570; }
}
