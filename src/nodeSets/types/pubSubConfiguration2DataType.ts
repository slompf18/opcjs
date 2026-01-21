// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    readonly id = 23602

    public static decode(reader: BufferReader): PubSubConfiguration2DataType {
        const obj = new PubSubConfiguration2DataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = StandaloneSubscribedDataSetDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = DataSetMetaDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointDescription.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SecurityGroupDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = PubSubKeyPushTargetDataType.decode(reader); } return arr; })(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.SubscribedDataSets ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.DataSetClasses ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.DefaultSecurityKeyServices ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.SecurityGroups ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.PubSubKeyPushTargets ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeUInt32(this.ConfigurationVersion);
        {
            const arr = this.ConfigurationProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
