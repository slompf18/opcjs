// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * SessionlessInvokeRequestType
 */
export class SessionlessInvokeRequestType implements IIdentifiable {
    constructor(
        public UrisVersion: UInt32,
        public NamespaceUris: string[],
        public ServerUris: string[],
        public LocaleIds: string[],
        public ServiceId: UInt32
    ) { }

    getId(): number { return 15901; }
}
