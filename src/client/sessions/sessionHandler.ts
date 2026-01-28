import { ConfigurationClient } from "../../configuration/configurationClient";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { NodeId } from "../../types/nodeId";
import { SessionService } from "../services/sessionService";
import { UserIdentity } from "../userIdentity";
import { Session } from "./session";

export class SessionHandler {
    private sessionServices: SessionService;
    async createNewSession(identity:UserIdentity) : Promise<Session>{
        const ret = await this.sessionServices.createSession();
        this.sessionServices = this.sessionServices.recreate(ret.authToken)

        const session = new Session(ret.sessionId, ret.authToken, ret.endpoint, this.sessionServices);
        await session.activateSession(identity);
        return session;
    }

    constructor(secureChannel:ISecureChannel, configuration: ConfigurationClient) {
        this.sessionServices = new SessionService(NodeId.NewTwoByte(0), secureChannel, configuration);
    }
}