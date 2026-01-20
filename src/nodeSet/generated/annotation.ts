// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.6
 */
export class Annotation implements IEncodable {
    constructor(
        public Message: string | undefined,
        public UserName: string | undefined,
        public AnnotationTime: DateTime
    ) { }

    public static decode(reader: BufferReader): Annotation {
        const obj = new Annotation(
            reader.readString(),
            reader.readString(),
            DateTime.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Message);
        writer.writeString(this.UserName);
        this.AnnotationTime.encode(writer);
    }
}
