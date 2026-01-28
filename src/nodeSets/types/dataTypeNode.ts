// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * DataTypeNode
 */
export class DataTypeNode implements IIdentifiable {
    constructor(
        public IsAbstract: boolean,
        public DataTypeDefinition: ExtensionObject
    ) { }

    getId(): number { return 282; }
}
