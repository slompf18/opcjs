// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { QualifiedName } from "../../types/qualifiedName";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.21
 */
export class KeyValuePair implements IEncodable {
    constructor(
        public Key: QualifiedName,
        public Value: Variant
    ) { }

    public static decode(reader: BufferReader): KeyValuePair {
        const obj = new KeyValuePair(
            reader.readQualifiedName(),
            reader.readVariant()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Key.encode(writer);
        this.Value.encode(writer);
    }
}
