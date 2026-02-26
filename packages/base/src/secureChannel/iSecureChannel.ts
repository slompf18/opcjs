import { MessageSecurityModeEnum } from "../schema/enums.js";
import { IOpcType } from "../types/iOpcType.js";

export interface ISecureChannel {
    getSecurityPolicy(): string;
    getSecurityMode(): MessageSecurityModeEnum;
    getEndpointUrl(): string;

    issueServiceRequest(request: IOpcType): Promise<IOpcType>;
}