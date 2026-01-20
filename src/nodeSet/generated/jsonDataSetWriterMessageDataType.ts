// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { JsonDataSetMessageContentMaskEnum } from "./jsonDataSetMessageContentMask";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.3.2
 */
export class JsonDataSetWriterMessageDataType implements IEncodable {
    constructor(
        public DataSetMessageContentMask: JsonDataSetMessageContentMaskEnum
    ) { }

    public static decode(reader: BufferReader): JsonDataSetWriterMessageDataType {
        const obj = new JsonDataSetWriterMessageDataType(
            JsonDataSetMessageContentMaskEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        JsonDataSetMessageContentMaskEnum.encode(writer, this.DataSetMessageContentMask);
    }
}
