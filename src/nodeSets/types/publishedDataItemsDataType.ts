// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { PublishedVariableDataType } from "./publishedVariableDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.7.2
 */
export class PublishedDataItemsDataType implements IIdentifiable {
    constructor(
        public PublishedData: PublishedVariableDataType[]
    ) { }

    getId(): number { return 15581; }
}
