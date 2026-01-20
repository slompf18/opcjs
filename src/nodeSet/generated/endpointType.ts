// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/4.4.2
 */
export class EndpointType implements IEncodable {
    constructor(
        public EndpointUrl: string | undefined,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityPolicyUri: string | undefined,
        public TransportProfileUri: string | undefined
    ) { }

    public static decode(reader: BufferReader): EndpointType {
        const obj = new EndpointType(
            reader.readString(),
            MessageSecurityModeEnum.decode(reader),
            reader.readString(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.EndpointUrl);
        MessageSecurityModeEnum.encode(writer, this.SecurityMode);
        writer.writeString(this.SecurityPolicyUri);
        writer.writeString(this.TransportProfileUri);
    }
}
