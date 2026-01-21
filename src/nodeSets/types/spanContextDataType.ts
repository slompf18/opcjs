// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Guid } from "../../types/guid";
import { UInt64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.5.2
 */
export class SpanContextDataType implements IIdentifiable {
    constructor(
        public TraceId: Guid,
        public SpanId: UInt64
    ) { }

    readonly id = 19746

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
