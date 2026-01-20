// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RelativePath } from "./relativePath";
import { UInt32 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class QueryDataDescription implements IEncodable {
    constructor(
        public RelativePath: RelativePath,
        public AttributeId: UInt32,
        public IndexRange: string | undefined
    ) { }

    public static decode(reader: BufferReader): QueryDataDescription {
        const obj = new QueryDataDescription(
            RelativePath.decode(reader),
            reader.readUInt32(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RelativePath.encode(writer);
        writer.writeUInt32(this.AttributeId);
        writer.writeString(this.IndexRange);
    }
}
