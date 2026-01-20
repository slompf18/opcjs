// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { NodeId } from "../../types/nodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.2/#5.8.2.2
 */
export class AddNodesResult implements IEncodable {
    constructor(
        public StatusCode: StatusCode,
        public AddedNodeId: NodeId
    ) { }

    public static decode(reader: BufferReader): AddNodesResult {
        const obj = new AddNodesResult(
            reader.readStatusCode(),
            reader.readNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StatusCode.encode(writer);
        this.AddedNodeId.encode(writer);
    }
}
