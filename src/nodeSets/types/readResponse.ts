// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { DataValue } from "../../types/dataValue";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.2/#5.11.2.2
 */
export class ReadResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: DataValue[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 632
}
