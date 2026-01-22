// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StructureDefinition } from "./structureDefinition";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.33
 */
export class StructureDescription implements IIdentifiable {
    constructor(
        public StructureDefinition: StructureDefinition
    ) { }

    readonly id = 15487
}
