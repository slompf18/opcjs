// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
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
        public StartTime: DateTime,
        public CurrentTime: DateTime,
        public State: ServerStateEnum,
        public BuildInfo: BuildInfo,
        public SecondsTillShutdown: UInt32,
        public ShutdownReason: LocalizedText
    ) { }

    readonly id = 862

    public static decode(reader: BufferReader): ServerStatusDataType {
        const obj = new ServerStatusDataType(
            DateTime.decode(reader),
            DateTime.decode(reader),
            ServerStateEnum.decode(reader),
            BuildInfo.decode(reader),
            reader.readUInt32(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StartTime.encode(writer);
        this.CurrentTime.encode(writer);
        ServerStateEnum.encode(writer, this.State);
        this.BuildInfo.encode(writer);
        writer.writeUInt32(this.SecondsTillShutdown);
        this.ShutdownReason.encode(writer);
    }
}
