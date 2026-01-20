// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { JsonNetworkMessageContentMaskEnum } from "./jsonNetworkMessageContentMask";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.1.2
 */
export class JsonWriterGroupMessageDataType implements IEncodable {
    constructor(
        public NetworkMessageContentMask: JsonNetworkMessageContentMaskEnum
    ) { }

    public static decode(reader: BufferReader): JsonWriterGroupMessageDataType {
        const obj = new JsonWriterGroupMessageDataType(
            JsonNetworkMessageContentMaskEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        JsonNetworkMessageContentMaskEnum.encode(writer, this.NetworkMessageContentMask);
    }
}
