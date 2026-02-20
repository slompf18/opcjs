/**
 * @fileoverview StatusCode type definition and encoder/decoder
 * @module codec/complex/statuscode
 * 
 * StatusCode represents a 32-bit status/error code with severity and subcodes.
 * 
 * @see OPC 10000-6 Section 5.2.2.16 - StatusCode
 * @see OPC 10000-4 Section 7.39 - StatusCode
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { CodecError } from '../errors.js';
import { StatusCode } from '../../types/src/index.js';

// Re-export for backward compatibility
export { StatusCode };

/**
 * StatusCode severity enum using extracted 2-bit values (0, 1, 2)
 * as returned by getSeverity() method.
 * 
 * Note: This differs from types/StatusCodeSeverity which uses bit shift values (0x00, 0x40, 0x80).
 */
export const enum StatusCodeSeverity {
  Good = 0x00,      // 00 in bits 30-31 (extracted value: 0)
  Uncertain = 0x01, // 01 in bits 30-31 (extracted value: 1)
  Bad = 0x02        // 10 in bits 30-31 (extracted value: 2)
}

/**
 * StatusCode bit field structure per OPC 10000-4 Section 7.39:
 * - Bits 0-15: Code (16 bits)
 * - Bits 16-29: SubCode/Additional Info (14 bits)
 * - Bit 30: Uncertain flag (when set with bit 31 clear)
 * - Bit 31: Bad flag (when set)
 * 
 * Severity encoding (bits 30-31):
 * - 00 (0x00) = Good (operation succeeded)
 * - 01 (0x01) = Uncertain (operation uncertain, bit 30 set)
 * - 10 (0x02) = Bad (operation failed, bit 31 set)
 * - 11 (0x03) = Bad (both bits set, also Bad)
 * 
 * Note: Some references mention "StructureChanged" and "SemanticsChanged" flags,
 * but in practice, the standard uses bits 30-31 for severity encoding only.
 * 
 * NOTE: StatusCodeSeverity enum is imported from types package.
 */

/**
 * Well-known StatusCode values from OPC 10000-4 Annex A
 */
export const StatusCodes = {
  Good: 0x00000000,
  BadUnexpectedError: 0x80010000,
  BadInternalError: 0x80020000,
  BadOutOfMemory: 0x80030000,
  BadResourceUnavailable: 0x80040000,
  BadCommunicationError: 0x80050000,
  BadEncodingError: 0x80060000,
  BadDecodingError: 0x80070000,
  BadEncodingLimitsExceeded: 0x80080000,
  BadRequestTooLarge: 0x806B0000,
  BadResponseTooLarge: 0x806C0000,
  BadUnknownResponse: 0x806D0000,
  BadTimeout: 0x800A0000,
  BadServiceUnsupported: 0x800B0000,
  BadShutdown: 0x800C0000,
  BadServerNotConnected: 0x800D0000,
  BadServerHalted: 0x800E0000,
  BadNothingToDo: 0x800F0000,
  BadTooManyOperations: 0x80100000,
  BadTooManyMonitoredItems: 0x80DB0000,
  BadDataTypeIdUnknown: 0x80110000,
  BadCertificateInvalid: 0x80120000,
  BadSecurityChecksFailed: 0x80130000,
  BadCertificateTimeInvalid: 0x80140000,
  BadCertificateIssuerTimeInvalid: 0x80150000,
  BadCertificateHostNameInvalid: 0x80160000,
  BadCertificateUriInvalid: 0x80170000,
  BadCertificateUseNotAllowed: 0x80180000,
  BadCertificateIssuerUseNotAllowed: 0x80190000,
  BadCertificateUntrusted: 0x801A0000,
  BadCertificateRevocationUnknown: 0x801B0000,
  BadCertificateIssuerRevocationUnknown: 0x801C0000,
  BadCertificateRevoked: 0x801D0000,
  BadCertificateIssuerRevoked: 0x801E0000,
  BadCertificateChainIncomplete: 0x810D0000,
  BadUserAccessDenied: 0x801F0000,
  BadIdentityTokenInvalid: 0x80200000,
  BadIdentityTokenRejected: 0x80210000,
  BadSecureChannelIdInvalid: 0x80220000,
  BadInvalidTimestamp: 0x80230000,
  BadNonceInvalid: 0x80240000,
  BadSessionIdInvalid: 0x80250000,
  BadSessionClosed: 0x80260000,
  BadSessionNotActivated: 0x80270000,
  BadSubscriptionIdInvalid: 0x80280000,
  BadRequestHeaderInvalid: 0x802A0000,
  BadTimestampsToReturnInvalid: 0x802B0000,
  BadRequestCancelledByClient: 0x802C0000,
  BadTooManyArguments: 0x80E50000,
  GoodSubscriptionTransferred: 0x002D0000,
  GoodCompletesAsynchronously: 0x002E0000,
  GoodOverload: 0x002F0000,
  GoodClamped: 0x00300000,
  BadNoCommunication: 0x80310000,
  BadWaitingForInitialData: 0x80320000,
  BadNodeIdInvalid: 0x80330000,
  BadNodeIdUnknown: 0x80340000,
  BadAttributeIdInvalid: 0x80350000,
  BadIndexRangeInvalid: 0x80360000,
  BadIndexRangeNoData: 0x80370000,
  BadDataEncodingInvalid: 0x80380000,
  BadDataEncodingUnsupported: 0x80390000,
  BadNotReadable: 0x803A0000,
  BadNotWritable: 0x803B0000,
  BadOutOfRange: 0x803C0000,
  BadNotSupported: 0x803D0000,
  BadNotFound: 0x803E0000,
  BadObjectDeleted: 0x803F0000,
  BadNotImplemented: 0x80400000,
  BadMonitoringModeInvalid: 0x80410000,
  BadMonitoredItemIdInvalid: 0x80420000,
  BadMonitoredItemFilterInvalid: 0x80430000,
  BadMonitoredItemFilterUnsupported: 0x80440000,
  BadFilterNotAllowed: 0x80450000,
  BadStructureMissing: 0x80460000,
  BadEventFilterInvalid: 0x80470000,
  BadContentFilterInvalid: 0x80480000,
  BadFilterOperatorInvalid: 0x80C10000,
  BadFilterOperatorUnsupported: 0x80C20000,
  BadFilterOperandCountMismatch: 0x80C30000,
  BadFilterOperandInvalid: 0x80490000,
  BadFilterElementInvalid: 0x80C40000,
  BadFilterLiteralInvalid: 0x80C50000,
  BadContinuationPointInvalid: 0x804A0000,
  BadNoContinuationPoints: 0x804B0000,
  BadReferenceTypeIdInvalid: 0x804C0000,
  BadBrowseDirectionInvalid: 0x804D0000,
  BadNodeNotInView: 0x804E0000,
  BadServerUriInvalid: 0x804F0000,
  BadServerNameMissing: 0x80500000,
  BadDiscoveryUrlMissing: 0x80510000,
  BadSempahoreFileMissing: 0x80520000,
  BadRequestTypeInvalid: 0x80530000,
  BadSecurityModeRejected: 0x80540000,
  BadSecurityPolicyRejected: 0x80550000,
  BadTooManySessions: 0x80560000,
  BadUserSignatureInvalid: 0x80570000,
  BadApplicationSignatureInvalid: 0x80580000,
  BadNoValidCertificates: 0x80590000,
  BadIdentityChangeNotSupported: 0x80C60000,
  BadRequestCancelledByRequest: 0x805A0000,
  BadParentNodeIdInvalid: 0x805B0000,
  BadReferenceNotAllowed: 0x805C0000,
  BadNodeIdRejected: 0x805D0000,
  BadNodeIdExists: 0x805E0000,
  BadNodeClassInvalid: 0x805F0000,
  BadBrowseNameInvalid: 0x80600000,
  BadBrowseNameDuplicated: 0x80610000,
  BadNodeAttributesInvalid: 0x80620000,
  BadTypeDefinitionInvalid: 0x80630000,
  BadSourceNodeIdInvalid: 0x80640000,
  BadTargetNodeIdInvalid: 0x80650000,
  BadDuplicateReferenceNotAllowed: 0x80660000,
  BadInvalidSelfReference: 0x80670000,
  BadReferenceLocalOnly: 0x80680000,
  BadNoDeleteRights: 0x80690000,
  UncertainReferenceNotDeleted: 0x40BC0000,
  BadServerIndexInvalid: 0x806A0000,
  BadViewIdUnknown: 0x806E0000,
  BadViewTimestampInvalid: 0x80C90000,
  BadViewParameterMismatch: 0x80CA0000,
  BadViewVersionInvalid: 0x80CB0000,
  UncertainNotAllNodesAvailable: 0x40C00000,
  GoodResultsMayBeIncomplete: 0x00BA0000,
  BadNotTypeDefinition: 0x80C80000,
  UncertainReferenceOutOfServer: 0x406C0000,
  BadTooManyMatches: 0x806D0000,
  BadQueryTooComplex: 0x806F0000,
  BadNoMatch: 0x80700000,
  BadMaxAgeInvalid: 0x80710000,
  BadSecurityModeInsufficient: 0x80E60000,
  BadHistoryOperationInvalid: 0x80720000,
  BadHistoryOperationUnsupported: 0x80730000,
  BadInvalidTimestampArgument: 0x80BD0000,
  BadWriteNotSupported: 0x80730000,
  BadTypeMismatch: 0x80740000,
  BadMethodInvalid: 0x80750000,
  BadArgumentsMissing: 0x80760000,
  BadTooManySubscriptions: 0x80770000,
  BadTooManyPublishRequests: 0x80780000,
  BadNoSubscription: 0x80790000,
  BadSequenceNumberUnknown: 0x807A0000,
  BadMessageNotAvailable: 0x807B0000,
  BadInsufficientClientProfile: 0x807C0000,
  BadStateNotActive: 0x80BF0000,
  BadTcpServerTooBusy: 0x807D0000,
  BadTcpMessageTypeInvalid: 0x807E0000,
  BadTcpSecureChannelUnknown: 0x807F0000,
  BadTcpMessageTooLarge: 0x80800000,
  BadTcpNotEnoughResources: 0x80810000,
  BadTcpInternalError: 0x80820000,
  BadTcpEndpointUrlInvalid: 0x80830000,
  BadRequestInterrupted: 0x80840000,
  BadRequestTimeout: 0x80850000,
  BadSecureChannelClosed: 0x80860000,
  BadSecureChannelTokenUnknown: 0x80870000,
  BadSequenceNumberInvalid: 0x80880000,
  BadProtocolVersionUnsupported: 0x80BE0000,
  BadConfigurationError: 0x80890000,
  BadNotConnected: 0x808A0000,
  BadDeviceFailure: 0x808B0000,
  BadSensorFailure: 0x808C0000,
  BadOutOfService: 0x808D0000,
  BadDeadbandFilterInvalid: 0x808E0000,
  UncertainNoCommunicationLastUsableValue: 0x408F0000,
  UncertainLastUsableValue: 0x40900000,
  UncertainSubstituteValue: 0x40910000,
  UncertainInitialValue: 0x40920000,
  UncertainSensorNotAccurate: 0x40930000,
  UncertainEngineeringUnitsExceeded: 0x40940000,
  UncertainSubNormal: 0x40950000,
  GoodLocalOverride: 0x00960000,
  BadRefreshInProgress: 0x80970000,
  BadConditionAlreadyDisabled: 0x80980000,
  BadConditionAlreadyEnabled: 0x80CC0000,
  BadConditionDisabled: 0x80990000,
  BadEventIdUnknown: 0x809A0000,
  BadEventNotAcknowledgeable: 0x80BB0000,
  BadDialogNotActive: 0x80CD0000,
  BadDialogResponseInvalid: 0x80CE0000,
  BadConditionBranchAlreadyAcked: 0x80CF0000,
  BadConditionBranchAlreadyConfirmed: 0x80D00000,
  BadConditionAlreadyShelved: 0x80D10000,
  BadConditionNotShelved: 0x80D20000,
  BadShelvingTimeOutOfRange: 0x80D30000,
  BadNoData: 0x809B0000,
  BadBoundNotFound: 0x80D70000,
  BadBoundNotSupported: 0x80D80000,
  BadDataLost: 0x809D0000,
  BadDataUnavailable: 0x809E0000,
  BadEntryExists: 0x809F0000,
  BadNoEntryExists: 0x80A00000,
  BadTimestampNotSupported: 0x80A10000,
  GoodEntryInserted: 0x00A20000,
  GoodEntryReplaced: 0x00A30000,
  UncertainDataSubNormal: 0x40A40000,
  GoodNoData: 0x00A50000,
  GoodMoreData: 0x00A60000,
  BadAggregateListMismatch: 0x80D40000,
  BadAggregateNotSupported: 0x80D50000,
  BadAggregateInvalidInputs: 0x80D60000,
  BadAggregateConfigurationRejected: 0x80DA0000,
  GoodDataIgnored: 0x00D90000,
  BadRequestNotAllowed: 0x80E40000,
  GoodEdited: 0x00DC0000,
  GoodPostActionFailed: 0x00DD0000,
  UncertainDominantValueChanged: 0x40DE0000,
  GoodDependentValueChanged: 0x00E00000,
  BadDominantValueChanged: 0x80E10000,
  UncertainDependentValueChanged: 0x40E20000,
  BadDependentValueChanged: 0x80E30000,
  GoodCommunicationEvent: 0x00A70000,
  GoodShutdownEvent: 0x00A80000,
  GoodCallAgain: 0x00A90000,
  GoodNonCriticalTimeout: 0x00AA0000,
  BadInvalidArgument: 0x80AB0000,
  BadConnectionRejected: 0x80AC0000,
  BadDisconnect: 0x80AD0000,
  BadConnectionClosed: 0x80AE0000,
  BadInvalidState: 0x80AF0000,
  BadEndOfStream: 0x80B00000,
  BadNoDataAvailable: 0x80B10000,
  BadWaitingForResponse: 0x80B20000,
  BadOperationAbandoned: 0x80B30000,
  BadExpectedStreamToBlock: 0x80B40000,
  BadWouldBlock: 0x80B50000,
  BadSyntaxError: 0x80B60000,
  BadMaxConnectionsReached: 0x80B70000,
} as const;

/**
 * NOTE: StatusCode class is imported from types package.
 * Use getValue() to access the numeric value.
 */

/**
 * Extract severity from status code (bits 30-31).
 * Per OPC 10000-4 Section 7.39:
 * - Bit 31 set = Bad
 * - Bit 30 set = Uncertain  
 * - Both clear = Good
 * 
 * @param statusCode The status code
 * @returns Severity value (Good=0x00, Uncertain=0x01, Bad=0x02)
 */
export function getSeverity(statusCode: StatusCode): number {
  return statusCode.getSeverity();
}

/**
 * Check if status code indicates success (Good severity).
 * Good = bits 30-31 both clear.
 * @param statusCode The status code
 * @returns true if severity is Good
 */
export function isGood(statusCode: StatusCode): boolean {
  return statusCode.isGood();
}

/**
 * Check if status code indicates uncertainty.
 * Uncertain = bit 30 set, bit 31 clear.
 * @param statusCode The status code
 * @returns true if severity is Uncertain
 */
export function isUncertain(statusCode: StatusCode): boolean {
  return statusCode.isUncertain();
}

/**
 * Check if status code indicates failure (Bad severity).
 * Bad = bit 31 set.
 * @param statusCode The status code
 * @returns true if severity is Bad
 */
export function isBad(statusCode: StatusCode): boolean {
  return statusCode.isBad();
}

/**
 * Get the 16-bit code from status code (bits 0-15).
 * @param statusCode The status code
 * @returns The code value
 */
export function getCode(statusCode: StatusCode): number {
  return statusCode.getValue() & 0xFFFF;
}

/**
 * Get the 14-bit subcode/additional info from status code (bits 16-29).
 * @param statusCode The status code
 * @returns The subcode/additional info value
 */
export function getSubCode(statusCode: StatusCode): number {
  return (statusCode.getValue() >>> 16) & 0x3FFF;
}

/**
 * Create a StatusCode from a numeric value.
 * @param code The 32-bit status code value
 * @returns StatusCode instance
 */
export function statusCode(code: number): StatusCode {
  if (code < 0 || code > 0xFFFFFFFF) {
    throw new CodecError(`StatusCode value ${code} out of range [0, ${0xFFFFFFFF}]`);
  }
  return new StatusCode(code);
}

/**
 * Encode a StatusCode in Binary format.
 * Format: UInt32 (4 bytes, little-endian)
 * 
 * @param encoder The binary encoder
 * @param value The StatusCode to encode
 * 
 * @see OPC 10000-6 Section 5.2.2.16 - StatusCode
 */
export function encodeBinary(encoder: IEncoder, value: StatusCode): void {
  encoder.writeUInt32(value.getValue());
}

/**
 * Decode a StatusCode from Binary format.
 * 
 * @param decoder The binary decoder
 * @returns The decoded StatusCode
 * 
 * @see OPC 10000-6 Section 5.2.2.16 - StatusCode
 */
export function decodeBinary(decoder: IDecoder): StatusCode {
  const code = decoder.readUInt32();
  return new StatusCode(code);
}

/**
 * Register StatusCode type with CodecFacade.
 */
export function registerStatusCode(facade: CodecFacade): void {
  facade.registerType('StatusCode', 'i=19', EncodingFormat.Binary, encodeBinary, decodeBinary);
}
