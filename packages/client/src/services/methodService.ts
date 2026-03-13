import { CallMethodRequest, CallRequest, CallResponse, ISecureChannel, NodeId } from "opcjs-base";
import { ServiceBase } from "./serviceBase";
import { StatusCodeToString } from "../../../base/src/types/statusCode";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.11
export class MethodService extends ServiceBase {

    /**
     * Calls one or more methods on the server (OPC UA Part 4, Section 5.11.2).
     * @param methodsToCall - Array of CallMethodRequest describing each method to invoke.
     * @returns Array of CallMethodResult, one per requested method.
     */
    async call(methodsToCall: CallMethodRequest[]): Promise<{ status: string, value: unknown[] }[]> {
        const request = new CallRequest();
        request.requestHeader = this.createRequestHeader();
        request.methodsToCall = methodsToCall;

        const response = await this.secureChannel.issueServiceRequest(request) as CallResponse;
        return response.results.map(result => ({
            status: StatusCodeToString(result.statusCode),
            value: result.outputArguments.map(arg => arg.value)
        }));
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}
