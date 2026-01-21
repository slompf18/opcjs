// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UserTokenPolicy } from "./userTokenPolicy";
import { Float64, UInt16 } from "../../types/baseTypes";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.12/#6.2.12.3
 */
export class PubSubKeyPushTargetDataType implements IIdentifiable {
    constructor(
        public ApplicationUri: string | undefined,
        public PushTargetFolder: string | undefined[],
        public EndpointUrl: string | undefined,
        public SecurityPolicyUri: string | undefined,
        public UserTokenType: UserTokenPolicy,
        public RequestedKeyCount: UInt16,
        public RetryInterval: Float64,
        public PushTargetProperties: KeyValuePair[],
        public SecurityGroups: string | undefined[]
    ) { }

    readonly id = 25270

    public static decode(reader: BufferReader): PubSubKeyPushTargetDataType {
        const obj = new PubSubKeyPushTargetDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readString(),
            UserTokenPolicy.decode(reader),
            reader.readUInt16(),
            reader.readFloat64(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ApplicationUri);
        {
            const arr = this.PushTargetFolder ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeString(this.EndpointUrl);
        writer.writeString(this.SecurityPolicyUri);
        this.UserTokenType.encode(writer);
        writer.writeUInt16(this.RequestedKeyCount);
        writer.writeFloat64(this.RetryInterval);
        {
            const arr = this.PushTargetProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.SecurityGroups ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
