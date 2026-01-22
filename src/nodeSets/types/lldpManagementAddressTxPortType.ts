// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
}
