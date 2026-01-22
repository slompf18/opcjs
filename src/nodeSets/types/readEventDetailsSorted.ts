// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { SortRuleElement } from "./sortRuleElement";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.2/#6.5.2.5
 */
export class ReadEventDetailsSorted implements IIdentifiable {
    constructor(
        public SortClause: SortRuleElement[]
    ) { }

    readonly id = 18649
}
