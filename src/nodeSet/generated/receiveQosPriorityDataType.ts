// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.1.6.2
 */
export class ReceiveQosPriorityDataType implements IEncodable {
    constructor(
        public PriorityLabel: string | undefined
    ) { }

    public static decode(reader: BufferReader): ReceiveQosPriorityDataType {
        const obj = new ReceiveQosPriorityDataType(
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.PriorityLabel);
    }
}
