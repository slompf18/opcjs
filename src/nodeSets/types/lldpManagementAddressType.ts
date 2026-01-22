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
}
