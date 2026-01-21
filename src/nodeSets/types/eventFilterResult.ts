// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { ContentFilterResult } from "./contentFilterResult";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.3
 */
export class EventFilterResult implements IIdentifiable {
    constructor(
        public SelectClauseResults: StatusCode[],
        public SelectClauseDiagnosticInfos: DiagnosticInfo[],
        public WhereClauseResult: ContentFilterResult
    ) { }

    readonly id = 734

    public static decode(reader: BufferReader): EventFilterResult {
        const obj = new EventFilterResult(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })(),
            ContentFilterResult.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.SelectClauseResults ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.SelectClauseDiagnosticInfos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.WhereClauseResult.encode(writer);
    }
}
