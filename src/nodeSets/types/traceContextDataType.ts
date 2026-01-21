// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.5.3
 */
export class TraceContextDataType implements IIdentifiable {
    constructor(
        public ParentSpanId: UInt64,
        public ParentIdentifier: string | undefined
    ) { }

    readonly id = 19747

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
