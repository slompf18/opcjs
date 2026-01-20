// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.14
 */
export class StatusResult implements IEncodable {
    constructor(
        public StatusCode: StatusCode,
        public DiagnosticInfo: DiagnosticInfo
    ) { }

    public static decode(reader: BufferReader): StatusResult {
        const obj = new StatusResult(
            reader.readStatusCode(),
            reader.readDiagnosticInfo()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StatusCode.encode(writer);
        this.DiagnosticInfo.encode(writer);
    }
}
