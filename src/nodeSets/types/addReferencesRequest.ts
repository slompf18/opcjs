// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { AddReferencesItem } from "./addReferencesItem";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.3/#5.8.3.2
 */
export class AddReferencesRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReferencesToAdd: AddReferencesItem[]
    ) { }

    getId(): number { return 492; }
}
