import { ConfigurationClient } from "../configurationClient";
import { ISecureChannel, NodeId } from "@opcua/base";
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
        this.sessionServices = new SessionService(NodeId.newTwoByte(0), secureChannel, configuration);
    }
}