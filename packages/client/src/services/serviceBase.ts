import { ExtensionObject, ISecureChannel, NodeId, RequestHeader } from "@opcua/base";

export abstract class ServiceBase{


    protected createRequestHeader(): RequestHeader {
        const requestHeader = new RequestHeader();
        requestHeader.authenticationToken = this.authToken;
        requestHeader.timestamp = new Date();
        requestHeader.requestHandle = 0; // will be set by secure channel
        requestHeader.returnDiagnostics = 0;
        requestHeader.auditEntryId = '';
        requestHeader.timeoutHint = 60000;
        requestHeader.additionalHeader = ExtensionObject.newEmpty();

        return requestHeader;
    }
    
    constructor(private authToken: NodeId, protected secureChannel: ISecureChannel){}
}