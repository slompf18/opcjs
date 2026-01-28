// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { DeleteReferencesItem } from "./deleteReferencesItem";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.5/#5.8.5.1
 */
export class DeleteReferencesRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReferencesToDelete: DeleteReferencesItem[]
    ) { }

    getId(): number { return 504; }
}
