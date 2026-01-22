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
}
