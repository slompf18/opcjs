// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.34
 */
export class ServiceFault implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader
    ) { }

    getId(): number { return 395; }
}
