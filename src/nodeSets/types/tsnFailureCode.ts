// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.5
 */
export enum TsnFailureCodeEnum {
    NoFailure = 0,
    InsufficientBandwidth = 1,
    InsufficientResources = 2,
    InsufficientTrafficClassBandwidth = 3,
    StreamIdInUse = 4,
    StreamDestinationAddressInUse = 5,
    StreamPreemptedByHigherRank = 6,
    LatencyHasChanged = 7,
    EgressPortNotAvbCapable = 8,
    UseDifferentDestinationAddress = 9,
    OutOfMsrpResources = 10,
    OutOfMmrpResources = 11,
    CannotStoreDestinationAddress = 12,
    PriorityIsNotAnSrcClass = 13,
    MaxFrameSizeTooLarge = 14,
    MaxFanInPortsLimitReached = 15,
    FirstValueChangedForStreamId = 16,
    VlanBlockedOnEgress = 17,
    VlanTaggingDisabledOnEgress = 18,
    SrClassPriorityMismatch = 19,
    FeatureNotPropagated = 20,
    MaxLatencyExceeded = 21,
    BridgeDoesNotProvideNetworkId = 22,
    StreamTransformNotSupported = 23,
    StreamIdTypeNotSupported = 24,
    FeatureNotSupported = 25,
}

export namespace TsnFailureCodeEnum {
    export function decode(reader: BufferReader): TsnFailureCodeEnum {
        return reader.readInt32() as TsnFailureCodeEnum;
    }

    export function encode(writer: BufferWriter, value: TsnFailureCodeEnum): void {
        writer.writeInt32(value as any);
    }
}
