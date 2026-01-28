// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { EnumDefinition } from "./enumDefinition";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.34
 */
export class EnumDescription implements IIdentifiable {
    constructor(
        public EnumDefinition: EnumDefinition,
        public BuiltInType: UInt8
    ) { }

    getId(): number { return 15488; }
}
