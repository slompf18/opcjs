// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { TrustListValidationOptionsEnum } from "./trustListValidationOptions";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.3/#7.8.3.4
 */
export class CertificateGroupDataType implements IIdentifiable {
    constructor(
        public Purpose: NodeId,
        public CertificateTypes: NodeId[],
        public IsCertificateAssigned: boolean[],
        public ValidationOptions: TrustListValidationOptionsEnum
    ) { }

    readonly id = 15436

    public static decode(reader: BufferReader): CertificateGroupDataType {
        const obj = new CertificateGroupDataType(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readBoolean(); } return arr; })(),
            TrustListValidationOptionsEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Purpose.encode(writer);
        {
            const arr = this.CertificateTypes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.IsCertificateAssigned ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeBoolean(v);
            }
        };
        TrustListValidationOptionsEnum.encode(writer, this.ValidationOptions);
    }
}
