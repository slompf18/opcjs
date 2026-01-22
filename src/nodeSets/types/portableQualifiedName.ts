// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.37
 */
export class PortableQualifiedName implements IIdentifiable {
    constructor(
        public NamespaceUri: string | undefined,
        public Name: string | undefined
    ) { }

    readonly id = 24105
}
