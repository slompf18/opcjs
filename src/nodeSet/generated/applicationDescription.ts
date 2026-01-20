// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { ApplicationTypeEnum } from "./applicationType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.3
 */
export class ApplicationDescription implements IEncodable {
    constructor(
        public ApplicationUri: string | undefined,
        public ProductUri: string | undefined,
        public ApplicationName: LocalizedText,
        public ApplicationType: ApplicationTypeEnum,
        public GatewayServerUri: string | undefined,
        public DiscoveryProfileUri: string | undefined,
        public DiscoveryUrls: string | undefined[]
    ) { }

    public static decode(reader: BufferReader): ApplicationDescription {
        const obj = new ApplicationDescription(
            reader.readString(),
            reader.readString(),
            reader.readLocalizedText(),
            ApplicationTypeEnum.decode(reader),
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ApplicationUri);
        writer.writeString(this.ProductUri);
        this.ApplicationName.encode(writer);
        ApplicationTypeEnum.encode(writer, this.ApplicationType);
        writer.writeString(this.GatewayServerUri);
        writer.writeString(this.DiscoveryProfileUri);
        {
            const arr = this.DiscoveryUrls ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
