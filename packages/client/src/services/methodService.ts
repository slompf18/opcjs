import { CallMethodRequest, CallRequest, CallResponse, getLogger, ISecureChannel, NodeId, StatusCode } from 'opcjs-base'

import { ServiceBase } from './serviceBase.js'

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.11.2
export class MethodService extends ServiceBase {
    private logger = getLogger("services.MethodService");

    /**
     * Calls one or more methods on the server (OPC UA Part 4, Section 5.11.2).
     * @param methodsToCall - Array of CallMethodRequest describing each method to invoke.
     * @returns Array of results containing output argument values and raw status code number, one per requested method.
     */
    async call(methodsToCall: CallMethodRequest[]): Promise<{ statusCode: number, value: unknown[] }[]> {
        const request = new CallRequest();
        request.requestHeader = this.createRequestHeader();
        request.methodsToCall = methodsToCall;

        this.logger.debug("Sending CallRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as CallResponse;

        this.checkServiceResult(response.responseHeader?.serviceResult, 'CallRequest')

        return response.results.map(result => ({
            statusCode: result.statusCode ?? StatusCode.Good,
            value: result.outputArguments.map(arg => arg.value),
        }));
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}
