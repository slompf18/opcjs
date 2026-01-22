// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.2/#5.5.2.2
 */
export class FindServersRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public EndpointUrl: string | undefined,
        public LocaleIds: string | undefined[],
        public ServerUris: string | undefined[]
    ) { }

    readonly id = 420
}
