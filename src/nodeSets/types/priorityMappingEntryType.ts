// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.2/#5.3.2.1
 */
export class PriorityMappingEntryType implements IIdentifiable {
    constructor(
        public MappingUri: string | undefined,
        public PriorityLabel: string | undefined,
        public PriorityValue_PCP: UInt8,
        public PriorityValue_DSCP: UInt32
    ) { }

    readonly id = 25220

    public static decode(reader: BufferReader): PriorityMappingEntryType {
        const obj = new PriorityMappingEntryType(
            reader.readString(),
            reader.readString(),
            reader.readUInt8(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MappingUri);
        writer.writeString(this.PriorityLabel);
        writer.writeUint8(this.PriorityValue_PCP);
        writer.writeUInt32(this.PriorityValue_DSCP);
    }
}
