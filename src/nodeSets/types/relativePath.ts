// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RelativePathElement } from "./relativePathElement";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.30
 */
export class RelativePath implements IIdentifiable {
    constructor(
        public Elements: RelativePathElement[]
    ) { }

    readonly id = 540
}
