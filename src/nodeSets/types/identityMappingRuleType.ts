// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
}
