import { NodeId } from "../../types/nodeId";
import { AttributeService } from "../services/attributeService";
import { SessionService } from "../services/sessionService";

export class Session {
    async activateSession(): Promise<void> {
        await this.sessionServices.activateSession(this.authToken);
    }

    getAuthToken() : NodeId{
        return this.authToken;
    }

    constructor(public sessionId: number, private authToken: NodeId, private sessionServices: SessionService) { }
}