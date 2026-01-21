// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.4
 */
export class StatusChangeNotification implements IIdentifiable {
    constructor(
        public Status: StatusCode,
        public DiagnosticInfo: DiagnosticInfo
    ) { }

    readonly id = 818

    public static decode(reader: BufferReader): StatusChangeNotification {
        const obj = new StatusChangeNotification(
            reader.readStatusCode(),
            reader.readDiagnosticInfo()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeStatusCode(this.Status);
        this.DiagnosticInfo.encode(writer);
    }
}
