// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.7.6
 */
export class DtlsPubSubConnectionDataType implements IIdentifiable {
    constructor(
        public ClientCipherSuite: string | undefined,
        public ServerCipherSuites: string | undefined[],
        public ZeroRTT: boolean,
        public CertificateGroupId: NodeId,
        public VerifyClientCertificate: boolean
    ) { }

    readonly id = 18794
}
