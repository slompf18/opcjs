// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.6
 */
export class Annotation implements IIdentifiable {
    constructor(
        public Message: string | undefined,
        public UserName: string | undefined,
        public AnnotationTime: Date
    ) { }

    getId(): number { return 891; }
}
