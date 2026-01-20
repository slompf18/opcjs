// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.7.6
 */
export class DtlsPubSubConnectionDataType implements IEncodable {
    constructor(
        public ClientCipherSuite: string | undefined,
        public ServerCipherSuites: string | undefined[],
        public ZeroRTT: boolean,
        public CertificateGroupId: NodeId,
        public VerifyClientCertificate: boolean
    ) { }

    public static decode(reader: BufferReader): DtlsPubSubConnectionDataType {
        const obj = new DtlsPubSubConnectionDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readBoolean(),
            reader.readNodeId(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ClientCipherSuite);
        {
            const arr = this.ServerCipherSuites ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeBoolean(this.ZeroRTT);
        this.CertificateGroupId.encode(writer);
        writer.writeBoolean(this.VerifyClientCertificate);
    }
}
