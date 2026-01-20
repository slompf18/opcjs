// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * ObjectNode
 */
export class ObjectNode implements IEncodable {
    constructor(
        public EventNotifier: UInt8
    ) { }

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
