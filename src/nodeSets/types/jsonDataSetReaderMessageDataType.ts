// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { JsonNetworkMessageContentMaskEnum } from "./jsonNetworkMessageContentMask";
import { JsonDataSetMessageContentMaskEnum } from "./jsonDataSetMessageContentMask";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.4.3
 */
export class JsonDataSetReaderMessageDataType implements IIdentifiable {
    constructor(
        public NetworkMessageContentMask: JsonNetworkMessageContentMaskEnum,
        public DataSetMessageContentMask: JsonDataSetMessageContentMaskEnum
    ) { }

    getId(): number { return 15665; }
}
