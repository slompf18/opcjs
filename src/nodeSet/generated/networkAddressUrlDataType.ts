// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.7/#6.2.7.5.4
 */
export class NetworkAddressUrlDataType implements IEncodable {
    constructor(
        public Url: string | undefined
    ) { }

    public static decode(reader: BufferReader): NetworkAddressUrlDataType {
        const obj = new NetworkAddressUrlDataType(
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Url);
    }
}
