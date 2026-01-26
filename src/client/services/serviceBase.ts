import { RequestHeader } from "../../nodeSets/types";
import { ISecureChannel } from "../../secureChannel/iSecureChannel";
import { ExtensionObject } from "../../types/extensionObject";
import { NodeId } from "../../types/nodeId";

export abstract class ServiceBase{


    protected createRequestHeader(): RequestHeader {
        return new RequestHeader(
            this.authToken,
            new Date(),
            0, // will be set by secure channel
            0,
            '',
            60000,
            ExtensionObject.newEmpty()
        );
    }
    
    constructor(private authToken: NodeId, protected secureChannel: ISecureChannel){}
}