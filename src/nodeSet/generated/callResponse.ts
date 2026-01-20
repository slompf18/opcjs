// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { CallMethodResult } from "./callMethodResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.12.2/#5.12.2.2
 */
export class CallResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: CallMethodResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    public static decode(reader: BufferReader): CallResponse {
        const obj = new CallResponse(
            ResponseHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = CallMethodResult.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        {
            const arr = this.Results ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.DiagnosticInfos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
