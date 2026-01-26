import { NodeId } from "../types/nodeId";

export class Id {
    static newId(namespace: number, identifier: string) {
        return new Id(NodeId.NewString(namespace, identifier))
    }

    toNodeId(){
        return this.nodeId
    }

    constructor(private nodeId: NodeId) { }
}