// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { SortOrderTypeEnum } from "./sortOrderType";
import { SimpleAttributeOperand } from "./simpleAttributeOperand";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.7
 */
export class SortRuleElement implements IEncodable {
    constructor(
        public SortOrder: SortOrderTypeEnum,
        public EventField: SimpleAttributeOperand
    ) { }

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
