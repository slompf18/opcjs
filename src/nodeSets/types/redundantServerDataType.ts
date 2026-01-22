// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { ServerStateEnum } from "./serverState";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.7
 */
export class RedundantServerDataType implements IIdentifiable {
    constructor(
        public ServerId: string | undefined,
        public ServiceLevel: UInt8,
        public ServerState: ServerStateEnum
    ) { }

    readonly id = 853
}
