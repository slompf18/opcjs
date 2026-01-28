// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { EnumField } from "./enumField";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.4
 */
export class EnumDefinition implements IIdentifiable {
    constructor(
        public Fields: EnumField[]
    ) { }

    getId(): number { return 100; }
}
