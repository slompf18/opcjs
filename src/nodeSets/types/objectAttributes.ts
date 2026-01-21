// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.2
 */
export class ObjectAttributes implements IIdentifiable {
    constructor(
        public EventNotifier: UInt8
    ) { }

    readonly id = 352

    public static decode(reader: BufferReader): ObjectAttributes {
        const obj = new ObjectAttributes(
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUint8(this.EventNotifier);
    }
}
