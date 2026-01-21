// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.5/#5.9.5.2
 */
export class RegisterNodesResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public RegisteredNodeIds: NodeId[]
    ) { }

    readonly id = 561

    public static decode(reader: BufferReader): RegisterNodesResponse {
        const obj = new RegisterNodesResponse(
            ResponseHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        {
            const arr = this.RegisteredNodeIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
