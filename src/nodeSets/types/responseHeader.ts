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

    public static decode(reader: BufferReader): ResponseHeader {
        const obj = new ResponseHeader(
            reader.readDateTime(),
            reader.readUInt32(),
            reader.readStatusCode(),
            reader.readDiagnosticInfo(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDateTime(this.Timestamp);
        writer.writeUInt32(this.RequestHandle);
        writer.writeStatusCode(this.ServiceResult);
        this.ServiceDiagnostics.encode(writer);
        {
            const arr = this.StringTable ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        this.AdditionalHeader.encode(writer);
    }
}
