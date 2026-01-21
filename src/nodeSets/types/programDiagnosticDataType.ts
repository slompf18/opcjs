// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Argument } from "./argument";
import { StatusResult } from "./statusResult";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ProgramDiagnosticDataType
 */
export class ProgramDiagnosticDataType implements IIdentifiable {
    constructor(
        public CreateSessionId: NodeId,
        public CreateClientName: string | undefined,
        public InvocationCreationTime: Date,
        public LastTransitionTime: Date,
        public LastMethodCall: string | undefined,
        public LastMethodSessionId: NodeId,
        public LastMethodInputArguments: Argument[],
        public LastMethodOutputArguments: Argument[],
        public LastMethodCallTime: Date,
        public LastMethodReturnStatus: StatusResult
    ) { }

    readonly id = 894

    public static decode(reader: BufferReader): ProgramDiagnosticDataType {
        const obj = new ProgramDiagnosticDataType(
            reader.readNodeId(),
            reader.readString(),
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readString(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            reader.readDateTime(),
            StatusResult.decode(reader)
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
        writer.writeDateTime(this.LastMethodCallTime);
        this.LastMethodReturnStatus.encode(writer);
    }
}
