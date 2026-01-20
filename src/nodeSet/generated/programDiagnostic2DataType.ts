// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { DateTime } from "../../types/dateTime";
import { Argument } from "./argument";
import { Variant } from "../../types/variant";
import { StatusCode } from "../../types/statusCode";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part10/5.2.8
 */
export class ProgramDiagnostic2DataType implements IEncodable {
    constructor(
        public CreateSessionId: NodeId,
        public CreateClientName: string | undefined,
        public InvocationCreationTime: DateTime,
        public LastTransitionTime: DateTime,
        public LastMethodCall: string | undefined,
        public LastMethodSessionId: NodeId,
        public LastMethodInputArguments: Argument[],
        public LastMethodOutputArguments: Argument[],
        public LastMethodInputValues: Variant[],
        public LastMethodOutputValues: Variant[],
        public LastMethodCallTime: DateTime,
        public LastMethodReturnStatus: StatusCode
    ) { }

    public static decode(reader: BufferReader): ProgramDiagnostic2DataType {
        const obj = new ProgramDiagnostic2DataType(
            reader.readNodeId(),
            reader.readString(),
            DateTime.decode(reader),
            DateTime.decode(reader),
            reader.readString(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = Argument.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })(),
            DateTime.decode(reader),
            reader.readStatusCode()
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
        this.LastMethodCallTime.encode(writer);
        this.LastMethodReturnStatus.encode(writer);
    }
}
