// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.1
 */
export class AdditionalParametersType implements IIdentifiable {
    constructor(
        public Parameters: KeyValuePair[]
    ) { }

    getId(): number { return 16313; }
}
