import { EndpointDescription, IssuedIdentityToken, UserNameIdentityToken, UserTokenTypeEnum } from "../../nodeSets/types";
import { NodeId } from "../../types/nodeId";
import { IssuerConfiguration } from "../issuerConfiguration";
import { SessionService } from "../services/sessionService";
import { UserIdentity } from "../userIdentity";

export class Session {
    async activateSession(identity: UserIdentity): Promise<void> {
        const token = identity.getUserIdentityToken();
        const tokenType = identity.getTokenType();
        const tokenPolicy = this.endpoint.UserIdentityTokens?.find(t => t.TokenType === tokenType);
        if (!tokenPolicy) {
            throw new Error(`UserIdentityToken of type ${tokenType} not supported by server`);
        }
        token.PolicyId = tokenPolicy.PolicyId;

        if (tokenType === UserTokenTypeEnum.IssuedToken) {
            if (!tokenPolicy.IssuerEndpointUrl) {
                throw new Error("IssuerEndpointUrl not defined for IssuedToken");
            }
            const issuerEndpointUrl = JSON.parse(tokenPolicy.IssuerEndpointUrl)
            const issuerConfig = IssuerConfiguration.newFrom(issuerEndpointUrl);

            const issuerLoginCallback = identity.getIssuerLoginCallback();
            const tokenData = await issuerLoginCallback(issuerConfig);

            const issuerToken = token as IssuedIdentityToken;
            issuerToken.TokenData = new TextEncoder().encode(tokenData.json);
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