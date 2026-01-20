// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.7/#6.2.7.5.3
 */
export class NetworkAddressDataType implements IEncodable {
    constructor(
        public NetworkInterface: string | undefined
    ) { }

    public static decode(reader: BufferReader): NetworkAddressDataType {
        const obj = new NetworkAddressDataType(
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.NetworkInterface);
    }
}
