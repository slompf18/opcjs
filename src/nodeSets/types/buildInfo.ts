// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.4
 */
export class BuildInfo implements IIdentifiable {
    constructor(
        public ProductUri: string | undefined,
        public ManufacturerName: string | undefined,
        public ProductName: string | undefined,
        public SoftwareVersion: string | undefined,
        public BuildNumber: string | undefined,
        public BuildDate: DateTime
    ) { }

    readonly id = 338

    public static decode(reader: BufferReader): BuildInfo {
        const obj = new BuildInfo(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            DateTime.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ProductUri);
        writer.writeString(this.ManufacturerName);
        writer.writeString(this.ProductName);
        writer.writeString(this.SoftwareVersion);
        writer.writeString(this.BuildNumber);
        this.BuildDate.encode(writer);
    }
}
