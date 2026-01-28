// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonNetworkMessage
 */
export class JsonNetworkMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public WriterGroupName: string | undefined,
        public DataSetClassId: string | undefined,
        public Messages: ExtensionObject
    ) { }

    getId(): number { return 19311; }
}
