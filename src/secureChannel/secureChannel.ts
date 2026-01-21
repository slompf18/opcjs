import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IEncodable } from "../codecs/iEncodable";
import { SchemaCodec } from "../nodeSets/schemaCodec";
import { OpenSecureChannelRequest, RequestHeader, SecurityTokenRequestTypeEnum, MessageSecurityModeEnum, OpenSecureChannelResponse } from "../nodeSets/types";
import { SecurityPolicyNone } from "../security/securityPolicyNone";
import { ITransportChannel } from "../transports/iTransportChannel";
import { UInt32 } from "../types/baseTypes";
import { ExtensionObject } from "../types/extensionObject";
import { NodeId } from "../types/nodeId";
import { MsgAsymmetric } from "./messages/msgAsymmetric";
import { MsgHeader } from "./messages/msgHeader";
import { MsgSecurityHeaderAsymmetric } from "./messages/msgSecurityHeaderAsymmetric";
import { MsgSecurityHeaderSymmetric } from "./messages/msgSecurityHeaderSymmetric";
import { MsgSequenceHeader } from "./messages/msgSequenceHeader";
import { MsgSymmetric } from "./messages/msgSymmetric";
import { MsgTypeAbort, MsgTypeChunk, MsgTypeCloseFinal, MsgTypeFinal, MsgTypeOpenFinal } from "./messages/msgType";

export class SecureChannel {
    private sequenceNumber: number = 0;
    private requestNumber: number = 0;
    private securityPolicy = new SecurityPolicyNone();
    private resolvers: Map<UInt32, Function> = new Map();
    private id: UInt32 = 0;
    private token: UInt32 = 0;

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
        request.encode(requestBuffer);

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

        this.resolvers.set(msg.sequenceHeader.requestId, this.openSecureChannelResponse.bind(this));

        this.channel.send(msgBuffer.getData());
    }

    private openSecureChannelResponse(response:OpenSecureChannelResponse): void {
            
        console.log("OpenSecureChannelResponse received");
        this.id = response.SecurityToken.ChannelId;
        this.token = response.SecurityToken.TokenId;
    }

    public async disconnect(): Promise<void> {
        this.channel.disconnect();
    }

    private onMessage(data: Uint8Array) {
        const buffer = new BufferReader(data);
        const header = MsgHeader.decode(buffer);
        const headerLength = buffer.getPosition();

        switch (header.msgType) {
            case MsgTypeOpenFinal:
                console.log("SecureChannel received OpenFinal message");
                const headerSecurity = MsgSecurityHeaderAsymmetric.decode(buffer);
                const msg = MsgAsymmetric.decode(
                    buffer, 
                    header,
                    headerSecurity,
                    headerLength,
                    this.securityPolicy.getAlgorithmAsymmetric(new Uint8Array(), new Uint8Array()));
                
                console.log(buffer.toString());
                const response = SchemaCodec.decode(buffer);

                const requestId = msg.sequenceHeader.requestId;
                const resolver = this.resolvers.get(requestId);
                this.resolvers.delete(msg.sequenceHeader.requestId);
                if (resolver) {
                    resolver(response);
                } else {
                    console.warn("No resolver found for requestId:", requestId);
                }
                break;
            case MsgTypeAbort:
                console.log("SecureChannel received Abort message");
                break;
            case MsgTypeChunk:
                console.log("SecureChannel received Chunk message");
                break;
            case MsgTypeFinal:
                console.log("SecureChannel received Final message");
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

    private send(request: IEncodable) {
        const buffer = new BufferWriter();
        request.encode(buffer);

        const msg = new MsgSymmetric(
            new MsgHeader(
                MsgTypeOpenFinal,
                0,// will be set while encoding
                this.id
            ),
            new MsgSecurityHeaderSymmetric(0),
            new MsgSequenceHeader(0, 0),
            buffer.getData()
        )
    }

    constructor(private channel: ITransportChannel) {
        channel.onMessage = this.onMessage.bind(this);
    }
}