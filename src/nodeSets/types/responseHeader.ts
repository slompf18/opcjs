// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.33
 */
export class ResponseHeader implements IIdentifiable {
    constructor(
        public Timestamp: Date,
        public RequestHandle: UInt32,
        public ServiceResult: StatusCode,
        public ServiceDiagnostics: DiagnosticInfo,
        public StringTable: string | undefined[],
        public AdditionalHeader: ExtensionObject
    ) { }

    readonly id = 392
}
