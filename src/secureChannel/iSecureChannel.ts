import { IIdentifiable } from "../codecs/iIdentifiable";
import { MessageSecurityModeEnum } from "../nodeSets/types";

export interface ISecureChannel {
    getSecurityPolicy(): string;
    getSecurityMode(): MessageSecurityModeEnum;
    getEndpointUrl(): string;

    issueServiceRequest(request: IIdentifiable): Promise<IIdentifiable>;
}