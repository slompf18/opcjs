import { IIdentifiable } from "../codecs/iIdentifiable";
import { MessageSecurityModeEnum } from "../nodeSets/types";

export interface ISecureChannel {
    getSecurityPolicy(): string;
    getSecurityMode(): MessageSecurityModeEnum;

    issueServiceRequest(request: IIdentifiable): Promise<IIdentifiable>;
}