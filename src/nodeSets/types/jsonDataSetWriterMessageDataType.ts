// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { JsonDataSetMessageContentMaskEnum } from "./jsonDataSetMessageContentMask";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.3.2
 */
export class JsonDataSetWriterMessageDataType implements IIdentifiable {
    constructor(
        public DataSetMessageContentMask: JsonDataSetMessageContentMaskEnum
    ) { }

    readonly id = 15664
}
