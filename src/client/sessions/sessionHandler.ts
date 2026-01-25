import { ConfigurationClient } from "../../configuration/configurationClient";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { SessionService } from "../services/sessionService";
import { Session } from "./session";

export class SessionHandler {
    private sessionServices: SessionService;
    async createNewSession() : Promise<Session>{
        const ret = await this.sessionServices.createSession();

        const session = new Session(ret.sessionId, ret.authToken, this.sessionServices);
        await session.activateSession();
        return session;
    }

    constructor(secureChannel:ISecureChannel, configuration: ConfigurationClient) {
        this.sessionServices = new SessionService(secureChannel, configuration);
    }
}