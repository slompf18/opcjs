// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.9.2
 */
export class PublishedDataSetCustomSourceDataType implements IEncodable {
    constructor(
        public CyclicDataSet: boolean
    ) { }

    public static decode(reader: BufferReader): PublishedDataSetCustomSourceDataType {
        const obj = new PublishedDataSetCustomSourceDataType(
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.CyclicDataSet);
    }
}
