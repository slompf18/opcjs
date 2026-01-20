// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.2/#6.4.2.2.3
 */
export class BrokerConnectionTransportDataType implements IEncodable {
    constructor(
        public ResourceUri: string | undefined,
        public AuthenticationProfileUri: string | undefined
    ) { }

    public static decode(reader: BufferReader): BrokerConnectionTransportDataType {
        const obj = new BrokerConnectionTransportDataType(
            reader.readString(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ResourceUri);
        writer.writeString(this.AuthenticationProfileUri);
    }
}
