// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.1.4.2
 */
export class TransmitQosPriorityDataType implements IIdentifiable {
    constructor(
        public PriorityLabel: string | undefined
    ) { }

    readonly id = 23605

    public static decode(reader: BufferReader): TransmitQosPriorityDataType {
        const obj = new TransmitQosPriorityDataType(
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.PriorityLabel);
    }
}
