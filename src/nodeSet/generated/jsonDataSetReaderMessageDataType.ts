// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { JsonNetworkMessageContentMaskEnum } from "./jsonNetworkMessageContentMask";
import { JsonDataSetMessageContentMaskEnum } from "./jsonDataSetMessageContentMask";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.4.3
 */
export class JsonDataSetReaderMessageDataType implements IEncodable {
    constructor(
        public NetworkMessageContentMask: JsonNetworkMessageContentMaskEnum,
        public DataSetMessageContentMask: JsonDataSetMessageContentMaskEnum
    ) { }

    public static decode(reader: BufferReader): JsonDataSetReaderMessageDataType {
        const obj = new JsonDataSetReaderMessageDataType(
            JsonNetworkMessageContentMaskEnum.decode(reader),
            JsonDataSetMessageContentMaskEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        JsonNetworkMessageContentMaskEnum.encode(writer, this.NetworkMessageContentMask);
        JsonDataSetMessageContentMaskEnum.encode(writer, this.DataSetMessageContentMask);
    }
}
