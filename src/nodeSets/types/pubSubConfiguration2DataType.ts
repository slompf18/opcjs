// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StandaloneSubscribedDataSetDataType } from "./standaloneSubscribedDataSetDataType";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { EndpointDescription } from "./endpointDescription";
import { SecurityGroupDataType } from "./securityGroupDataType";
import { PubSubKeyPushTargetDataType } from "./pubSubKeyPushTargetDataType";
import { UInt32 } from "../../types/baseTypes";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.12/#6.2.12.4
 */
export class PubSubConfiguration2DataType implements IIdentifiable {
    constructor(
        public SubscribedDataSets: StandaloneSubscribedDataSetDataType[],
        public DataSetClasses: DataSetMetaDataType[],
        public DefaultSecurityKeyServices: EndpointDescription[],
        public SecurityGroups: SecurityGroupDataType[],
        public PubSubKeyPushTargets: PubSubKeyPushTargetDataType[],
        public ConfigurationVersion: UInt32,
        public ConfigurationProperties: KeyValuePair[]
    ) { }

    getId(): number { return 23602; }
}
