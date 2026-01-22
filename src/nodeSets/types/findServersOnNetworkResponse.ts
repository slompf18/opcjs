// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { ServerOnNetwork } from "./serverOnNetwork";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.3/#5.5.3.2
 */
export class FindServersOnNetworkResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public LastCounterResetTime: Date,
        public Servers: ServerOnNetwork[]
    ) { }

    readonly id = 12191
}
