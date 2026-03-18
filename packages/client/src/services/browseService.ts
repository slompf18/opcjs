import {
  BrowseDescription, BrowseNextRequest, BrowseNextResponse,
  BrowseRequest, BrowseResponse, BrowseResult,
  ISecureChannel, NodeId, UaByteString, ViewDescription
} from "opcjs-base";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.9
export class BrowseService extends ServiceBase {

  async browse(nodesToBrowse: BrowseDescription[]): Promise<BrowseResult[]> {
    const view = new ViewDescription();
    view.viewId = NodeId.newNumeric(0, 0);
    view.timestamp = new Date(-11644473600000); // OPC UA MinDateTime (ticks=0)
    view.viewVersion = 0;

    const request = new BrowseRequest();
    request.requestHeader = this.createRequestHeader();
    request.view = view;
    request.requestedMaxReferencesPerNode = 0;
    request.nodesToBrowse = nodesToBrowse;

    const response = await this.secureChannel
      .issueServiceRequest(request) as BrowseResponse;
    return response.results ?? [];
  }

  async browseNext(
    continuationPoints: UaByteString[],
    releaseContinuationPoints: boolean,
  ): Promise<BrowseResult[]> {
    const request = new BrowseNextRequest();
    request.requestHeader = this.createRequestHeader();
    request.releaseContinuationPoints = releaseContinuationPoints;
    request.continuationPoints = continuationPoints;

    const response = await this.secureChannel
      .issueServiceRequest(request) as BrowseNextResponse;
    return response.results ?? [];
  }

  constructor(authToken: NodeId, secureChannel: ISecureChannel) {
    super(authToken, secureChannel);
  }
}
