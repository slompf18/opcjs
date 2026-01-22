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
        public NamespaceUris: string | undefined[],
        public ServerUris: string | undefined[],
        public LocaleIds: string | undefined[],
        public ServiceId: UInt32
    ) { }

    readonly id = 15901
}
