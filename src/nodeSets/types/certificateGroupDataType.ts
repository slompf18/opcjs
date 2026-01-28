// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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

    getId(): number { return 15436; }
}
