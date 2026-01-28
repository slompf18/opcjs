// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { EndpointUrlListDataType } from "./endpointUrlListDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.19
 */
export class NetworkGroupDataType implements IIdentifiable {
    constructor(
        public ServerUri: string | undefined,
        public NetworkPaths: EndpointUrlListDataType[]
    ) { }

    getId(): number { return 11944; }
}
