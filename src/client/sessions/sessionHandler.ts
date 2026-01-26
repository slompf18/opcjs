import { ConfigurationClient } from "../../configuration/configurationClient";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { NodeId } from "../../types/nodeId";
import { SessionService } from "../services/sessionService";
import { Session } from "./session";

export class SessionHandler {
    private sessionServices: SessionService;
    async createNewSession() : Promise<Session>{
        const ret = await this.sessionServices.createSession();
        this.sessionServices = this.sessionServices.recreate(ret.authToken)

        const session = new Session(ret.sessionId, ret.authToken, this.sessionServices);
        await session.activateSession();
        return session;
    }

    constructor(secureChannel:ISecureChannel, configuration: ConfigurationClient) {
        this.sessionServices = new SessionService(NodeId.NewTwoByte(0), secureChannel, configuration);
    }
}