// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.1
 */
export class NodeAttributes implements IIdentifiable {
    constructor(
        public SpecifiedAttributes: UInt32,
        public DisplayName: LocalizedText,
        public Description: LocalizedText,
        public WriteMask: UInt32,
        public UserWriteMask: UInt32
    ) { }

    readonly id = 349
}
