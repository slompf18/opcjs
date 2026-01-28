// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/6.6.1
 */
export class AnnotationDataType implements IIdentifiable {
    constructor(
        public Annotation: string | undefined,
        public Discipline: string | undefined,
        public Uri: string | undefined
    ) { }

    getId(): number { return 32434; }
}
