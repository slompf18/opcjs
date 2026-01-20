// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.12.2/#5.12.2.2
 */
export class CallMethodResult implements IEncodable {
    constructor(
        public StatusCode: StatusCode,
        public InputArgumentResults: StatusCode[],
        public InputArgumentDiagnosticInfos: DiagnosticInfo[],
        public OutputArguments: Variant[]
    ) { }

    public static decode(reader: BufferReader): CallMethodResult {
        const obj = new CallMethodResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StatusCode.encode(writer);
        {
            const arr = this.InputArgumentResults ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.InputArgumentDiagnosticInfos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.OutputArguments ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
