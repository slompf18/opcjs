// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { EnumDefinition } from "./enumDefinition";
import { UInt8 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.34
 */
export class EnumDescription implements IEncodable {
    constructor(
        public EnumDefinition: EnumDefinition,
        public BuiltInType: UInt8
    ) { }

    public static decode(reader: BufferReader): EnumDescription {
        const obj = new EnumDescription(
            EnumDefinition.decode(reader),
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.EnumDefinition.encode(writer);
        writer.writeUint8(this.BuiltInType);
    }
}
