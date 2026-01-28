// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16, UInt32 } from "../../types/baseTypes";
import { ConfigurationVersionDataType } from "./configurationVersionDataType";
import { StatusCode } from "../../types/statusCode";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonDataSetMessage
 */
export class JsonDataSetMessage implements IIdentifiable {
    constructor(
        public DataSetWriterId: UInt16,
        public DataSetWriterName: string | undefined,
        public PublisherId: string | undefined,
        public WriterGroupName: string | undefined,
        public SequenceNumber: UInt32,
        public MetaDataVersion: ConfigurationVersionDataType,
        public MinorVersion: UInt32,
        public Timestamp: Date,
        public Status: StatusCode,
        public MessageType: string | undefined,
        public Payload: ExtensionObject
    ) { }

    getId(): number { return 19312; }
}
