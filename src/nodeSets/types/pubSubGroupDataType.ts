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

    getId(): number { return 15609; }
}
