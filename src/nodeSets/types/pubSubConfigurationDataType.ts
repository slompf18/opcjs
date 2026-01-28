// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { PublishedDataSetDataType } from "./publishedDataSetDataType";
import { PubSubConnectionDataType } from "./pubSubConnectionDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.12/#6.2.12.1
 */
export class PubSubConfigurationDataType implements IIdentifiable {
    constructor(
        public PublishedDataSets: PublishedDataSetDataType[],
        public Connections: PubSubConnectionDataType[],
        public Enabled: boolean
    ) { }

    getId(): number { return 15530; }
}
