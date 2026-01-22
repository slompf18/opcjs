// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.4
 */
export class StandaloneSubscribedDataSetRefDataType implements IIdentifiable {
    constructor(
        public DataSetName: string | undefined
    ) { }

    readonly id = 23599
}
