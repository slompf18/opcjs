// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.4
 */
export class StandaloneSubscribedDataSetRefDataType implements IEncodable {
    constructor(
        public DataSetName: string | undefined
    ) { }

    public static decode(reader: BufferReader): StandaloneSubscribedDataSetRefDataType {
        const obj = new StandaloneSubscribedDataSetRefDataType(
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.DataSetName);
    }
}
