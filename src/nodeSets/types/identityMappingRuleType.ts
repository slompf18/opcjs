// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IdentityCriteriaTypeEnum } from "./identityCriteriaType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/4.4.3
 */
export class IdentityMappingRuleType implements IIdentifiable {
    constructor(
        public CriteriaType: IdentityCriteriaTypeEnum,
        public Criteria: string | undefined
    ) { }

    readonly id = 15634

    public static decode(reader: BufferReader): IdentityMappingRuleType {
        const obj = new IdentityMappingRuleType(
            IdentityCriteriaTypeEnum.decode(reader),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        IdentityCriteriaTypeEnum.encode(writer, this.CriteriaType);
        writer.writeString(this.Criteria);
    }
}
