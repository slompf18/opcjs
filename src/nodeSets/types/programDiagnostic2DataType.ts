// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Argument } from "./argument";
import { Variant } from "../../types/variant";
import { StatusCode } from "../../types/statusCode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part10/5.2.8
 */
export class ProgramDiagnostic2DataType implements IIdentifiable {
    constructor(
        public CreateSessionId: NodeId,
        public CreateClientName: string | undefined,
        public InvocationCreationTime: Date,
        public LastTransitionTime: Date,
        public LastMethodCall: string | undefined,
        public LastMethodSessionId: NodeId,
        public LastMethodInputArguments: Argument[],
        public LastMethodOutputArguments: Argument[],
        public LastMethodInputValues: Variant[],
        public LastMethodOutputValues: Variant[],
        public LastMethodCallTime: Date,
        public LastMethodReturnStatus: StatusCode
    ) { }

    readonly id = 24033

    public static decode(reader: BufferReader): ProgramDiagnostic2DataType {
        const obj = new ProgramDiagnostic2DataType(
            reader.readNodeId(),
            reader.readString(),
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readString(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })(),
            reader.readDateTime(),
            reader.readStatusCode()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.CreateSessionId.encode(writer);
        writer.writeString(this.CreateClientName);
        writer.writeDateTime(this.InvocationCreationTime);
        writer.writeDateTime(this.LastTransitionTime);
        writer.writeString(this.LastMethodCall);
        this.LastMethodSessionId.encode(writer);
        {
            const arr = this.LastMethodInputArguments ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.LastMethodOutputArguments ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.LastMethodInputValues ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.LastMethodOutputValues ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeDateTime(this.LastMethodCallTime);
        writer.writeStatusCode(this.LastMethodReturnStatus);
    }
}
