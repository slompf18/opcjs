// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { AddNodesItem } from "./addNodesItem";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.2/#5.8.2.2
 */
export class AddNodesRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public NodesToAdd: AddNodesItem[]
    ) { }

    getId(): number { return 486; }
}
