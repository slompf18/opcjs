// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ContentFilterElement } from "./contentFilterElement";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.4
 */
export class ContentFilter implements IIdentifiable {
    constructor(
        public Elements: ContentFilterElement[]
    ) { }

    getId(): number { return 586; }
}
