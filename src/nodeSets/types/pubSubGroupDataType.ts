// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { EndpointDescription } from "./endpointDescription";
import { UInt32 } from "../../types/baseTypes";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.5/#6.2.5.7
 */
export class PubSubGroupDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Enabled: boolean,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityGroupId: string | undefined,
        public SecurityKeyServices: EndpointDescription[],
        public MaxNetworkMessageSize: UInt32,
        public GroupProperties: KeyValuePair[]
    ) { }

    readonly id = 15609

    public static decode(reader: BufferReader): PubSubGroupDataType {
        const obj = new PubSubGroupDataType(
            reader.readString(),
            reader.readBoolean(),
            MessageSecurityModeEnum.decode(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointDescription.decode(reader); } return arr; })(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        writer.writeBoolean(this.Enabled);
        MessageSecurityModeEnum.encode(writer, this.SecurityMode);
        writer.writeString(this.SecurityGroupId);
        {
            const arr = this.SecurityKeyServices ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeUInt32(this.MaxNetworkMessageSize);
        {
            const arr = this.GroupProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
