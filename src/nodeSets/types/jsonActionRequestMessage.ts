// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16, UInt32 } from "../../types/baseTypes";
import { ConfigurationVersionDataType } from "./configurationVersionDataType";
import { ActionStateEnum } from "./actionState";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonActionRequestMessage
 */
export class JsonActionRequestMessage implements IIdentifiable {
    constructor(
        public DataSetWriterId: UInt16,
        public ActionTargetId: UInt16,
        public DataSetWriterName: string | undefined,
        public WriterGroupName: string | undefined,
        public MetaDataVersion: ConfigurationVersionDataType,
        public MinorVersion: UInt32,
        public Timestamp: Date,
        public MessageType: string | undefined,
        public RequestId: UInt16,
        public ActionState: ActionStateEnum,
        public Payload: ExtensionObject
    ) { }

    getId(): number { return 19321; }
}
