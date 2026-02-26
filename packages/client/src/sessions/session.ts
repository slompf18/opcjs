import { EndpointDescription, IssuedIdentityToken, NodeId, UserTokenTypeEnum } from "@opcua/base";
import { IssuerConfiguration } from "../issuerConfiguration";
import { SessionService } from "../services/sessionService";
import { UserIdentity } from "../userIdentity";

export class Session {
    async activateSession(identity: UserIdentity): Promise<void> {
        const token = identity.getUserIdentityToken();
        const tokenType = identity.getTokenType();
        const tokenPolicy = this.endpoint.userIdentityTokens?.find(t => t.tokenType === tokenType);
        if (!tokenPolicy) {
            throw new Error(`UserIdentityToken of type ${tokenType} not supported by server`);
        }
        token.policyId = tokenPolicy.policyId;

        if (tokenType === UserTokenTypeEnum.IssuedToken) {
            if (!tokenPolicy.issuerEndpointUrl) {
                throw new Error("IssuerEndpointUrl not defined for IssuedToken");
            }
            const issuerEndpointUrl = JSON.parse(tokenPolicy.issuerEndpointUrl)
            const issuerConfig = IssuerConfiguration.newFrom(issuerEndpointUrl);

            const issuerLoginCallback = identity.getIssuerLoginCallback();
            const tokenData = await issuerLoginCallback(issuerConfig);

            const issuerToken = token as IssuedIdentityToken;
            issuerToken.tokenData = new TextEncoder().encode(tokenData.json);
        }

        await this.sessionServices.activateSession(token);
    }

    getAuthToken(): NodeId {
        return this.authToken;
    }

    constructor(
        public sessionId: number,
        private authToken: NodeId,
        private endpoint: EndpointDescription,
        private sessionServices: SessionService) { }
}