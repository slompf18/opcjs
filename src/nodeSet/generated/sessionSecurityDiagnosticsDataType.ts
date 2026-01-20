// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.12
 */
export class SessionSecurityDiagnosticsDataType implements IEncodable {
    constructor(
        public SessionId: NodeId,
        public ClientUserIdOfSession: string | undefined,
        public ClientUserIdHistory: string | undefined[],
        public AuthenticationMechanism: string | undefined,
        public Encoding: string | undefined,
        public TransportProtocol: string | undefined,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityPolicyUri: string | undefined,
        public ClientCertificate: ByteString
    ) { }

    public static decode(reader: BufferReader): SessionSecurityDiagnosticsDataType {
        const obj = new SessionSecurityDiagnosticsDataType(
            reader.readNodeId(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            MessageSecurityModeEnum.decode(reader),
            reader.readString(),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.SessionId.encode(writer);
        writer.writeString(this.ClientUserIdOfSession);
        {
            const arr = this.ClientUserIdHistory ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeString(this.AuthenticationMechanism);
        writer.writeString(this.Encoding);
        writer.writeString(this.TransportProtocol);
        MessageSecurityModeEnum.encode(writer, this.SecurityMode);
        writer.writeString(this.SecurityPolicyUri);
        this.ClientCertificate.encode(writer);
    }
}
