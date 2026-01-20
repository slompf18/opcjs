// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/6.6.1
 */
export class AnnotationDataType implements IEncodable {
    constructor(
        public Annotation: string | undefined,
        public Discipline: string | undefined,
        public Uri: string | undefined
    ) { }

    public static decode(reader: BufferReader): AnnotationDataType {
        const obj = new AnnotationDataType(
            reader.readString(),
            reader.readString(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Annotation);
        writer.writeString(this.Discipline);
        writer.writeString(this.Uri);
    }
}
