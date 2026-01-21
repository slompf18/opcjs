// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.12
 */
export class SessionSecurityDiagnosticsDataType implements IIdentifiable {
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

    readonly id = 868

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
            reader.readByteString()
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
        writer.writeByteString(this.ClientCertificate);
    }
}
