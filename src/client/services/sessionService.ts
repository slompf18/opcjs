import { Configuration } from "../../configuration/configuration";
import { ActivateSessionRequest, ApplicationDescription, ApplicationTypeEnum, CreateSessionRequest, 
    CreateSessionResponse, EndpointDescription, SignatureData, SignedSoftwareCertificate, 
    UserIdentityToken } from "../../nodeSets/types";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { LocalizedText } from "../../types/localizedText";
import { NodeId } from "../../types/nodeId";
import { ExtensionObject } from "../../types/extensionObject";
import { ServiceBase } from "./serviceBase";

export class SessionService extends ServiceBase{
    async createSession(): Promise<{sessionId:number, authToken: NodeId, endpoint: EndpointDescription}> {
        console.log("Creating session...");

        const request = new CreateSessionRequest(
            this.createRequestHeader(),
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
            this.secureChannel.getEndpointUrl(),
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

        const endpoint = 'opc.' + this.secureChannel.getEndpointUrl();
        const securityMode = this.secureChannel.getSecurityMode();
        const securityPolicyUri = this.secureChannel.getSecurityPolicy();

        const serverEndpoint = castedResponse
            .ServerEndpoints.find(ep => ep.EndpointUrl === endpoint 
                && ep.SecurityMode === securityMode 
                && ep.SecurityPolicyUri === securityPolicyUri);

        if (!serverEndpoint) {
            throw new Error(`Server endpoint ${endpoint} not found in CreateSessionResponse`);
        }

        console.log("Session created with id:", castedResponse.SessionId.Identifier);
        return {
            sessionId: castedResponse.SessionId.Identifier as number, 
            authToken: castedResponse.AuthenticationToken, 
            endpoint: serverEndpoint};
    }

    async activateSession(identityToken:UserIdentityToken): Promise<void> {
        const request = new ActivateSessionRequest(
            this.createRequestHeader(),
            new SignatureData(
                this.secureChannel.getSecurityPolicy(),
                new Uint8Array()
            ),
            new Array<SignedSoftwareCertificate>(),
            ['en-US'],
            ExtensionObject.newFrom(identityToken),
            new SignatureData(
                this.secureChannel.getSecurityPolicy(),
                new Uint8Array())
        );

        console.log("Sending ActivateSessionRequest...");
        await this.secureChannel.issueServiceRequest(request);
        console.log("Session activated.");
    }

    recreate(authToken:NodeId):SessionService{
        return new SessionService(authToken, this.secureChannel, this.configuration)
    }

    constructor(authToken:NodeId, secureChannel: ISecureChannel, private configuration: Configuration) {
        super(authToken, secureChannel)
    }
}