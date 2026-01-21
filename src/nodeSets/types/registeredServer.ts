// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { ApplicationTypeEnum } from "./applicationType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.31
 */
export class RegisteredServer implements IIdentifiable {
    constructor(
        public ServerUri: string | undefined,
        public ProductUri: string | undefined,
        public ServerNames: LocalizedText[],
        public ServerType: ApplicationTypeEnum,
        public GatewayServerUri: string | undefined,
        public DiscoveryUrls: string | undefined[],
        public SemaphoreFilePath: string | undefined,
        public IsOnline: boolean
    ) { }

    readonly id = 432

    public static decode(reader: BufferReader): RegisteredServer {
        const obj = new RegisteredServer(
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readLocalizedText(); } return arr; })(),
            ApplicationTypeEnum.decode(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ServerUri);
        writer.writeString(this.ProductUri);
        {
            const arr = this.ServerNames ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        ApplicationTypeEnum.encode(writer, this.ServerType);
        writer.writeString(this.GatewayServerUri);
        {
            const arr = this.DiscoveryUrls ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeString(this.SemaphoreFilePath);
        writer.writeBoolean(this.IsOnline);
    }
}
