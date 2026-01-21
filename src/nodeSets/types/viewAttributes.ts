// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.9
 */
export class ViewAttributes implements IIdentifiable {
    constructor(
        public ContainsNoLoops: boolean,
        public EventNotifier: UInt8
    ) { }

    readonly id = 373

    public static decode(reader: BufferReader): ViewAttributes {
        const obj = new ViewAttributes(
            reader.readBoolean(),
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.ContainsNoLoops);
        writer.writeUint8(this.EventNotifier);
    }
}
