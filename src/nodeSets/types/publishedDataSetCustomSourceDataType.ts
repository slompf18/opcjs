// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.9.2
 */
export class PublishedDataSetCustomSourceDataType implements IIdentifiable {
    constructor(
        public CyclicDataSet: boolean
    ) { }

    getId(): number { return 25269; }
}
