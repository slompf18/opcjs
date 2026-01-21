// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { DateTime } from "../../types/dateTime";
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
        public InvocationCreationTime: DateTime,
        public LastTransitionTime: DateTime,
        public LastMethodCall: string | undefined,
        public LastMethodSessionId: NodeId,
        public LastMethodInputArguments: Argument[],
        public LastMethodOutputArguments: Argument[],
        public LastMethodCallTime: DateTime,
        public LastMethodReturnStatus: StatusResult
    ) { }

    readonly id = 894

    public static decode(reader: BufferReader): ProgramDiagnosticDataType {
        const obj = new ProgramDiagnosticDataType(
            reader.readNodeId(),
            reader.readString(),
            DateTime.decode(reader),
            DateTime.decode(reader),
            reader.readString(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            DateTime.decode(reader),
            StatusResult.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.CreateSessionId.encode(writer);
        writer.writeString(this.CreateClientName);
        this.InvocationCreationTime.encode(writer);
        this.LastTransitionTime.encode(writer);
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
        this.LastMethodCallTime.encode(writer);
        this.LastMethodReturnStatus.encode(writer);
    }
}
