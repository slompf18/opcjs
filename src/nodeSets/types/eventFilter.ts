// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { SimpleAttributeOperand } from "./simpleAttributeOperand";
import { ContentFilter } from "./contentFilter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.3
 */
export class EventFilter implements IIdentifiable {
    constructor(
        public SelectClauses: SimpleAttributeOperand[],
        public WhereClause: ContentFilter
    ) { }

    readonly id = 725
}
