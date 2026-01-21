// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.13
 */
export class ServiceCounterDataType implements IIdentifiable {
    constructor(
        public TotalCount: UInt32,
        public ErrorCount: UInt32
    ) { }

    readonly id = 871

    public static decode(reader: BufferReader): ServiceCounterDataType {
        const obj = new ServiceCounterDataType(
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.TotalCount);
        writer.writeUInt32(this.ErrorCount);
    }
}
