import { Certificate } from "../certificates/certificate";
import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferUtils } from "../codecs/binary/bufferUtils";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IEncodable } from "../codecs/iEncodable";
import { IIdentifiable } from "../codecs/iIdentifiable";
import { SchemaCodec } from "../nodeSets/schemaCodec";
import { OpenSecureChannelRequest, RequestHeader, SecurityTokenRequestTypeEnum, MessageSecurityModeEnum, OpenSecureChannelResponse, ServiceFault } from "../nodeSets/types";
import { SecurityPolicyNone } from "../security/securityPolicyNone";
import { ITransportChannel } from "../transports/iTransportChannel";
import { UInt32 } from "../types/baseTypes";
import { ExtensionObject } from "../types/extensionObject";
import { NodeId } from "../types/nodeId";
import { ISecureChannel } from "./iSecureChannel";
import { MsgAsymmetric } from "./messages/msgAsymmetric";
import { MsgHeader } from "./messages/msgHeader";
import { MsgSecurityHeaderAsymmetric } from "./messages/msgSecurityHeaderAsymmetric";
import { MsgSecurityHeaderSymmetric } from "./messages/msgSecurityHeaderSymmetric";
import { MsgSequenceHeader } from "./messages/msgSequenceHeader";
import { MsgSymmetric } from "./messages/msgSymmetric";
import { MsgTypeAbort, MsgTypeChunk, MsgTypeCloseFinal, MsgTypeFinal, MsgTypeOpenFinal } from "./messages/msgType";

export class SecureChannel implements ISecureChannel {
    private sequenceNumber: number = 0;
    private requestNumber: number = 1;
    private securityPolicy = new SecurityPolicyNone();
    private resolvers: Map<UInt32, Function> = new Map();
    private id: UInt32 = 0;
    private token: UInt32 = 0;
    private chunkBuffers: Uint8Array[] = [];

    public async openSecureChannelRequest(): Promise<void> {
        const request = new OpenSecureChannelRequest(
            new RequestHeader(
                NodeId.NewTwoByte(0), // AuthenticationToken
                new Date(), // Timestamp
                0, // RequestHandle
                0, // ReturnDiagnostics
                '', // AuditEntryId
                0, // TimeoutHint
                new ExtensionObject(
                ) // AdditionalHeader
            ),
            /* ClientProtocolVersion */ 0,
            /* RequestType */ SecurityTokenRequestTypeEnum.Issue,
            /* SecurityMode */ MessageSecurityModeEnum.None,
            /* ClientNonce */ new Uint8Array(),
            /* RequestedLifetime */ 3600000
        );

        const requestBuffer = new BufferWriter();
        SchemaCodec.encodeBinary(requestBuffer, request);

        const msg = new MsgAsymmetric(
            new MsgHeader(
                MsgTypeOpenFinal,
                0, // will be set while encoding
                0 // will be set from response
            ),
            new MsgSecurityHeaderAsymmetric(
                'http://opcfoundation.org/UA/SecurityPolicy#None'
            ), new MsgSequenceHeader(this.sequenceNumber++, this.requestNumber++),
            requestBuffer.getData()
        )

        const encryptionAlgorithm = this.securityPolicy.getAlgorithmAsymmetric(new Uint8Array(), new Uint8Array());
        const msgBuffer = new BufferWriter();
        msg.encode(msgBuffer, encryptionAlgorithm);

        const promise = new Promise<void>((resolve, reject) => {
            this.resolvers.set(msg.sequenceHeader.requestId, (response: OpenSecureChannelResponse) => {
                console.log("OpenSecureChannelResponse received");
                this.id = response.SecurityToken?.ChannelId as UInt32;
                this.token = response.SecurityToken?.TokenId as UInt32;
                resolve();
            });

            this.channel.send(msgBuffer.getData());

        });

        return promise;
    }

    public async disconnect(): Promise<void> {
        this.channel.disconnect();
    }

    getSecurityPolicy(): string {
        return this.securityPolicy.getSecurityPolicyUri();
    }

    getSecurityMode(): MessageSecurityModeEnum {
        return this.securityPolicy.getSecurityMode();
    }

    getEndpointUrl(): string {
        return this.channel.getEndpointUrl();
    }

    async issueServiceRequest(request: IIdentifiable): Promise<IIdentifiable> {
        const requestBuffer = new BufferWriter();
        SchemaCodec.encodeBinary(requestBuffer, request);

        const msg = new MsgSymmetric(
            new MsgHeader(
                MsgTypeFinal,
                0, // will be set while encoding
                this.id
            ),
            new MsgSecurityHeaderSymmetric(
                this.token
            ),
            new MsgSequenceHeader(
                this.sequenceNumber++,
                this.requestNumber++
            ),
            requestBuffer.getData()
        )

        const encryptionAlgorithm = this.securityPolicy.getAlgorithmSymmetric(new Certificate(), new Certificate());
        const msgBuffer = new BufferWriter();
        msg.encode(msgBuffer, encryptionAlgorithm);

        // todo: use reject on timeout / error
        const promise = new Promise<IIdentifiable>((resolve, reject) => {
            // todo: set the promise in the map
            this.resolvers.set(msg.sequenceHeader.requestId, (requestResponse: IIdentifiable) => {
                resolve(requestResponse);
            });

            this.channel.send(msgBuffer.getData());
        });

        return promise;
    }

    private onMessage(data: Uint8Array) {
        const buffer = new BufferReader(data);
        const header = MsgHeader.decode(buffer);

        switch (header.msgType) {
            case MsgTypeOpenFinal:
                console.log("SecureChannel received OpenFinal message");
                const headerSecurityAsym = MsgSecurityHeaderAsymmetric.decode(buffer);
                const msgAsym = MsgAsymmetric.decode(
                    buffer,
                    header,
                    headerSecurityAsym,
                    this.securityPolicy.getAlgorithmAsymmetric(new Uint8Array(), new Uint8Array()));
                this.onReceivedMessage(msgAsym.sequenceHeader.requestId, msgAsym.body);

                break;
            case MsgTypeAbort:
                console.log("SecureChannel received Abort message");
                break;
            case MsgTypeChunk:
                console.log("SecureChannel received Chunk message");
                const headerSecuritySymChunk = MsgSecurityHeaderSymmetric.decode(buffer);
                const algoChunk = this.securityPolicy.getAlgorithmSymmetric(new Certificate(), new Certificate())
                const msgSymChunk = MsgSymmetric.decode(
                    buffer,
                    header,
                    headerSecuritySymChunk,
                    algoChunk
                    );
                this.chunkBuffers.push(msgSymChunk.body);
                break;
            case MsgTypeFinal:
                console.log("SecureChannel received Final message");
                const headerSecuritySym = MsgSecurityHeaderSymmetric.decode(buffer);
                const algo = this.securityPolicy.getAlgorithmSymmetric(new Certificate(), new Certificate())
                const msgSym = MsgSymmetric.decode(
                    buffer,
                    header,
                    headerSecuritySym,
                    algo
                    );
                // Concatenate all chunks plus final message body
                let finalBody: Uint8Array;
                if (this.chunkBuffers.length > 0) {
                    const totalLength = this.chunkBuffers.reduce((sum, chunk) => sum + chunk.length, 0) + msgSym.body.length;
                    finalBody = new Uint8Array(totalLength);
                    let offset = 0;
                    for (const chunk of this.chunkBuffers) {
                        finalBody.set(chunk, offset);
                        offset += chunk.length;
                    }
                    finalBody.set(msgSym.body, offset);
                    this.chunkBuffers = []; // Clear chunks
                } else {
                    finalBody = msgSym.body;
                }
                this.onReceivedMessage(msgSym.sequenceHeader.requestId, finalBody);
                break;
            case MsgTypeCloseFinal:
                console.log("SecureChannel received CloseFinal message");
                break;
            default:
                console.warn("SecureChannel received unknown message type:", header.msgType);
                return;
        }

        MsgTypeOpenFinal

    }

    private onReceivedMessage(requestId: number, data: Uint8Array): void {
        const responseBuffer = new BufferReader(data);
        const response = SchemaCodec.decodeBinary(responseBuffer);

        if (response instanceof ServiceFault) {
            const fault = response as ServiceFault;
            console.error("ServiceFault received:", fault);
        } else {
            const resolver = this.resolvers.get(requestId);
            if (resolver) {
                resolver(response);
            } else {
                console.warn("No resolver found for requestId:", requestId);
            }
        }

        this.resolvers.delete(requestId);
    }

    constructor(private channel: ITransportChannel) {
        channel.onMessage = this.onMessage.bind(this);
    }
}