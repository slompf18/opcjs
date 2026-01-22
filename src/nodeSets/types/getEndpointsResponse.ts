// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { EndpointDescription } from "./endpointDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.4/#5.5.4.2
 */
export class GetEndpointsResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Endpoints: EndpointDescription[]
    ) { }

    readonly id = 429
}
