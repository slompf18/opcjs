// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ViewDescription } from "./viewDescription";
import { NodeTypeDescription } from "./nodeTypeDescription";
import { ContentFilter } from "./contentFilter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class QueryFirstRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public View: ViewDescription,
        public NodeTypes: NodeTypeDescription[],
        public Filter: ContentFilter,
        public MaxDataSetsToReturn: UInt32,
        public MaxReferencesToReturn: UInt32
    ) { }

    readonly id = 613

    public static decode(reader: BufferReader): QueryFirstRequest {
        const obj = new QueryFirstRequest(
            RequestHeader.decode(reader),
            ViewDescription.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = NodeTypeDescription.decode(reader); } return arr; })(),
            ContentFilter.decode(reader),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        this.View.encode(writer);
        {
            const arr = this.NodeTypes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.Filter.encode(writer);
        writer.writeUInt32(this.MaxDataSetsToReturn);
        writer.writeUInt32(this.MaxReferencesToReturn);
    }
}
