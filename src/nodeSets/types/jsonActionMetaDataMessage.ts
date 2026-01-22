// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { ActionTargetDataType } from "./actionTargetDataType";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { ActionMethodDataType } from "./actionMethodDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonActionMetaDataMessage
 */
export class JsonActionMetaDataMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public DataSetWriterId: UInt16,
        public DataSetWriterName: string | undefined,
        public Timestamp: Date,
        public ActionTargets: ActionTargetDataType[],
        public Request: DataSetMetaDataType,
        public Response: DataSetMetaDataType,
        public ActionMethods: ActionMethodDataType[]
    ) { }

    readonly id = 19318
}
