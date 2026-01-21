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

    readonly id = 15488

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
