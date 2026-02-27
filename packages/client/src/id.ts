import { NodeId } from "opcjs-base";

export class Id {
    static newId(namespace: number, identifier: string) {
        return new Id(new NodeId(namespace, identifier));
    }

    toNodeId(){
        return this.nodeId
    }

    toString(){
        return `${this.nodeId.namespace}:${this.nodeId.identifier}`
    }

    constructor(private nodeId: NodeId) { }
}