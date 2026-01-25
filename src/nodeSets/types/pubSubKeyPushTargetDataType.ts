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
        public PushTargetFolder: string[],
        public EndpointUrl: string | undefined,
        public SecurityPolicyUri: string | undefined,
        public UserTokenType: UserTokenPolicy,
        public RequestedKeyCount: UInt16,
        public RetryInterval: Float64,
        public PushTargetProperties: KeyValuePair[],
        public SecurityGroups: string[]
    ) { }

    readonly id = 25270
}
