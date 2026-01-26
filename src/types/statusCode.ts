export enum StatusCode {
  OK = 0x0,
  Uncertain = 0x40000000,
  Bad = 0x80000000,
  BadUnexpectedError = 0x80010000,
  BadInternalError = 0x80020000,
  BadOutOfMemory = 0x80030000,
  BadResourceUnavailable = 0x80040000,
  BadCommunicationError = 0x80050000,
  BadEncodingError = 0x80060000,
  BadDecodingError = 0x80070000,
  BadEncodingLimitsExceeded = 0x80080000,
  BadRequestTooLarge = 0x80b80000,
  BadResponseTooLarge = 0x80b90000,
  BadUnknownResponse = 0x80090000,
  BadTimeout = 0x800a0000,
  BadServiceUnsupported = 0x800b0000,
  BadShutdown = 0x800c0000,
  BadServerNotConnected = 0x800d0000,
  BadServerHalted = 0x800e0000,
  BadNothingToDo = 0x800f0000,
  BadTooManyOperations = 0x80100000,
  BadTooManyMonitoredItems = 0x80db0000,
  BadDataTypeIdUnknown = 0x80110000,
  BadCertificateInvalid = 0x80120000,
  BadSecurityChecksFailed = 0x80130000,
  BadCertificatePolicyCheckFailed = 0x81140000,
  BadCertificateTimeInvalid = 0x80140000,
  BadCertificateIssuerTimeInvalid = 0x80150000,
  BadCertificateHostNameInvalid = 0x80160000,
  BadCertificateUriInvalid = 0x80170000,
  BadCertificateUseNotAllowed = 0x80180000,
  BadCertificateIssuerUseNotAllowed = 0x80190000,
  BadCertificateUntrusted = 0x801a0000,
  BadCertificateRevocationUnknown = 0x801b0000,
  BadCertificateIssuerRevocationUnknown = 0x801c0000,
  BadCertificateRevoked = 0x801d0000,
  BadCertificateIssuerRevoked = 0x801e0000,
  BadCertificateChainIncomplete = 0x810d0000,
  BadUserAccessDenied = 0x801f0000,
  BadIdentityTokenInvalid = 0x80200000,
  BadIdentityTokenRejected = 0x80210000,
  BadSecureChannelIdInvalid = 0x80220000,
  BadInvalidTimestamp = 0x80230000,
  BadNonceInvalid = 0x80240000,
  BadSessionIdInvalid = 0x80250000,
  BadSessionClosed = 0x80260000,
  BadSessionNotActivated = 0x80270000,
  BadSubscriptionIdInvalid = 0x80280000,
  BadRequestHeaderInvalid = 0x802a0000,
  BadTimestampsToReturnInvalid = 0x802b0000,
  BadRequestCancelledByClient = 0x802c0000,
  BadTooManyArguments = 0x80e50000,
  BadLicenseExpired = 0x810e0000,
  BadLicenseLimitsExceeded = 0x810f0000,
  BadLicenseNotAvailable = 0x81100000,
  GoodSubscriptionTransferred = 0x002d0000,
  GoodCompletesAsynchronously = 0x002e0000,
  GoodOverload = 0x002f0000,
  GoodClamped = 0x00300000,
  BadNoCommunication = 0x80310000,
  BadWaitingForInitialData = 0x80320000,
  BadNodeIdInvalid = 0x80330000,
  BadNodeIdUnknown = 0x80340000,
  BadAttributeIdInvalid = 0x80350000,
  BadIndexRangeInvalid = 0x80360000,
  BadIndexRangeNoData = 0x80370000,
  BadDataEncodingInvalid = 0x80380000,
  BadDataEncodingUnsupported = 0x80390000,
  BadNotReadable = 0x803a0000,
  BadNotWritable = 0x803b0000,
  BadOutOfRange = 0x803c0000,
  BadNotSupported = 0x803d0000,
  BadNotFound = 0x803e0000,
  BadObjectDeleted = 0x803f0000,
  BadNotImplemented = 0x80400000,
  BadMonitoringModeInvalid = 0x80410000,
  BadMonitoredItemIdInvalid = 0x80420000,
  BadMonitoredItemFilterInvalid = 0x80430000,
  BadMonitoredItemFilterUnsupported = 0x80440000,
  BadFilterNotAllowed = 0x80450000,
  BadStructureMissing = 0x80460000,
  BadEventFilterInvalid = 0x80470000,
  BadContentFilterInvalid = 0x80480000,
  BadFilterOperatorInvalid = 0x80c10000,
  BadFilterOperatorUnsupported = 0x80c20000,
  BadFilterOperandCountMismatch = 0x80c30000,
  BadFilterOperandInvalid = 0x80490000,
  BadFilterElementInvalid = 0x80c40000,
  BadFilterLiteralInvalid = 0x80c50000,
  BadContinuationPointInvalid = 0x804a0000,
  BadNoContinuationPoints = 0x804b0000,
  BadReferenceTypeIdInvalid = 0x804c0000,
  BadBrowseDirectionInvalid = 0x804d0000,
  BadNodeNotInView = 0x804e0000,
  BadNumericOverflow = 0x81120000,
  BadServerUriInvalid = 0x804f0000,
  BadServerNameMissing = 0x80500000,
  BadDiscoveryUrlMissing = 0x80510000,
  BadSempahoreFileMissing = 0x80520000,
  BadRequestTypeInvalid = 0x80530000,
  BadSecurityModeRejected = 0x80540000,
  BadSecurityPolicyRejected = 0x80550000,
  BadTooManySessions = 0x80560000,
  BadUserSignatureInvalid = 0x80570000,
  BadApplicationSignatureInvalid = 0x80580000,
  BadNoValidCertificates = 0x80590000,
  BadIdentityChangeNotSupported = 0x80c60000,
  BadRequestCancelledByRequest = 0x805a0000,
  BadParentNodeIdInvalid = 0x805b0000,
  BadReferenceNotAllowed = 0x805c0000,
  BadNodeIdRejected = 0x805d0000,
  BadNodeIdExists = 0x805e0000,
  BadNodeClassInvalid = 0x805f0000,
  BadBrowseNameInvalid = 0x80600000,
  BadBrowseNameDuplicated = 0x80610000,
  BadNodeAttributesInvalid = 0x80620000,
  BadTypeDefinitionInvalid = 0x80630000,
  BadSourceNodeIdInvalid = 0x80640000,
  BadTargetNodeIdInvalid = 0x80650000,
  BadDuplicateReferenceNotAllowed = 0x80660000,
  BadInvalidSelfReference = 0x80670000,
  BadReferenceLocalOnly = 0x80680000,
  BadNoDeleteRights = 0x80690000,
  UncertainReferenceNotDeleted = 0x40bc0000,
  BadServerIndexInvalid = 0x806a0000,
  BadViewIdUnknown = 0x806b0000,
  BadViewTimestampInvalid = 0x80c90000,
  BadViewParameterMismatch = 0x80ca0000,
  BadViewVersionInvalid = 0x80cb0000,
  UncertainNotAllNodesAvailable = 0x40c00000,
  GoodResultsMayBeIncomplete = 0x00ba0000,
  BadNotTypeDefinition = 0x80c80000,
  UncertainReferenceOutOfServer = 0x406c0000,
  BadTooManyMatches = 0x806d0000,
  BadQueryTooComplex = 0x806e0000,
  BadNoMatch = 0x806f0000,
  BadMaxAgeInvalid = 0x80700000,
  BadSecurityModeInsufficient = 0x80e60000,
  BadHistoryOperationInvalid = 0x80710000,
  BadHistoryOperationUnsupported = 0x80720000,
  BadInvalidTimestampArgument = 0x80bd0000,
  BadWriteNotSupported = 0x80730000,
  BadTypeMismatch = 0x80740000,
  BadMethodInvalid = 0x80750000,
  BadArgumentsMissing = 0x80760000,
  BadNotExecutable = 0x81110000,
  BadTooManySubscriptions = 0x80770000,
  BadTooManyPublishRequests = 0x80780000,
  BadNoSubscription = 0x80790000,
  BadSequenceNumberUnknown = 0x807a0000,
  BadMessageNotAvailable = 0x807b0000,
  BadInsufficientClientProfile = 0x807c0000,
  BadStateNotActive = 0x80bf0000,
  BadAlreadyExists = 0x81150000,
  BadTcpServerTooBusy = 0x807d0000,
  BadTcpMessageTypeInvalid = 0x807e0000,
  BadTcpSecureChannelUnknown = 0x807f0000,
  BadTcpMessageTooLarge = 0x80800000,
  BadTcpNotEnoughResources = 0x80810000,
  BadTcpInternalError = 0x80820000,
  BadTcpEndpointUrlInvalid = 0x80830000,
  BadRequestInterrupted = 0x80840000,
  BadRequestTimeout = 0x80850000,
  BadSecureChannelClosed = 0x80860000,
  BadSecureChannelTokenUnknown = 0x80870000,
  BadSequenceNumberInvalid = 0x80880000,
  BadProtocolVersionUnsupported = 0x80be0000,
  BadConfigurationError = 0x80890000,
  BadNotConnected = 0x808a0000,
  BadDeviceFailure = 0x808b0000,
  BadSensorFailure = 0x808c0000,
  BadOutOfService = 0x808d0000,
  BadDeadbandFilterInvalid = 0x808e0000,
  UncertainNoCommunicationLastUsableValue = 0x408f0000,
  UncertainLastUsableValue = 0x40900000,
  UncertainSubstituteValue = 0x40910000,
  UncertainInitialValue = 0x40920000,
  UncertainSensorNotAccurate = 0x40930000,
  UncertainEngineeringUnitsExceeded = 0x40940000,
  UncertainSubNormal = 0x40950000,
  GoodLocalOverride = 0x00960000,
  BadRefreshInProgress = 0x80970000,
  BadConditionAlreadyDisabled = 0x80980000,
  BadConditionAlreadyEnabled = 0x80cc0000,
  BadConditionDisabled = 0x80990000,
  BadEventIdUnknown = 0x809a0000,
  BadEventNotAcknowledgeable = 0x80bb0000,
  BadDialogNotActive = 0x80cd0000,
  BadDialogResponseInvalid = 0x80ce0000,
  BadConditionBranchAlreadyAcked = 0x80cf0000,
  BadConditionBranchAlreadyConfirmed = 0x80d00000,
  BadConditionAlreadyShelved = 0x80d10000,
  BadConditionNotShelved = 0x80d20000,
  BadShelvingTimeOutOfRange = 0x80d30000,
  BadNoData = 0x809b0000,
  BadBoundNotFound = 0x80d70000,
  BadBoundNotSupported = 0x80d80000,
  BadDataLost = 0x809d0000,
  BadDataUnavailable = 0x809e0000,
  BadEntryExists = 0x809f0000,
  BadNoEntryExists = 0x80a00000,
  BadTimestampNotSupported = 0x80a10000,
  GoodEntryInserted = 0x00a20000,
  GoodEntryReplaced = 0x00a30000,
  UncertainDataSubNormal = 0x40a40000,
  GoodNoData = 0x00a50000,
  GoodMoreData = 0x00a60000,
  BadAggregateListMismatch = 0x80d40000,
  BadAggregateNotSupported = 0x80d50000,
  BadAggregateInvalidInputs = 0x80d60000,
  BadAggregateConfigurationRejected = 0x80da0000,
  GoodDataIgnored = 0x00d90000,
  BadRequestNotAllowed = 0x80e40000,
  BadRequestNotComplete = 0x81130000,
  GoodEdited = 0x00dc0000,
  GoodPostActionFailed = 0x00dd0000,
  UncertainDominantValueChanged = 0x40de0000,
  GoodDependentValueChanged = 0x00e00000,
  BadDominantValueChanged = 0x80e10000,
  UncertainDependentValueChanged = 0x40e20000,
  BadDependentValueChanged = 0x80e30000,
  GoodEditedDependentValueChanged = 0x01160000,
  GoodEditedDominantValueChanged = 0x01170000,
  GoodEditedDominantValueChangedDependentValueChanged = 0x01180000,
  BadEditedOutOfRange = 0x81190000,
  BadInitialValueOutOfRange = 0x811a0000,
  BadOutOfRangeDominantValueChanged = 0x811b0000,
  BadEditedOutOfRangeDominantValueChanged = 0x811c0000,
  BadOutOfRangeDominantValueChangedDependentValueChanged = 0x811d0000,
  BadEditedOutOfRangeDominantValueChangedDependentValueChanged = 0x811e0000,
  GoodCommunicationEvent = 0x00a70000,
  GoodShutdownEvent = 0x00a80000,
  GoodCallAgain = 0x00a90000,
  GoodNonCriticalTimeout = 0x00aa0000,
  BadInvalidArgument = 0x80ab0000,
  BadConnectionRejected = 0x80ac0000,
  BadDisconnect = 0x80ad0000,
  BadConnectionClosed = 0x80ae0000,
  BadInvalidState = 0x80af0000,
  BadEndOfStream = 0x80b00000,
  BadNoDataAvailable = 0x80b10000,
  BadWaitingForResponse = 0x80b20000,
  BadOperationAbandoned = 0x80b30000,
  BadExpectedStreamToBlock = 0x80b40000,
  BadWouldBlock = 0x80b50000,
  BadSyntaxError = 0x80b60000,
  BadMaxConnectionsReached = 0x80b70000,
}

export function statusCodeToString(statusCode:StatusCode): string{
  if (statusCode === undefined || statusCode === null) {return '';}
  
  switch (statusCode){
    case StatusCode.OK: return 'OK';
    case StatusCode.Uncertain: return 'Uncertain';
    case StatusCode.Bad: return 'Bad';
    case StatusCode.BadUnexpectedError: return 'BadUnexpectedError';
    case StatusCode.BadInternalError: return 'BadInternalError';
    case StatusCode.BadOutOfMemory: return 'BadOutOfMemory';
    case StatusCode.BadResourceUnavailable: return 'BadResourceUnavailable';
    case StatusCode.BadCommunicationError: return 'BadCommunicationError';
    case StatusCode.BadEncodingError: return 'BadEncodingError';
    case StatusCode.BadDecodingError: return 'BadDecodingError';
    case StatusCode.BadEncodingLimitsExceeded: return 'BadEncodingLimitsExceeded';
    case StatusCode.BadRequestTooLarge: return 'BadRequestTooLarge';
    case StatusCode.BadResponseTooLarge: return 'BadResponseTooLarge';
    case StatusCode.BadUnknownResponse: return 'BadUnknownResponse';
    case StatusCode.BadTimeout: return 'BadTimeout';
    case StatusCode.BadServiceUnsupported: return 'BadServiceUnsupported';
    case StatusCode.BadShutdown: return 'BadShutdown';
    case StatusCode.BadServerNotConnected: return 'BadServerNotConnected';
    case StatusCode.BadServerHalted: return 'BadServerHalted';
    case StatusCode.BadNothingToDo: return 'BadNothingToDo';
    case StatusCode.BadTooManyOperations: return 'BadTooManyOperations';
    case StatusCode.BadTooManyMonitoredItems: return 'BadTooManyMonitoredItems';
    case StatusCode.BadDataTypeIdUnknown: return 'BadDataTypeIdUnknown';
    case StatusCode.BadCertificateInvalid: return 'BadCertificateInvalid';
    case StatusCode.BadSecurityChecksFailed: return 'BadSecurityChecksFailed';
    case StatusCode.BadCertificatePolicyCheckFailed: return 'BadCertificatePolicyCheckFailed';
    case StatusCode.BadCertificateTimeInvalid: return 'BadCertificateTimeInvalid';
    case StatusCode.BadCertificateIssuerTimeInvalid: return 'BadCertificateIssuerTimeInvalid';
    case StatusCode.BadCertificateHostNameInvalid: return 'BadCertificateHostNameInvalid';
    case StatusCode.BadCertificateUriInvalid: return 'BadCertificateUriInvalid';
    case StatusCode.BadCertificateUseNotAllowed: return 'BadCertificateUseNotAllowed';
    case StatusCode.BadCertificateIssuerUseNotAllowed: return 'BadCertificateIssuerUseNotAllowed';
    case StatusCode.BadCertificateUntrusted: return 'BadCertificateUntrusted';
    case StatusCode.BadCertificateRevocationUnknown: return 'BadCertificateRevocationUnknown';
    case StatusCode.BadCertificateIssuerRevocationUnknown: return 'BadCertificateIssuerRevocationUnknown';
    case StatusCode.BadCertificateRevoked: return 'BadCertificateRevoked';
    case StatusCode.BadCertificateIssuerRevoked: return 'BadCertificateIssuerRevoked';
    case StatusCode.BadCertificateChainIncomplete: return 'BadCertificateChainIncomplete';
    case StatusCode.BadUserAccessDenied: return 'BadUserAccessDenied';
    case StatusCode.BadIdentityTokenInvalid: return 'BadIdentityTokenInvalid';
    case StatusCode.BadIdentityTokenRejected: return 'BadIdentityTokenRejected';
    case StatusCode.BadSecureChannelIdInvalid: return 'BadSecureChannelIdInvalid';
    case StatusCode.BadInvalidTimestamp: return 'BadInvalidTimestamp';
    case StatusCode.BadNonceInvalid: return 'BadNonceInvalid';
    case StatusCode.BadSessionIdInvalid: return 'BadSessionIdInvalid';
    case StatusCode.BadSessionClosed: return 'BadSessionClosed';
    case StatusCode.BadSessionNotActivated: return 'BadSessionNotActivated';
    case StatusCode.BadSubscriptionIdInvalid: return 'BadSubscriptionIdInvalid';
    case StatusCode.BadRequestHeaderInvalid: return 'BadRequestHeaderInvalid';
    case StatusCode.BadTimestampsToReturnInvalid: return 'BadTimestampsToReturnInvalid';
    case StatusCode.BadRequestCancelledByClient: return 'BadRequestCancelledByClient';
    case StatusCode.BadTooManyArguments: return 'BadTooManyArguments';
    case StatusCode.BadLicenseExpired: return 'BadLicenseExpired';
    case StatusCode.BadLicenseLimitsExceeded: return 'BadLicenseLimitsExceeded';
    case StatusCode.BadLicenseNotAvailable: return 'BadLicenseNotAvailable';
    case StatusCode.GoodSubscriptionTransferred: return 'GoodSubscriptionTransferred';
    case StatusCode.GoodCompletesAsynchronously: return 'GoodCompletesAsynchronously';
    case StatusCode.GoodOverload: return 'GoodOverload';
    case StatusCode.GoodClamped: return 'GoodClamped';
    case StatusCode.BadNoCommunication: return 'BadNoCommunication';
    case StatusCode.BadWaitingForInitialData: return 'BadWaitingForInitialData';
    case StatusCode.BadNodeIdInvalid: return 'BadNodeIdInvalid';
    case StatusCode.BadNodeIdUnknown: return 'BadNodeIdUnknown';
    case StatusCode.BadAttributeIdInvalid: return 'BadAttributeIdInvalid';
    case StatusCode.BadIndexRangeInvalid: return 'BadIndexRangeInvalid';
    case StatusCode.BadIndexRangeNoData: return 'BadIndexRangeNoData';
    case StatusCode.BadDataEncodingInvalid: return 'BadDataEncodingInvalid';
    case StatusCode.BadDataEncodingUnsupported: return 'BadDataEncodingUnsupported';
    case StatusCode.BadNotReadable: return 'BadNotReadable';
    case StatusCode.BadNotWritable: return 'BadNotWritable';
    case StatusCode.BadOutOfRange: return 'BadOutOfRange';
    case StatusCode.BadNotSupported: return 'BadNotSupported';
    case StatusCode.BadNotFound: return 'BadNotFound';
    case StatusCode.BadObjectDeleted: return 'BadObjectDeleted';
    case StatusCode.BadNotImplemented: return 'BadNotImplemented';
    case StatusCode.BadMonitoringModeInvalid: return 'BadMonitoringModeInvalid';
    case StatusCode.BadMonitoredItemIdInvalid: return 'BadMonitoredItemIdInvalid';
    case StatusCode.BadMonitoredItemFilterInvalid: return 'BadMonitoredItemFilterInvalid';
    case StatusCode.BadMonitoredItemFilterUnsupported: return 'BadMonitoredItemFilterUnsupported';
    case StatusCode.BadFilterNotAllowed: return 'BadFilterNotAllowed';
    case StatusCode.BadStructureMissing: return 'BadStructureMissing';
    case StatusCode.BadEventFilterInvalid: return 'BadEventFilterInvalid';
    case StatusCode.BadContentFilterInvalid: return 'BadContentFilterInvalid';
    case StatusCode.BadFilterOperatorInvalid: return 'BadFilterOperatorInvalid';
    case StatusCode.BadFilterOperatorUnsupported: return 'BadFilterOperatorUnsupported';
    case StatusCode.BadFilterOperandCountMismatch: return 'BadFilterOperandCountMismatch';
    case StatusCode.BadFilterOperandInvalid: return 'BadFilterOperandInvalid';
    case StatusCode.BadFilterElementInvalid: return 'BadFilterElementInvalid';
    case StatusCode.BadFilterLiteralInvalid: return 'BadFilterLiteralInvalid';
    case StatusCode.BadContinuationPointInvalid: return 'BadContinuationPointInvalid';
    case StatusCode.BadNoContinuationPoints: return 'BadNoContinuationPoints';
    case StatusCode.BadReferenceTypeIdInvalid: return 'BadReferenceTypeIdInvalid';
    case StatusCode.BadBrowseDirectionInvalid: return 'BadBrowseDirectionInvalid';
    case StatusCode.BadNodeNotInView: return 'BadNodeNotInView';
    case StatusCode.BadNumericOverflow: return 'BadNumericOverflow';
    case StatusCode.BadServerUriInvalid: return 'BadServerUriInvalid';
    case StatusCode.BadServerNameMissing: return 'BadServerNameMissing';
    case StatusCode.BadDiscoveryUrlMissing: return 'BadDiscoveryUrlMissing';
    case StatusCode.BadSempahoreFileMissing: return 'BadSempahoreFileMissing';
    case StatusCode.BadRequestTypeInvalid: return 'BadRequestTypeInvalid';
    case StatusCode.BadSecurityModeRejected: return 'BadSecurityModeRejected';
    case StatusCode.BadSecurityPolicyRejected: return 'BadSecurityPolicyRejected';
    case StatusCode.BadTooManySessions: return 'BadTooManySessions';
    case StatusCode.BadUserSignatureInvalid: return 'BadUserSignatureInvalid';
    case StatusCode.BadApplicationSignatureInvalid: return 'BadApplicationSignatureInvalid';
    case StatusCode.BadNoValidCertificates: return 'BadNoValidCertificates';
    case StatusCode.BadIdentityChangeNotSupported: return 'BadIdentityChangeNotSupported';
    case StatusCode.BadRequestCancelledByRequest: return 'BadRequestCancelledByRequest';
    case StatusCode.BadParentNodeIdInvalid: return 'BadParentNodeIdInvalid';
    case StatusCode.BadReferenceNotAllowed: return 'BadReferenceNotAllowed';
    case StatusCode.BadNodeIdRejected: return 'BadNodeIdRejected';
    case StatusCode.BadNodeIdExists: return 'BadNodeIdExists';
    case StatusCode.BadNodeClassInvalid: return 'BadNodeClassInvalid';
    case StatusCode.BadBrowseNameInvalid: return 'BadBrowseNameInvalid';
    case StatusCode.BadBrowseNameDuplicated: return 'BadBrowseNameDuplicated';
    case StatusCode.BadNodeAttributesInvalid: return 'BadNodeAttributesInvalid';
    case StatusCode.BadTypeDefinitionInvalid: return 'BadTypeDefinitionInvalid';
    case StatusCode.BadSourceNodeIdInvalid: return 'BadSourceNodeIdInvalid';
    case StatusCode.BadTargetNodeIdInvalid: return 'BadTargetNodeIdInvalid';
    case StatusCode.BadDuplicateReferenceNotAllowed: return 'BadDuplicateReferenceNotAllowed';
    case StatusCode.BadInvalidSelfReference: return 'BadInvalidSelfReference';
    case StatusCode.BadReferenceLocalOnly: return 'BadReferenceLocalOnly';
    case StatusCode.BadNoDeleteRights: return 'BadNoDeleteRights';
    case StatusCode.UncertainReferenceNotDeleted: return 'UncertainReferenceNotDeleted';
    case StatusCode.BadServerIndexInvalid: return 'BadServerIndexInvalid';
    case StatusCode.BadViewIdUnknown: return 'BadViewIdUnknown';
    case StatusCode.BadViewTimestampInvalid: return 'BadViewTimestampInvalid';
    case StatusCode.BadViewParameterMismatch: return 'BadViewParameterMismatch';
    case StatusCode.BadViewVersionInvalid: return 'BadViewVersionInvalid';
    case StatusCode.UncertainNotAllNodesAvailable: return 'UncertainNotAllNodesAvailable';
    case StatusCode.GoodResultsMayBeIncomplete: return 'GoodResultsMayBeIncomplete';
    case StatusCode.BadNotTypeDefinition: return 'BadNotTypeDefinition';
    case StatusCode.UncertainReferenceOutOfServer: return 'UncertainReferenceOutOfServer';
    case StatusCode.BadTooManyMatches: return 'BadTooManyMatches';
    case StatusCode.BadQueryTooComplex: return 'BadQueryTooComplex';
    case StatusCode.BadNoMatch: return 'BadNoMatch';
    case StatusCode.BadMaxAgeInvalid: return 'BadMaxAgeInvalid';
    case StatusCode.BadSecurityModeInsufficient: return 'BadSecurityModeInsufficient';
    case StatusCode.BadHistoryOperationInvalid: return 'BadHistoryOperationInvalid';
    case StatusCode.BadHistoryOperationUnsupported: return 'BadHistoryOperationUnsupported';
    case StatusCode.BadInvalidTimestampArgument: return 'BadInvalidTimestampArgument';
    case StatusCode.BadWriteNotSupported: return 'BadWriteNotSupported';
    case StatusCode.BadTypeMismatch: return 'BadTypeMismatch';
    case StatusCode.BadMethodInvalid: return 'BadMethodInvalid';
    case StatusCode.BadArgumentsMissing: return 'BadArgumentsMissing';
    case StatusCode.BadNotExecutable: return 'BadNotExecutable';
    case StatusCode.BadTooManySubscriptions: return 'BadTooManySubscriptions';
    case StatusCode.BadTooManyPublishRequests: return 'BadTooManyPublishRequests';
    case StatusCode.BadNoSubscription: return 'BadNoSubscription';
    case StatusCode.BadSequenceNumberUnknown: return 'BadSequenceNumberUnknown';
    case StatusCode.BadMessageNotAvailable: return 'BadMessageNotAvailable';
    case StatusCode.BadInsufficientClientProfile: return 'BadInsufficientClientProfile';
    case StatusCode.BadStateNotActive: return 'BadStateNotActive';
    case StatusCode.BadAlreadyExists: return 'BadAlreadyExists';
    case StatusCode.BadTcpServerTooBusy: return 'BadTcpServerTooBusy';
    case StatusCode.BadTcpMessageTypeInvalid: return 'BadTcpMessageTypeInvalid';
    case StatusCode.BadTcpSecureChannelUnknown: return 'BadTcpSecureChannelUnknown';
    case StatusCode.BadTcpMessageTooLarge: return 'BadTcpMessageTooLarge';
    case StatusCode.BadTcpNotEnoughResources: return 'BadTcpNotEnoughResources';
    case StatusCode.BadTcpInternalError: return 'BadTcpInternalError';
    case StatusCode.BadTcpEndpointUrlInvalid: return 'BadTcpEndpointUrlInvalid';
    case StatusCode.BadRequestInterrupted: return 'BadRequestInterrupted';
    case StatusCode.BadRequestTimeout: return 'BadRequestTimeout';
    case StatusCode.BadSecureChannelClosed: return 'BadSecureChannelClosed';
    case StatusCode.BadSecureChannelTokenUnknown: return 'BadSecureChannelTokenUnknown';
    case StatusCode.BadSequenceNumberInvalid: return 'BadSequenceNumberInvalid';
    case StatusCode.BadProtocolVersionUnsupported: return 'BadProtocolVersionUnsupported';
    case StatusCode.BadConfigurationError: return 'BadConfigurationError';
    case StatusCode.BadNotConnected: return 'BadNotConnected';
    case StatusCode.BadDeviceFailure: return 'BadDeviceFailure';
    case StatusCode.BadSensorFailure: return 'BadSensorFailure';
    case StatusCode.BadOutOfService: return 'BadOutOfService';
    case StatusCode.BadDeadbandFilterInvalid: return 'BadDeadbandFilterInvalid';
    case StatusCode.UncertainNoCommunicationLastUsableValue: return 'UncertainNoCommunicationLastUsableValue';
    case StatusCode.UncertainLastUsableValue: return 'UncertainLastUsableValue';
    case StatusCode.UncertainSubstituteValue: return 'UncertainSubstituteValue';
    case StatusCode.UncertainInitialValue: return 'UncertainInitialValue';
    case StatusCode.UncertainSensorNotAccurate: return 'UncertainSensorNotAccurate';
    case StatusCode.UncertainEngineeringUnitsExceeded: return 'UncertainEngineeringUnitsExceeded';
    case StatusCode.UncertainSubNormal: return 'UncertainSubNormal';
    case StatusCode.GoodLocalOverride: return 'GoodLocalOverride';
    case StatusCode.BadRefreshInProgress: return 'BadRefreshInProgress';
    case StatusCode.BadConditionAlreadyDisabled: return 'BadConditionAlreadyDisabled';
    case StatusCode.BadConditionAlreadyEnabled: return 'BadConditionAlreadyEnabled';
    case StatusCode.BadConditionDisabled: return 'BadConditionDisabled';
    case StatusCode.BadEventIdUnknown: return 'BadEventIdUnknown';
    case StatusCode.BadEventNotAcknowledgeable: return 'BadEventNotAcknowledgeable';
    case StatusCode.BadDialogNotActive: return 'BadDialogNotActive';
    case StatusCode.BadDialogResponseInvalid: return 'BadDialogResponseInvalid';
    case StatusCode.BadConditionBranchAlreadyAcked: return 'BadConditionBranchAlreadyAcked';
    case StatusCode.BadConditionBranchAlreadyConfirmed: return 'BadConditionBranchAlreadyConfirmed';
    case StatusCode.BadConditionAlreadyShelved: return 'BadConditionAlreadyShelved';
    case StatusCode.BadConditionNotShelved: return 'BadConditionNotShelved';
    case StatusCode.BadShelvingTimeOutOfRange: return 'BadShelvingTimeOutOfRange';
    case StatusCode.BadNoData: return 'BadNoData';
    case StatusCode.BadBoundNotFound: return 'BadBoundNotFound';
    case StatusCode.BadBoundNotSupported: return 'BadBoundNotSupported';
    case StatusCode.BadDataLost: return 'BadDataLost';
    case StatusCode.BadDataUnavailable: return 'BadDataUnavailable';
    case StatusCode.BadEntryExists: return 'BadEntryExists';
    case StatusCode.BadNoEntryExists: return 'BadNoEntryExists';
    case StatusCode.BadTimestampNotSupported: return 'BadTimestampNotSupported';
    case StatusCode.GoodEntryInserted: return 'GoodEntryInserted';
    case StatusCode.GoodEntryReplaced: return 'GoodEntryReplaced';
    case StatusCode.UncertainDataSubNormal: return 'UncertainDataSubNormal';
    case StatusCode.GoodNoData: return 'GoodNoData';
    case StatusCode.GoodMoreData: return 'GoodMoreData';
    case StatusCode.BadAggregateListMismatch: return 'BadAggregateListMismatch';
    case StatusCode.BadAggregateNotSupported: return 'BadAggregateNotSupported';
    case StatusCode.BadAggregateInvalidInputs: return 'BadAggregateInvalidInputs';
    case StatusCode.BadAggregateConfigurationRejected: return 'BadAggregateConfigurationRejected';
    case StatusCode.GoodDataIgnored: return 'GoodDataIgnored';
    case StatusCode.BadRequestNotAllowed: return 'BadRequestNotAllowed';
    case StatusCode.BadRequestNotComplete: return 'BadRequestNotComplete';
    case StatusCode.GoodEdited: return 'GoodEdited';
    case StatusCode.GoodPostActionFailed: return 'GoodPostActionFailed';
    case StatusCode.UncertainDominantValueChanged: return 'UncertainDominantValueChanged';
    case StatusCode.GoodDependentValueChanged: return 'GoodDependentValueChanged';
    case StatusCode.BadDominantValueChanged: return 'BadDominantValueChanged';
    case StatusCode.UncertainDependentValueChanged: return 'UncertainDependentValueChanged';
    case StatusCode.BadDependentValueChanged: return 'BadDependentValueChanged';
    case StatusCode.GoodEditedDependentValueChanged: return 'GoodEditedDependentValueChanged';
    case StatusCode.GoodEditedDominantValueChanged: return 'GoodEditedDominantValueChanged';
    case StatusCode.GoodEditedDominantValueChangedDependentValueChanged: return 'GoodEditedDominantValueChangedDependentValueChanged';
    case StatusCode.BadEditedOutOfRange: return 'BadEditedOutOfRange';
    case StatusCode.BadInitialValueOutOfRange: return 'BadInitialValueOutOfRange';
    case StatusCode.BadOutOfRangeDominantValueChanged: return 'BadOutOfRangeDominantValueChanged';
    case StatusCode.BadEditedOutOfRangeDominantValueChanged: return 'BadEditedOutOfRangeDominantValueChanged';
    case StatusCode.BadOutOfRangeDominantValueChangedDependentValueChanged: return 'BadOutOfRangeDominantValueChangedDependentValueChanged';
    case StatusCode.BadEditedOutOfRangeDominantValueChangedDependentValueChanged: return 'BadEditedOutOfRangeDominantValueChangedDependentValueChanged';
    case StatusCode.GoodCommunicationEvent: return 'GoodCommunicationEvent';
    case StatusCode.GoodShutdownEvent: return 'GoodShutdownEvent';
    case StatusCode.GoodCallAgain: return 'GoodCallAgain';
    case StatusCode.GoodNonCriticalTimeout: return 'GoodNonCriticalTimeout';
    case StatusCode.BadInvalidArgument: return 'BadInvalidArgument';
    case StatusCode.BadConnectionRejected: return 'BadConnectionRejected';
    case StatusCode.BadDisconnect: return 'BadDisconnect';
    case StatusCode.BadConnectionClosed: return 'BadConnectionClosed';
    case StatusCode.BadInvalidState: return 'BadInvalidState';
    case StatusCode.BadEndOfStream: return 'BadEndOfStream';
    case StatusCode.BadNoDataAvailable: return 'BadNoDataAvailable';
    case StatusCode.BadWaitingForResponse: return 'BadWaitingForResponse';
    case StatusCode.BadOperationAbandoned: return 'BadOperationAbandoned';
    case StatusCode.BadExpectedStreamToBlock: return 'BadExpectedStreamToBlock';
    case StatusCode.BadWouldBlock: return 'BadWouldBlock';
    case StatusCode.BadSyntaxError: return 'BadSyntaxError';
    case StatusCode.BadMaxConnectionsReached: return 'BadMaxConnectionsReached';
    default:
      throw new Error('Unknown status code.')
  }
}