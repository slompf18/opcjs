// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { FilterOperatorEnum } from "./filterOperator";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.1
 */
export class ContentFilterElement implements IIdentifiable {
    constructor(
        public FilterOperator: FilterOperatorEnum,
        public FilterOperands: ExtensionObject[]
    ) { }

    getId(): number { return 583; }
}
