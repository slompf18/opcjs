// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { DeleteNodesItem } from "./deleteNodesItem";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.4/#5.8.4.2
 */
export class DeleteNodesRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public NodesToDelete: DeleteNodesItem[]
    ) { }

    getId(): number { return 498; }
}
