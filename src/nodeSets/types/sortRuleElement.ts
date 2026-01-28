// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { SortOrderTypeEnum } from "./sortOrderType";
import { SimpleAttributeOperand } from "./simpleAttributeOperand";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.7
 */
export class SortRuleElement implements IIdentifiable {
    constructor(
        public SortOrder: SortOrderTypeEnum,
        public EventField: SimpleAttributeOperand
    ) { }

    getId(): number { return 18648; }
}
