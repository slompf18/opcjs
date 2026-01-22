// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.5/#5.11.5.2
 */
export class HistoryUpdateRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public HistoryUpdateDetails: ExtensionObject[]
    ) { }

    readonly id = 698
}
