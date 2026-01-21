// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ObjectNode
 */
export class ObjectNode implements IIdentifiable {
    constructor(
        public EventNotifier: UInt8
    ) { }

    readonly id = 261

    public static decode(reader: BufferReader): ObjectNode {
        const obj = new ObjectNode(
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUint8(this.EventNotifier);
    }
}
