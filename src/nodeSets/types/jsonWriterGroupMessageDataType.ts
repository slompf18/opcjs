// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { JsonNetworkMessageContentMaskEnum } from "./jsonNetworkMessageContentMask";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.1.2
 */
export class JsonWriterGroupMessageDataType implements IIdentifiable {
    constructor(
        public NetworkMessageContentMask: JsonNetworkMessageContentMaskEnum
    ) { }

    readonly id = 15657

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
