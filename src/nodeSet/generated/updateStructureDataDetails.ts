// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { PerformUpdateTypeEnum } from "./performUpdateType";
import { DataValue } from "../../types/dataValue";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.3/#6.9.3.1
 */
export class UpdateStructureDataDetails implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public PerformInsertReplace: PerformUpdateTypeEnum,
        public UpdateValues: DataValue[]
    ) { }

    public static decode(reader: BufferReader): UpdateStructureDataDetails {
        const obj = new UpdateStructureDataDetails(
            reader.readNodeId(),
            PerformUpdateTypeEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDataValue(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        PerformUpdateTypeEnum.encode(writer, this.PerformInsertReplace);
        {
            const arr = this.UpdateValues ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
