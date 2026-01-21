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

    readonly id = 18648

    public static decode(reader: BufferReader): SortRuleElement {
        const obj = new SortRuleElement(
            SortOrderTypeEnum.decode(reader),
            SimpleAttributeOperand.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        SortOrderTypeEnum.encode(writer, this.SortOrder);
        this.EventField.encode(writer);
    }
}
