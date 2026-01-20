// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt64 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.5.3
 */
export class TraceContextDataType implements IEncodable {
    constructor(
        public ParentSpanId: UInt64,
        public ParentIdentifier: string | undefined
    ) { }

    public static decode(reader: BufferReader): TraceContextDataType {
        const obj = new TraceContextDataType(
            reader.readUInt64(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt64(this.ParentSpanId);
        writer.writeString(this.ParentIdentifier);
    }
}
