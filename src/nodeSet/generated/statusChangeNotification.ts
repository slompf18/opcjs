// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.4
 */
export class StatusChangeNotification implements IEncodable {
    constructor(
        public Status: StatusCode,
        public DiagnosticInfo: DiagnosticInfo
    ) { }

    public static decode(reader: BufferReader): StatusChangeNotification {
        const obj = new StatusChangeNotification(
            reader.readStatusCode(),
            reader.readDiagnosticInfo()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Status.encode(writer);
        this.DiagnosticInfo.encode(writer);
    }
}
