import { Certificate } from "../certificates/certificate";
import { BinaryReader } from "../codecs/binary/binaryReader";
import { BinaryWriter } from "../codecs/binary/binaryWriter";
import { Configuration } from "../configuration/configuration";
import { MessageSecurityModeEnum, SecurityTokenRequestTypeEnum } from "../schema/enums";
import { OpenSecureChannelRequest, RequestHeader, OpenSecureChannelResponse, ServiceFault } from "../schema/types";
import { SecurityPolicyNone } from "../security/securityPolicyNone";
import { ITransportChannel } from "../transports/iTransportChannel";
import { ExtensionObject } from "../types/extensionObject";
import { IOpcType } from "../types/iOpcType";
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
    private resolvers: Map<number, Function> = new Map();
    private id: number = 0;
    private token: number = 0;
    private chunkBuffers: unknown[] = [];

    public async openSecureChannelRequest(): Promise<void> {
        const requestHeader = new RequestHeader();
        requestHeader.authenticationToken = NodeId.newTwoByte(0);
        requestHeader.timestamp = new Date();
        requestHeader.requestHandle = 0;
        requestHeader.returnDiagnostics = 0;
        requestHeader.auditEntryId = '';
        requestHeader.timeoutHint = 0;
        requestHeader.additionalHeader = ExtensionObject.newEmpty();

        const request = new OpenSecureChannelRequest();
        request.requestHeader = requestHeader;
        request.clientProtocolVersion = 0;
        request.requestType = SecurityTokenRequestTypeEnum.Issue;
        request.securityMode = this.securityPolicy.getSecurityMode();
        request.clientNonce = null;
        request.requestedLifetime = 3600000;

        const data = this.configuration.encoder.encode(request, this.channel.getCodecType());

        const msg = new MsgAsymmetric(
            new MsgHeader(
                MsgTypeOpenFinal,
                0, // will be set while encoding
                0 // will be set from response
            ),
            new MsgSecurityHeaderAsymmetric(
                'http://opcfoundation.org/UA/SecurityPolicy#None'
            ), new MsgSequenceHeader(this.sequenceNumber++, this.requestNumber++),
            data
        )

        const encryptionAlgorithm = this.securityPolicy.getAlgorithmAsymmetric(new Uint8Array(), new Uint8Array());
        const msgEncoder = new BinaryWriter();
        msg.encode(msgEncoder, encryptionAlgorithm);

        const promise = new Promise<void>((resolve, reject) => {
            this.resolvers.set(msg.sequenceHeader.requestId, (response: OpenSecureChannelResponse) => {
                console.log("OpenSecureChannelResponse received");
                this.id = response.securityToken?.channelId as number;
                this.token = response.securityToken?.tokenId as number;
                resolve();
            });

            this.channel.send(msgEncoder.getData());

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

    async issueServiceRequest(request: IOpcType): Promise<IOpcType> {
        const data = this.configuration.encoder.encode(request, this.channel.getCodecType());

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
            data
        )

        const encryptionAlgorithm = this.securityPolicy.getAlgorithmSymmetric(new Certificate(), new Certificate());
        const msgEncoder = new BinaryWriter();
        msg.encode(msgEncoder, encryptionAlgorithm);

        // todo: use reject on timeout / error
        const promise = new Promise<IOpcType>((resolve, reject) => {
            // todo: set the promise in the map
            this.resolvers.set(msg.sequenceHeader.requestId, (requestResponse: IOpcType) => {
                resolve(requestResponse);
            });

            this.channel.send(msgEncoder.getData());
        });

        return promise;
    }

    private onMessage(data: Uint8Array) {
        const buffer = new BinaryReader(data);
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
                let finalBody: unknown;
                if (this.chunkBuffers.length > 0 && this.channel.getCodecType() === "binary") { // todo: chunking needs to be handled a layer deeper as there is no chunking for json and xml transports.
                    const existingChunksSize = this.chunkBuffers.reduce((sum: number, chunk) => sum + (chunk as Uint8Array).length, 0);
                    const totalLength = existingChunksSize + (msgSym.body as Uint8Array).length;

                    const concatenated = new Uint8Array(totalLength);
                    let offset = 0;
                    for (const chunk of this.chunkBuffers) {
                        concatenated.set(chunk as Uint8Array, offset);
                        offset += (chunk as Uint8Array).length;
                    }
                    concatenated.set(msgSym.body as Uint8Array, offset);
                    this.chunkBuffers = []; // Clear chunks
                    finalBody = concatenated;
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

    private onReceivedMessage(requestId: number, data: unknown): void {
        const response = this.configuration.decoder.decode(data, this.channel.getCodecType()); // todo: we need to handle the node id. use different decoders for different namesapces and support other node id types

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

    constructor(private channel: ITransportChannel, private configuration: Configuration) {
        channel.onMessage = this.onMessage.bind(this);
    }
}