// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { RegisteredServer } from "./registeredServer";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.5/#5.5.5.2
 */
export class RegisterServerRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public Server: RegisteredServer
    ) { }

    readonly id = 435
}
