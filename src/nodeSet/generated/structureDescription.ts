// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StructureDefinition } from "./structureDefinition";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.33
 */
export class StructureDescription implements IEncodable {
    constructor(
        public StructureDefinition: StructureDefinition
    ) { }

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
