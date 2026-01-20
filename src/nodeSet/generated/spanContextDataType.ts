// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Guid } from "../../types/guid";
import { UInt64 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.5.2
 */
export class SpanContextDataType implements IEncodable {
    constructor(
        public TraceId: Guid,
        public SpanId: UInt64
    ) { }

    public static decode(reader: BufferReader): SpanContextDataType {
        const obj = new SpanContextDataType(
            Guid.decode(reader),
            reader.readUInt64()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.TraceId.encode(writer);
        writer.writeUInt64(this.SpanId);
    }
}
