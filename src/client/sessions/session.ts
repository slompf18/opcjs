import { EndpointDescription, UserNameIdentityToken } from "../../nodeSets/types";
import { NodeId } from "../../types/nodeId";
import { SessionService } from "../services/sessionService";
import { UserIdentity } from "../userIdentity";

export class Session {
    async activateSession(identity:UserIdentity): Promise<void> {
        const token = identity.getUserIdentityToken();
        const tokenType = identity.getTokenType();
        const tokenPolicy = this.endpoint.UserIdentityTokens?.find(t => t.TokenType === tokenType);
        if(!tokenPolicy){
            throw new Error(`UserIdentityToken of type ${tokenType} not supported by server`);
        }
        token.PolicyId = tokenPolicy.PolicyId;
        
        await this.sessionServices.activateSession(token);
    }

    getAuthToken() : NodeId{
        return this.authToken;
    }

    constructor(
        public sessionId: number, 
        private authToken: NodeId, 
        private endpoint: EndpointDescription, 
        private sessionServices: SessionService) { }
}