// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ContentFilterElementResult } from "./contentFilterElementResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.2
 */
export class ContentFilterResult implements IEncodable {
    constructor(
        public ElementResults: ContentFilterElementResult[],
        public ElementDiagnosticInfos: DiagnosticInfo[]
    ) { }

    public static decode(reader: BufferReader): ContentFilterResult {
        const obj = new ContentFilterResult(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ContentFilterElementResult.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.ElementResults ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.ElementDiagnosticInfos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
