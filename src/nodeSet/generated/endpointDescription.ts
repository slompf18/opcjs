// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ApplicationDescription } from "./applicationDescription";
import { ByteString } from "../../types/byteString";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { UserTokenPolicy } from "./userTokenPolicy";
import { UInt8 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.14
 */
export class EndpointDescription implements IEncodable {
    constructor(
        public EndpointUrl: string | undefined,
        public Server: ApplicationDescription,
        public ServerCertificate: ByteString,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityPolicyUri: string | undefined,
        public UserIdentityTokens: UserTokenPolicy[],
        public TransportProfileUri: string | undefined,
        public SecurityLevel: UInt8
    ) { }

    public static decode(reader: BufferReader): EndpointDescription {
        const obj = new EndpointDescription(
            reader.readString(),
            ApplicationDescription.decode(reader),
            ByteString.decode(reader),
            MessageSecurityModeEnum.decode(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = UserTokenPolicy.decode(reader); } return arr; })(),
            reader.readString(),
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.EndpointUrl);
        this.Server.encode(writer);
        this.ServerCertificate.encode(writer);
        MessageSecurityModeEnum.encode(writer, this.SecurityMode);
        writer.writeString(this.SecurityPolicyUri);
        {
            const arr = this.UserIdentityTokens ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeString(this.TransportProfileUri);
        writer.writeUint8(this.SecurityLevel);
    }
}
