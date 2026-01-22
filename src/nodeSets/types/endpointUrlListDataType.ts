// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.20
 */
export class EndpointUrlListDataType implements IIdentifiable {
    constructor(
        public EndpointUrlList: string | undefined[]
    ) { }

    readonly id = 11943
}
