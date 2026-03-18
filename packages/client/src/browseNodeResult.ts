import {
  ExpandedNodeId, LocalizedText, NodeClassEnum,
  NodeId, QualifiedName
} from "opcjs-base";

export class BrowseNodeResult {
  constructor(
    public referenceTypeId: NodeId,
    public isForward: boolean,
    public nodeId: ExpandedNodeId,
    public browseName: QualifiedName,
    public displayName: LocalizedText,
    public nodeClass: NodeClassEnum,
    public typeDefinition: ExpandedNodeId,
  ) {}
}
