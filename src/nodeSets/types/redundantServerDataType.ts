// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    public static decode(reader: BufferReader): RedundantServerDataType {
        const obj = new RedundantServerDataType(
            reader.readString(),
            reader.readUInt8(),
            ServerStateEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ServerId);
        writer.writeUint8(this.ServiceLevel);
        ServerStateEnum.encode(writer, this.ServerState);
    }
}
