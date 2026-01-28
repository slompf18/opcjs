// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * SessionlessInvokeResponseType
 */
export class SessionlessInvokeResponseType implements IIdentifiable {
    constructor(
        public NamespaceUris: string[],
        public ServerUris: string[],
        public ServiceId: UInt32
    ) { }

    getId(): number { return 20999; }
}
