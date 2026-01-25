import { Configuration } from "../../configuration/configuration";
import { ActivateSessionRequest, ApplicationDescription, ApplicationTypeEnum, CreateSessionRequest, CreateSessionResponse, RequestHeader, SignatureData, SignedSoftwareCertificate } from "../../nodeSets/types";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { LocalizedText } from "../../types/localizedText";
import { NodeId } from "../../types/nodeId";
import { ExtensionObject } from "../../types/extensionObject";

export class SessionService{
    async createSession(): Promise<{sessionId:number, authToken: NodeId}> {
        console.log("Creating session...");

        const request = new CreateSessionRequest(
            this.createRequestHeader(NodeId.NewTwoByte(0)),
            new ApplicationDescription(
                this.configuration.applicationUri,
                this.configuration.productUri,
                LocalizedText.NewLocalizedText(this.configuration.productName),
                ApplicationTypeEnum.Client,
                undefined,
                undefined,
                new Array<string>()
            ),
            undefined,
            undefined,
            undefined,
            null,
            null,
            60000,
            0
        );

        // todo: verify endpoints
        // todo: check application uri in server certificate

        console.log("Sending CreateSessionRequest...");
        const response = await this.secureChannel.issueServiceRequest(request);
        if (!response || !(response instanceof CreateSessionResponse)) {
            throw new Error("Invalid response type for CreateSessionRequest");
        }

        const castedResponse = response as CreateSessionResponse;
        if (!castedResponse.SessionId || !castedResponse.AuthenticationToken) {
            throw new Error("CreateSessionResponse missing SessionId or AuthenticationToken");
        }
        console.log("Session created with SessionId:", castedResponse.SessionId.Identifier, "and AuthToken:", castedResponse.AuthenticationToken.Identifier);
        return {sessionId: castedResponse.SessionId.Identifier as number, authToken: castedResponse.AuthenticationToken};
    }

    async activateSession(authToken: NodeId): Promise<void> {
        const request = new ActivateSessionRequest(
            this.createRequestHeader(authToken),
            new SignatureData(
                this.secureChannel.getSecurityPolicy(),
                new Uint8Array()
            ),
            new Array<SignedSoftwareCertificate>(),
            ['en-US'],
            ExtensionObject.newEmpty(),
            new SignatureData(
                this.secureChannel.getSecurityPolicy(),
                new Uint8Array())
        );

        console.log("Sending ActivateSessionRequest...");
        await this.secureChannel.issueServiceRequest(request);
        console.log("Session activated.");
    }

    private createRequestHeader(authtoken: NodeId): RequestHeader {
        return new RequestHeader(
            authtoken,
            new Date(),
            0, // will be set by secure channel
            0,
            '',
            60000,
            ExtensionObject.newEmpty()
        );
    }

    constructor(private secureChannel: ISecureChannel, private configuration: Configuration) {
    }
}