// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * ViewNode
 */
export class ViewNode implements IEncodable {
    constructor(
        public ContainsNoLoops: boolean,
        public EventNotifier: UInt8
    ) { }

    public static decode(reader: BufferReader): ViewNode {
        const obj = new ViewNode(
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
