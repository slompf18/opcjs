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
}
