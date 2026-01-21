// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { ManAddrIfSubtypeEnum } from "./manAddrIfSubtype";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.2/#5.3.2.3
 */
export class LldpManagementAddressType implements IIdentifiable {
    constructor(
        public AddressSubtype: UInt32,
        public Address: string | undefined,
        public IfSubtype: ManAddrIfSubtypeEnum,
        public IfId: UInt32
    ) { }

    readonly id = 18954

    public static decode(reader: BufferReader): LldpManagementAddressType {
        const obj = new LldpManagementAddressType(
            reader.readUInt32(),
            reader.readString(),
            ManAddrIfSubtypeEnum.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.AddressSubtype);
        writer.writeString(this.Address);
        ManAddrIfSubtypeEnum.encode(writer, this.IfSubtype);
        writer.writeUInt32(this.IfId);
    }
}
