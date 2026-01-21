// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { ManAddrIfSubtypeEnum } from "./manAddrIfSubtype";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.2/#5.3.2.2
 */
export class LldpManagementAddressTxPortType implements IIdentifiable {
    constructor(
        public AddressSubtype: UInt32,
        public ManAddress: string | undefined,
        public TxEnable: boolean,
        public AddrLen: UInt32,
        public IfSubtype: ManAddrIfSubtypeEnum,
        public IfId: UInt32
    ) { }

    readonly id = 18953

    public static decode(reader: BufferReader): LldpManagementAddressTxPortType {
        const obj = new LldpManagementAddressTxPortType(
            reader.readUInt32(),
            reader.readString(),
            reader.readBoolean(),
            reader.readUInt32(),
            ManAddrIfSubtypeEnum.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.AddressSubtype);
        writer.writeString(this.ManAddress);
        writer.writeBoolean(this.TxEnable);
        writer.writeUInt32(this.AddrLen);
        ManAddrIfSubtypeEnum.encode(writer, this.IfSubtype);
        writer.writeUInt32(this.IfId);
    }
}
