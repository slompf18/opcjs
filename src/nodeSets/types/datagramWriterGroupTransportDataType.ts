// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.3.3
 */
export class DatagramWriterGroupTransportDataType implements IIdentifiable {
    constructor(
        public MessageRepeatCount: UInt8,
        public MessageRepeatDelay: Float64
    ) { }

    readonly id = 15532

    public static decode(reader: BufferReader): DatagramWriterGroupTransportDataType {
        const obj = new DatagramWriterGroupTransportDataType(
            reader.readUInt8(),
            reader.readDouble()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUint8(this.MessageRepeatCount);
        writer.writeDouble(this.MessageRepeatDelay);
    }
}
