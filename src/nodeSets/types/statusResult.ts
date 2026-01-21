// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.14
 */
export class StatusResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public DiagnosticInfo: DiagnosticInfo
    ) { }

    readonly id = 299

    public static decode(reader: BufferReader): StatusResult {
        const obj = new StatusResult(
            reader.readStatusCode(),
            reader.readDiagnosticInfo()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeStatusCode(this.StatusCode);
        this.DiagnosticInfo.encode(writer);
    }
}
