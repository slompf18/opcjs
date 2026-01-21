// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { StructureTypeEnum } from "./structureType";
import { StructureField } from "./structureField";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.5
 */
export class StructureDefinition implements IIdentifiable {
    constructor(
        public DefaultEncodingId: NodeId,
        public BaseDataType: NodeId,
        public StructureType: StructureTypeEnum,
        public Fields: StructureField[]
    ) { }

    readonly id = 99

    public static decode(reader: BufferReader): StructureDefinition {
        const obj = new StructureDefinition(
            reader.readNodeId(),
            reader.readNodeId(),
            StructureTypeEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = StructureField.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.DefaultEncodingId.encode(writer);
        this.BaseDataType.encode(writer);
        StructureTypeEnum.encode(writer, this.StructureType);
        {
            const arr = this.Fields ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
