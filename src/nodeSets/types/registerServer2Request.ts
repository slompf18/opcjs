// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { RegisteredServer } from "./registeredServer";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.6/#5.5.6.2
 */
export class RegisterServer2Request implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public Server: RegisteredServer,
        public DiscoveryConfiguration: ExtensionObject[]
    ) { }

    getId(): number { return 12193; }
}
