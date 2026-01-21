// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.12.2/#5.12.2.2
 */
export class CallMethodRequest implements IIdentifiable {
    constructor(
        public ObjectId: NodeId,
        public MethodId: NodeId,
        public InputArguments: Variant[]
    ) { }

    readonly id = 704

    public static decode(reader: BufferReader): CallMethodRequest {
        const obj = new CallMethodRequest(
            reader.readNodeId(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ObjectId.encode(writer);
        this.MethodId.encode(writer);
        {
            const arr = this.InputArguments ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
