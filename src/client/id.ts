import { NodeId } from "../types/nodeId";

export class Id {
    static newId(namespace: number, identifier: string) {
        return new Id(NodeId.NewString(namespace, identifier))
    }

    toNodeId(){
        return this.nodeId
    }

    toString(){
        return `${this.nodeId.Namespace}:${this.nodeId.Identifier}`
    }

    constructor(private nodeId: NodeId) { }
}