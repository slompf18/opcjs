// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.4/#5.5.4.2
 */
export class GetEndpointsRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public EndpointUrl: string | undefined,
        public LocaleIds: string[],
        public ProfileUris: string[]
    ) { }

    readonly id = 426
}
