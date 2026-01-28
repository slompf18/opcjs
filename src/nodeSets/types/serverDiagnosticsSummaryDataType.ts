// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.9
 */
export class ServerDiagnosticsSummaryDataType implements IIdentifiable {
    constructor(
        public ServerViewCount: UInt32,
        public CurrentSessionCount: UInt32,
        public CumulatedSessionCount: UInt32,
        public SecurityRejectedSessionCount: UInt32,
        public RejectedSessionCount: UInt32,
        public SessionTimeoutCount: UInt32,
        public SessionAbortCount: UInt32,
        public CurrentSubscriptionCount: UInt32,
        public CumulatedSubscriptionCount: UInt32,
        public PublishingIntervalCount: UInt32,
        public SecurityRejectedRequestsCount: UInt32,
        public RejectedRequestsCount: UInt32
    ) { }

    getId(): number { return 859; }
}
