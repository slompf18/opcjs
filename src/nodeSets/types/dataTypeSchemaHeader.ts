// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StructureDescription } from "./structureDescription";
import { EnumDescription } from "./enumDescription";
import { SimpleTypeDescription } from "./simpleTypeDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.31
 */
export class DataTypeSchemaHeader implements IIdentifiable {
    constructor(
        public Namespaces: string | undefined[],
        public StructureDataTypes: StructureDescription[],
        public EnumDataTypes: EnumDescription[],
        public SimpleDataTypes: SimpleTypeDescription[]
    ) { }

    readonly id = 15534
}
