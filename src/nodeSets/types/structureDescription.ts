// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    public static decode(reader: BufferReader): StructureDescription {
        const obj = new StructureDescription(
            StructureDefinition.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StructureDefinition.encode(writer);
    }
}
