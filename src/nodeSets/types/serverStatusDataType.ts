// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ServerStateEnum } from "./serverState";
import { BuildInfo } from "./buildInfo";
import { UInt32 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.10
 */
export class ServerStatusDataType implements IIdentifiable {
    constructor(
        public StartTime: Date,
        public CurrentTime: Date,
        public State: ServerStateEnum,
        public BuildInfo: BuildInfo,
        public SecondsTillShutdown: UInt32,
        public ShutdownReason: LocalizedText
    ) { }

    readonly id = 862
}
