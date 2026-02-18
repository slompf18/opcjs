/**
 * OPC UA StatusCode Type (i=19)
 * 
 * StatusCode is a 32-bit unsigned integer that indicates the quality of a result.
 * The format is: [Severity:2][SubCode:14][Code:16]
 * 
 * @see OPC UA Part 4, Section 7.34
 * @see OPC UA Part 6, Section 5.1.1
 */

/**
 * Status code severity levels
 */
export enum StatusCodeSeverity {
  Good = 0x00,        // 00 - The operation succeeded
  Uncertain = 0x40,   // 01 - The operation partially succeeded
  Bad = 0x80,         // 10 - The operation failed
}

/**
 * OPC UA StatusCode class
 * 
 * Represents a 32-bit status code that indicates the quality and nature of a result.
 * 
 * @example
 * ```typescript
 * import { StatusCode } from '@opcua/types';
 * 
 * const good = StatusCode.Good;
 * console.log(good.isGood()); // true
 * 
 * const bad = new StatusCode(StatusCode.BadTimeout);
 * console.log(bad.isBad()); // true
 * console.log(bad.toString()); // "BadTimeout (0x800A0000)"
 * ```
 */
export class StatusCode {
  /**
   * The numeric status code value
   */
  private readonly value: number;

  /**
   * Create a new StatusCode
   * 
   * @param value - The 32-bit status code value
   */
  constructor(value: number = 0) {
    this.value = value >>> 0; // Ensure unsigned 32-bit
  }

  /**
   * Get the numeric value
   * 
   * @returns The 32-bit status code value
   */
  public getValue(): number {
    return this.value;
  }

  /**
   * Get the severity bits (bits 30-31)
   * 
   * @returns The severity (Good=0, Uncertain=1, Bad=2)
   */
  public getSeverity(): number {
    return (this.value >>> 30) & 0x03;
  }

  /**
   * Check if the status code indicates success (Good)
   * 
   * @returns true if severity is Good
   */
  public isGood(): boolean {
    return this.getSeverity() === 0;
  }

  /**
   * Check if the status code indicates uncertain quality
   * 
   * @returns true if severity is Uncertain
   */
  public isUncertain(): boolean {
    return this.getSeverity() === 1;
  }

  /**
   * Check if the status code indicates failure (Bad)
   * 
   * @returns true if severity is Bad
   */
  public isBad(): boolean {
    return this.getSeverity() === 2 || this.getSeverity() === 3;
  }

  /**
   * Check if status code equals another
   * 
   * @param other - The other StatusCode
   * @returns true if equal
   */
  public equals(other: StatusCode): boolean {
    return this.value === other.value;
  }

  /**
   * Convert to string representation
   * 
   * @returns String representation with name and hex value
   */
  public toString(): string {
    const name = StatusCode.getStatusCodeName(this.value);
    const hex = `0x${this.value.toString(16).toUpperCase().padStart(8, '0')}`;
    return name ? `${name} (${hex})` : hex;
  }

  /**
   * Get the symbolic name for a status code value
   * 
   * @param value - The status code value
   * @returns The symbolic name or undefined
   */
  public static getStatusCodeName(value: number): string | undefined {
    return StatusCodeNames[value];
  }

  // ============================================================================
  // Good Status Codes (0x00000000 - 0x3FFFFFFF)
  // ============================================================================

  /** The operation succeeded. */
  public static readonly Good = 0x00000000;

  /** The value is uncertain but no specific reason is known. */
  public static readonly Uncertain = 0x40000000;

  /** The operation failed. */
  public static readonly Bad = 0x80000000;

  // ============================================================================
  // Good Status Codes with Specific Meanings
  // ============================================================================

  /** The value has been Clamped. */
  public static readonly GoodClamped = 0x00030000;

  /** The communication layer has raised an event. */
  public static readonly GoodCommunicationEvent = 0x000A0000;

  /** The value is based on configuration. */
  public static readonly GoodDataIgnored = 0x000D0000;

  /** The server does not support the requested operation. */
  public static readonly GoodEntryInserted = 0x001A0000;

  /** The server does not support the requested operation. */
  public static readonly GoodEntryReplaced = 0x001B0000;

  /** The value is based on multiple sources and has less than the requested number of Good sources. */
  public static readonly GoodLocalOverride = 0x00960000;

  /** The operation completed but more data is available. */
  public static readonly GoodMoreData = 0x00A00000;

  /** The server does not have a value but will provide one as soon as it is available. */
  public static readonly GoodNoData = 0x00A10000;

  /** The operation succeeded but the server is shutting down. */
  public static readonly GoodShutdownEvent = 0x000F0000;

  /** The value has been overridden. */
  public static readonly GoodSubscriptionTransferred = 0x002D0000;

  // ============================================================================
  // Uncertain Status Codes (0x40000000 - 0x7FFFFFFF)
  // ============================================================================

  /** The value is uncertain for unspecified reasons. */
  public static readonly UncertainDataSubNormal = 0x40A40000;

  /** The value is at one of the sensor limits. */
  public static readonly UncertainDominantValueChanged = 0x40DE0000;

  /** No communication with the data source. */
  public static readonly UncertainEngineeringUnitsExceeded = 0x40940000;

  /** The value is derived from multiple sources and has less than the required number of Good sources. */
  public static readonly UncertainInitialValue = 0x40920000;

  /** The value is uncertain because it was calculated based on uncertain data. */
  public static readonly UncertainLastUsableValue = 0x40880000;

  /** The value is uncertain because another value has changed. */
  public static readonly UncertainNoCommunicationLastUsableValue = 0x408F0000;

  /** No data exists for the requested time range. */
  public static readonly UncertainNotAllNodesAvailable = 0x40C00000;

  /** The value is based on multiple sources and has less than the requested number of Good sources. */
  public static readonly UncertainReferenceNotDeleted = 0x40BC0000;

  /** The value is uncertain because the quality of one or more sub-values is uncertain. */
  public static readonly UncertainReferenceOutOfServer = 0x406C0000;

  /** The value is uncertain because the sensor is not working properly. */
  public static readonly UncertainSensorCalibration = 0x40930000;

  /** The value is uncertain because the sensor is not in a good state. */
  public static readonly UncertainSensorNotAccurate = 0x40900000;

  /** The value may not be accurate because the transducer is in manual mode. */
  public static readonly UncertainSubstituteValue = 0x40950000;

  // ============================================================================
  // Bad Status Codes (0x80000000 - 0xFFFFFFFF)
  // ============================================================================

  /** An unexpected error occurred. */
  public static readonly BadUnexpectedError = 0x80010000;

  /** An internal error occurred as a result of a programming or configuration error. */
  public static readonly BadInternalError = 0x80020000;

  /** Not enough memory to complete the operation. */
  public static readonly BadOutOfMemory = 0x80030000;

  /** An operating system resource is not available. */
  public static readonly BadResourceUnavailable = 0x80040000;

  /** A low level communication error occurred. */
  public static readonly BadCommunicationError = 0x80050000;

  /** Encoding halted because of invalid data. */
  public static readonly BadEncodingError = 0x80060000;

  /** Decoding halted because of invalid data. */
  public static readonly BadDecodingError = 0x80070000;

  /** The message encoding/decoding limits imposed by the stack have been exceeded. */
  public static readonly BadEncodingLimitsExceeded = 0x80080000;

  /** The request message size exceeds limits set by the server. */
  public static readonly BadRequestTooLarge = 0x80B80000;

  /** The response message size exceeds limits set by the client. */
  public static readonly BadResponseTooLarge = 0x80B90000;

  /** An unrecognized response was received from the server. */
  public static readonly BadUnknownResponse = 0x80090000;

  /** The operation timed out. */
  public static readonly BadTimeout = 0x800A0000;

  /** The server does not support the requested service. */
  public static readonly BadServiceUnsupported = 0x800B0000;

  /** The operation was cancelled because the application is shutting down. */
  public static readonly BadShutdown = 0x800C0000;

  /** The operation could not complete because the client is not connected to the server. */
  public static readonly BadServerNotConnected = 0x800D0000;

  /** The server has stopped and cannot process any requests. */
  public static readonly BadServerHalted = 0x800E0000;

  /** There was nothing to do because the client passed a list of operations with no elements. */
  public static readonly BadNothingToDo = 0x800F0000;

  /** The request could not be processed because it specified too many operations. */
  public static readonly BadTooManyOperations = 0x80100000;

  /** The request could not be processed because there are too many monitored items in the subscription. */
  public static readonly BadTooManyMonitoredItems = 0x80DB0000;

  /** The extension object cannot be (de)serialized because the data type id is not recognized. */
  public static readonly BadDataTypeIdUnknown = 0x80110000;

  /** The certificate provided as a parameter is not valid. */
  public static readonly BadCertificateInvalid = 0x80120000;

  /** An error occurred verifying security. */
  public static readonly BadSecurityChecksFailed = 0x80130000;

  /** The certificate does not meet the requirements of the security policy. */
  public static readonly BadCertificatePolicyCheckFailed = 0x81140000;

  /** The certificate has expired or is not yet valid. */
  public static readonly BadCertificateTimeInvalid = 0x80140000;

  /** An issuer certificate has expired or is not yet valid. */
  public static readonly BadCertificateIssuerTimeInvalid = 0x80150000;

  /** The HostName used to connect to a server does not match a HostName in the certificate. */
  public static readonly BadCertificateHostNameInvalid = 0x80160000;

  /** The URI specified in the ApplicationDescription does not match the URI in the certificate. */
  public static readonly BadCertificateUriInvalid = 0x80170000;

  /** The certificate may not be used for the requested operation. */
  public static readonly BadCertificateUseNotAllowed = 0x80180000;

  /** The issuer certificate may not be used for the requested operation. */
  public static readonly BadCertificateIssuerUseNotAllowed = 0x80190000;

  /** The certificate is not trusted. */
  public static readonly BadCertificateUntrusted = 0x801A0000;

  /** It was not possible to determine if the certificate has been revoked. */
  public static readonly BadCertificateRevocationUnknown = 0x801B0000;

  /** It was not possible to determine if the issuer certificate has been revoked. */
  public static readonly BadCertificateIssuerRevocationUnknown = 0x801C0000;

  /** The certificate has been revoked. */
  public static readonly BadCertificateRevoked = 0x801D0000;

  /** The issuer certificate has been revoked. */
  public static readonly BadCertificateIssuerRevoked = 0x801E0000;

  /** The certificate chain is incomplete. */
  public static readonly BadCertificateChainIncomplete = 0x810D0000;

  /** User does not have permission to perform the requested operation. */
  public static readonly BadUserAccessDenied = 0x801F0000;

  /** The user identity token is not valid. */
  public static readonly BadIdentityTokenInvalid = 0x80200000;

  /** The user identity token is valid but the server has rejected it. */
  public static readonly BadIdentityTokenRejected = 0x80210000;

  /** The specified secure channel is no longer valid. */
  public static readonly BadSecureChannelIdInvalid = 0x80220000;

  /** The timestamp is outside the range allowed by the server. */
  public static readonly BadInvalidTimestamp = 0x80230000;

  /** The nonce does appear to be not a random value or it is not the correct length. */
  public static readonly BadNonceInvalid = 0x80240000;

  /** The session id is not valid. */
  public static readonly BadSessionIdInvalid = 0x80250000;

  /** The session was closed by the client. */
  public static readonly BadSessionClosed = 0x80260000;

  /** The session cannot be used because ActivateSession has not been called. */
  public static readonly BadSessionNotActivated = 0x80270000;

  /** The subscription id is not valid. */
  public static readonly BadSubscriptionIdInvalid = 0x80280000;

  /** The header for the request is missing or invalid. */
  public static readonly BadRequestHeaderInvalid = 0x802A0000;

  /** The timestamps to return parameter is invalid. */
  public static readonly BadTimestampsToReturnInvalid = 0x802B0000;

  /** The request was cancelled by the client. */
  public static readonly BadRequestCancelledByClient = 0x802C0000;

  /** Too many arguments were provided. */
  public static readonly BadTooManyArguments = 0x80E50000;

  /** The server requires a license to operate in general or to perform a service or operation. */
  public static readonly BadLicenseExpired = 0x810E0000;

  /** The server has limits on number of allowed operations / objects. */
  public static readonly BadLicenseLimitsExceeded = 0x810F0000;

  /** The server does not have a license which is required to operate in general. */
  public static readonly BadLicenseNotAvailable = 0x81100000;

  // ============================================================================
  // Bad Status Codes - Data Access
  // ============================================================================

  /** The syntax of the string was incorrect. */
  public static readonly BadStringTooLong = 0x80300000;

  /** The rule for constructing the component ids was not followed. */
  public static readonly BadComponentIdInvalid = 0x80310000;

  /** The referenced attribute id is not valid. */
  public static readonly BadAttributeIdInvalid = 0x80320000;

  /** The specified IndexRange is invalid. */
  public static readonly BadIndexRangeInvalid = 0x80330000;

  /** No data exists within the specified index range. */
  public static readonly BadIndexRangeNoData = 0x80340000;

  /** The data encoding is invalid. */
  public static readonly BadDataEncodingInvalid = 0x80350000;

  /** The server does not support the requested data encoding for the node. */
  public static readonly BadDataEncodingUnsupported = 0x80360000;

  /** The access level does not allow reading or subscribing to the Node. */
  public static readonly BadNotReadable = 0x80370000;

  /** The access level does not allow writing to the Node. */
  public static readonly BadNotWritable = 0x80380000;

  /** The value was out of range. */
  public static readonly BadOutOfRange = 0x80390000;

  /** The requested operation is not supported. */
  public static readonly BadNotSupported = 0x803A0000;

  /** A requested item was not found or a search operation ended without success. */
  public static readonly BadNotFound = 0x803B0000;

  /** The object cannot be used because it has been deleted. */
  public static readonly BadObjectDeleted = 0x803C0000;

  /** Requested operation is not implemented. */
  public static readonly BadNotImplemented = 0x803D0000;

  /** The monitoring mode is invalid. */
  public static readonly BadMonitoringModeInvalid = 0x803E0000;

  /** The monitoring item id does not refer to a valid monitored item. */
  public static readonly BadMonitoredItemIdInvalid = 0x803F0000;

  /** The monitored item filter parameter is not valid. */
  public static readonly BadMonitoredItemFilterInvalid = 0x80400000;

  /** The server does not support the requested monitored item filter. */
  public static readonly BadMonitoredItemFilterUnsupported = 0x80410000;

  /** A monitoring filter cannot be used in combination with the attribute specified. */
  public static readonly BadFilterNotAllowed = 0x80420000;

  /** A mandatory structured parameter was missing or null. */
  public static readonly BadStructureMissing = 0x80430000;

  /** The event filter is not valid. */
  public static readonly BadEventFilterInvalid = 0x80440000;

  /** The content filter is not valid. */
  public static readonly BadContentFilterInvalid = 0x80450000;

  /** An unrecognized operator was provided in a filter. */
  public static readonly BadFilterOperatorInvalid = 0x80C10000;

  /** A valid operator was provided, but the server does not support this filter operator. */
  public static readonly BadFilterOperatorUnsupported = 0x80C20000;

  /** The number of operands provided for the filter operator was less than expected. */
  public static readonly BadFilterOperandCountMismatch = 0x80C30000;

  /** The operand used in a content filter is not valid. */
  public static readonly BadFilterOperandInvalid = 0x80460000;

  /** The referenced element is not a valid element in the content filter. */
  public static readonly BadFilterElementInvalid = 0x80C40000;

  /** The referenced literal is not a valid value. */
  public static readonly BadFilterLiteralInvalid = 0x80C50000;

  /** The continuation point provided is no longer valid. */
  public static readonly BadContinuationPointInvalid = 0x80470000;

  /** The operation could not be processed because all continuation points have been allocated. */
  public static readonly BadNoContinuationPoints = 0x80480000;

  /** The reference type id does not refer to a valid reference type node. */
  public static readonly BadReferenceTypeIdInvalid = 0x80490000;

  /** The browse direction is not valid. */
  public static readonly BadBrowseDirectionInvalid = 0x804A0000;

  /** The node is not part of the view. */
  public static readonly BadNodeNotInView = 0x804B0000;

  /** The number was not accepted because of a numeric overflow. */
  public static readonly BadNumericOverflow = 0x81120000;

  /** The ServerUri is not a valid URI. */
  public static readonly BadServerUriInvalid = 0x804C0000;

  /** No ServerName was specified. */
  public static readonly BadServerNameMissing = 0x804D0000;

  /** No DiscoveryUrl was specified. */
  public static readonly BadDiscoveryUrlMissing = 0x804E0000;

  /** The semaphore file specified by the client is not valid. */
  public static readonly BadSempahoreFileMissing = 0x804F0000;

  /** The security token request type is not valid. */
  public static readonly BadRequestTypeInvalid = 0x80500000;

  /** The security mode does not meet the requirements set by the server. */
  public static readonly BadSecurityModeInsufficient = 0x80E60000;

  /** The security policy does not meet the requirements set by the server. */
  public static readonly BadSecurityPolicyRejected = 0x80510000;

  /** The server has reached its maximum number of sessions. */
  public static readonly BadTooManySessions = 0x80520000;

  /** The user token signature is missing or invalid. */
  public static readonly BadUserSignatureInvalid = 0x80530000;

  /** The signature generated with the client certificate is missing or invalid. */
  public static readonly BadApplicationSignatureInvalid = 0x80540000;

  /** The client did not provide at least one software certificate that is valid and meets the profile requirements for the server. */
  public static readonly BadNoValidCertificates = 0x80550000;

  /** The server does not support changing the user identity assigned to the session. */
  public static readonly BadIdentityChangeNotSupported = 0x80C60000;

  /** The request was cancelled by the client with the Cancel service. */
  public static readonly BadRequestCancelledByRequest = 0x80560000;

  /** The parent node id does not reference a valid node. */
  public static readonly BadParentNodeIdInvalid = 0x80570000;

  /** The reference could not be created because it violates constraints imposed by the server. */
  public static readonly BadReferenceNotAllowed = 0x80580000;

  /** The requested node id was rejected because it was either invalid or server does not allow node ids to be specified by the client. */
  public static readonly BadNodeIdRejected = 0x80590000;

  /** The requested node id is already used by another node. */
  public static readonly BadNodeIdExists = 0x805A0000;

  /** The node class is not valid. */
  public static readonly BadNodeClassInvalid = 0x805B0000;

  /** The browse name is invalid. */
  public static readonly BadBrowseNameInvalid = 0x805C0000;

  /** The browse name is not unique among nodes that share the same relationship with the parent. */
  public static readonly BadBrowseNameDuplicated = 0x805D0000;

  /** The node attributes are not valid for the node class. */
  public static readonly BadNodeAttributesInvalid = 0x805E0000;

  /** The type definition node id does not reference an appropriate type node. */
  public static readonly BadTypeDefinitionInvalid = 0x805F0000;

  /** The source node id does not reference a valid node. */
  public static readonly BadSourceNodeIdInvalid = 0x80600000;

  /** The target node id does not reference a valid node. */
  public static readonly BadTargetNodeIdInvalid = 0x80610000;

  /** The reference type between the nodes is already defined. */
  public static readonly BadDuplicateReferenceNotAllowed = 0x80620000;

  /** The server does not allow this type of self reference on this node. */
  public static readonly BadInvalidSelfReference = 0x80630000;

  /** The reference type is not valid for a reference to a remote server. */
  public static readonly BadReferenceLocalOnly = 0x80640000;

  /** The server will not allow the node to be deleted. */
  public static readonly BadNoDeleteRights = 0x80650000;



  /** The server index is not valid. */
  public static readonly BadServerIndexInvalid = 0x80660000;

  /** The view id does not refer to a valid view node. */
  public static readonly BadViewIdUnknown = 0x80670000;

  /** The view timestamp is not available or not supported. */
  public static readonly BadViewTimestampInvalid = 0x80C90000;

  /** The view parameters are not consistent with each other. */
  public static readonly BadViewParameterMismatch = 0x80CA0000;

  /** The view version is not available or not supported. */
  public static readonly BadViewVersionInvalid = 0x80CB0000;

  /** The server should have followed a reference to a node in a remote server but did not. */
  public static readonly GoodResultsMayBeIncomplete = 0x00BA0000;

  /** The provided Nodeid was not a type definition nodeid. */
  public static readonly BadNotTypeDefinition = 0x80C80000;

  /** The requested operation has too many matches to return. */
  public static readonly BadTooManyMatches = 0x806D0000;

  /** The requested operation requires too many resources in the server. */
  public static readonly BadQueryTooComplex = 0x806E0000;

  /** The requested operation has no match to return. */
  public static readonly BadNoMatch = 0x806F0000;

  /** The max age parameter is invalid. */
  public static readonly BadMaxAgeInvalid = 0x80700000;

  /** The operation is not permitted over the current secure channel. */
  public static readonly BadSecurityModeRejected = 0x80710000;

  /** The history details parameter is not valid. */
  public static readonly BadHistoryOperationInvalid = 0x80720000;

  /** The server does not support the requested operation. */
  public static readonly BadHistoryOperationUnsupported = 0x80730000;

  /** The defined timestamp to return was invalid. */
  public static readonly BadInvalidTimestampArgument = 0x80BD0000;

  /** The value supplied for the attribute is not of the same type as the attribute's value. */
  public static readonly BadTypeMismatch = 0x80740000;

  /** The method id does not refer to a method for the specified object. */
  public static readonly BadMethodInvalid = 0x80750000;

  /** The client did not specify all of the input arguments for the method. */
  public static readonly BadArgumentsMissing = 0x80760000;

  /** The executable attribute does not allow the execution of the method. */
  public static readonly BadNotExecutable = 0x81110000;

  /** The server has reached its maximum number of subscriptions. */
  public static readonly BadTooManySubscriptions = 0x80770000;

  /** The server has reached the maximum number of queued publish requests. */
  public static readonly BadTooManyPublishRequests = 0x80780000;

  /** There is no subscription available for this session. */
  public static readonly BadNoSubscription = 0x80790000;

  /** The sequence number is unknown to the server. */
  public static readonly BadSequenceNumberUnknown = 0x807A0000;

  /** The requested notification message is no longer available. */
  public static readonly BadMessageNotAvailable = 0x807B0000;

  /** The client of the current session does not support one or more Profiles that are necessary for the subscription. */
  public static readonly BadInsufficientClientProfile = 0x807C0000;

  /** The sub-state machine is not currently active. */
  public static readonly BadStateNotActive = 0x80BF0000;

  /** An equivalent rule already exists. */
  public static readonly BadAlreadyExists = 0x81150000;

  /** The server cannot process the request because it is too busy. */
  public static readonly BadTcpServerTooBusy = 0x807D0000;

  /** The type of the message specified in the header invalid. */
  public static readonly BadTcpMessageTypeInvalid = 0x807E0000;

  /** The SecureChannelId and/or TokenId are not currently in use. */
  public static readonly BadTcpSecureChannelUnknown = 0x807F0000;

  /** The size of the message specified in the header is too large. */
  public static readonly BadTcpMessageTooLarge = 0x80800000;

  /** There are not enough resources to process the request. */
  public static readonly BadTcpNotEnoughResources = 0x80810000;

  /** An internal error occurred. */
  public static readonly BadTcpInternalError = 0x80820000;

  /** The server does not recognize the QueryString specified. */
  public static readonly BadTcpEndpointUrlInvalid = 0x80830000;

  /** The request could not be sent because of a network interruption. */
  public static readonly BadRequestInterrupted = 0x80840000;

  /** Timeout occurred while processing the request. */
  public static readonly BadRequestTimeout = 0x80850000;

  /** The secure channel has been closed. */
  public static readonly BadSecureChannelClosed = 0x80860000;

  /** The token has expired or is not recognized. */
  public static readonly BadSecureChannelTokenUnknown = 0x80870000;

  /** The sequence number is not valid. */
  public static readonly BadSequenceNumberInvalid = 0x80880000;

  /** The applications do not have compatible protocol versions. */
  public static readonly BadProtocolVersionUnsupported = 0x80BE0000;

  /** There is a problem with the configuration that affects the usefulness of the value. */
  public static readonly BadConfigurationError = 0x80890000;

  /** The variable should receive its value from another variable, but has never been configured to do so. */
  public static readonly BadNotConnected = 0x808A0000;

  /** There has been a failure in the device/data source that generates the value that has affected the value. */
  public static readonly BadDeviceFailure = 0x808B0000;

  /** There has been a failure in the sensor from which the value is derived by the device/data source. */
  public static readonly BadSensorFailure = 0x808C0000;

  /** The source of the data is not operational. */
  public static readonly BadOutOfService = 0x808D0000;

  /** The deadband filter is not valid. */
  public static readonly BadDeadbandFilterInvalid = 0x808E0000;
}

/**
 * Mapping of status code values to symbolic names
 */
const StatusCodeNames: Record<number, string> = {
  [StatusCode.Good]: 'Good',
  [StatusCode.Uncertain]: 'Uncertain',
  [StatusCode.Bad]: 'Bad',
  [StatusCode.GoodClamped]: 'GoodClamped',
  [StatusCode.GoodCommunicationEvent]: 'GoodCommunicationEvent',
  [StatusCode.GoodDataIgnored]: 'GoodDataIgnored',
  [StatusCode.GoodEntryInserted]: 'GoodEntryInserted',
  [StatusCode.GoodEntryReplaced]: 'GoodEntryReplaced',
  [StatusCode.GoodLocalOverride]: 'GoodLocalOverride',
  [StatusCode.GoodMoreData]: 'GoodMoreData',
  [StatusCode.GoodNoData]: 'GoodNoData',
  [StatusCode.GoodShutdownEvent]: 'GoodShutdownEvent',
  [StatusCode.GoodSubscriptionTransferred]: 'GoodSubscriptionTransferred',
  [StatusCode.UncertainDataSubNormal]: 'UncertainDataSubNormal',
  [StatusCode.UncertainDominantValueChanged]: 'UncertainDominantValueChanged',
  [StatusCode.UncertainEngineeringUnitsExceeded]: 'UncertainEngineeringUnitsExceeded',
  [StatusCode.UncertainInitialValue]: 'UncertainInitialValue',
  [StatusCode.UncertainLastUsableValue]: 'UncertainLastUsableValue',
  [StatusCode.UncertainNoCommunicationLastUsableValue]: 'UncertainNoCommunicationLastUsableValue',
  [StatusCode.UncertainNotAllNodesAvailable]: 'UncertainNotAllNodesAvailable',
  [StatusCode.UncertainReferenceNotDeleted]: 'UncertainReferenceNotDeleted',
  [StatusCode.UncertainReferenceOutOfServer]: 'UncertainReferenceOutOfServer',
  [StatusCode.UncertainSensorCalibration]: 'UncertainSensorCalibration',
  [StatusCode.UncertainSensorNotAccurate]: 'UncertainSensorNotAccurate',
  [StatusCode.UncertainSubstituteValue]: 'UncertainSubstituteValue',
  [StatusCode.BadUnexpectedError]: 'BadUnexpectedError',
  [StatusCode.BadInternalError]: 'BadInternalError',
  [StatusCode.BadOutOfMemory]: 'BadOutOfMemory',
  [StatusCode.BadResourceUnavailable]: 'BadResourceUnavailable',
  [StatusCode.BadCommunicationError]: 'BadCommunicationError',
  [StatusCode.BadEncodingError]: 'BadEncodingError',
  [StatusCode.BadDecodingError]: 'BadDecodingError',
  [StatusCode.BadEncodingLimitsExceeded]: 'BadEncodingLimitsExceeded',
  [StatusCode.BadRequestTooLarge]: 'BadRequestTooLarge',
  [StatusCode.BadResponseTooLarge]: 'BadResponseTooLarge',
  [StatusCode.BadUnknownResponse]: 'BadUnknownResponse',
  [StatusCode.BadTimeout]: 'BadTimeout',
  [StatusCode.BadServiceUnsupported]: 'BadServiceUnsupported',
  [StatusCode.BadShutdown]: 'BadShutdown',
  [StatusCode.BadServerNotConnected]: 'BadServerNotConnected',
  [StatusCode.BadServerHalted]: 'BadServerHalted',
  [StatusCode.BadNothingToDo]: 'BadNothingToDo',
  [StatusCode.BadTooManyOperations]: 'BadTooManyOperations',
  [StatusCode.BadTooManyMonitoredItems]: 'BadTooManyMonitoredItems',
  [StatusCode.BadDataTypeIdUnknown]: 'BadDataTypeIdUnknown',
  [StatusCode.BadCertificateInvalid]: 'BadCertificateInvalid',
  [StatusCode.BadSecurityChecksFailed]: 'BadSecurityChecksFailed',
  [StatusCode.BadCertificatePolicyCheckFailed]: 'BadCertificatePolicyCheckFailed',
  [StatusCode.BadCertificateTimeInvalid]: 'BadCertificateTimeInvalid',
  [StatusCode.BadCertificateIssuerTimeInvalid]: 'BadCertificateIssuerTimeInvalid',
  [StatusCode.BadCertificateHostNameInvalid]: 'BadCertificateHostNameInvalid',
  [StatusCode.BadCertificateUriInvalid]: 'BadCertificateUriInvalid',
  [StatusCode.BadCertificateUseNotAllowed]: 'BadCertificateUseNotAllowed',
  [StatusCode.BadCertificateIssuerUseNotAllowed]: 'BadCertificateIssuerUseNotAllowed',
  [StatusCode.BadCertificateUntrusted]: 'BadCertificateUntrusted',
  [StatusCode.BadCertificateRevocationUnknown]: 'BadCertificateRevocationUnknown',
  [StatusCode.BadCertificateIssuerRevocationUnknown]: 'BadCertificateIssuerRevocationUnknown',
  [StatusCode.BadCertificateRevoked]: 'BadCertificateRevoked',
  [StatusCode.BadCertificateIssuerRevoked]: 'BadCertificateIssuerRevoked',
  [StatusCode.BadCertificateChainIncomplete]: 'BadCertificateChainIncomplete',
  [StatusCode.BadUserAccessDenied]: 'BadUserAccessDenied',
  [StatusCode.BadIdentityTokenInvalid]: 'BadIdentityTokenInvalid',
  [StatusCode.BadIdentityTokenRejected]: 'BadIdentityTokenRejected',
  [StatusCode.BadSecureChannelIdInvalid]: 'BadSecureChannelIdInvalid',
  [StatusCode.BadInvalidTimestamp]: 'BadInvalidTimestamp',
  [StatusCode.BadNonceInvalid]: 'BadNonceInvalid',
  [StatusCode.BadSessionIdInvalid]: 'BadSessionIdInvalid',
  [StatusCode.BadSessionClosed]: 'BadSessionClosed',
  [StatusCode.BadSessionNotActivated]: 'BadSessionNotActivated',
  [StatusCode.BadSubscriptionIdInvalid]: 'BadSubscriptionIdInvalid',
  [StatusCode.BadRequestHeaderInvalid]: 'BadRequestHeaderInvalid',
  [StatusCode.BadTimestampsToReturnInvalid]: 'BadTimestampsToReturnInvalid',
  [StatusCode.BadRequestCancelledByClient]: 'BadRequestCancelledByClient',
  [StatusCode.BadTooManyArguments]: 'BadTooManyArguments',
  [StatusCode.BadLicenseExpired]: 'BadLicenseExpired',
  [StatusCode.BadLicenseLimitsExceeded]: 'BadLicenseLimitsExceeded',
  [StatusCode.BadLicenseNotAvailable]: 'BadLicenseNotAvailable',
  [StatusCode.BadAttributeIdInvalid]: 'BadAttributeIdInvalid',
  [StatusCode.BadIndexRangeInvalid]: 'BadIndexRangeInvalid',
  [StatusCode.BadIndexRangeNoData]: 'BadIndexRangeNoData',
  [StatusCode.BadDataEncodingInvalid]: 'BadDataEncodingInvalid',
  [StatusCode.BadDataEncodingUnsupported]: 'BadDataEncodingUnsupported',
  [StatusCode.BadNotReadable]: 'BadNotReadable',
  [StatusCode.BadNotWritable]: 'BadNotWritable',
  [StatusCode.BadOutOfRange]: 'BadOutOfRange',
  [StatusCode.BadNotSupported]: 'BadNotSupported',
  [StatusCode.BadNotFound]: 'BadNotFound',
  [StatusCode.BadObjectDeleted]: 'BadObjectDeleted',
  [StatusCode.BadNotImplemented]: 'BadNotImplemented',
  [StatusCode.BadMonitoringModeInvalid]: 'BadMonitoringModeInvalid',
  [StatusCode.BadMonitoredItemIdInvalid]: 'BadMonitoredItemIdInvalid',
  [StatusCode.BadMonitoredItemFilterInvalid]: 'BadMonitoredItemFilterInvalid',
  [StatusCode.BadMonitoredItemFilterUnsupported]: 'BadMonitoredItemFilterUnsupported',
  [StatusCode.BadFilterNotAllowed]: 'BadFilterNotAllowed',
  [StatusCode.BadStructureMissing]: 'BadStructureMissing',
  [StatusCode.BadEventFilterInvalid]: 'BadEventFilterInvalid',
  [StatusCode.BadContentFilterInvalid]: 'BadContentFilterInvalid',
  [StatusCode.BadFilterOperatorInvalid]: 'BadFilterOperatorInvalid',
  [StatusCode.BadFilterOperatorUnsupported]: 'BadFilterOperatorUnsupported',
  [StatusCode.BadFilterOperandCountMismatch]: 'BadFilterOperandCountMismatch',
  [StatusCode.BadFilterOperandInvalid]: 'BadFilterOperandInvalid',
  [StatusCode.BadFilterElementInvalid]: 'BadFilterElementInvalid',
  [StatusCode.BadFilterLiteralInvalid]: 'BadFilterLiteralInvalid',
  [StatusCode.BadContinuationPointInvalid]: 'BadContinuationPointInvalid',
  [StatusCode.BadNoContinuationPoints]: 'BadNoContinuationPoints',
  [StatusCode.BadReferenceTypeIdInvalid]: 'BadReferenceTypeIdInvalid',
  [StatusCode.BadBrowseDirectionInvalid]: 'BadBrowseDirectionInvalid',
  [StatusCode.BadNodeNotInView]: 'BadNodeNotInView',
  [StatusCode.BadNumericOverflow]: 'BadNumericOverflow',
  [StatusCode.BadServerUriInvalid]: 'BadServerUriInvalid',
  [StatusCode.BadServerNameMissing]: 'BadServerNameMissing',
  [StatusCode.BadDiscoveryUrlMissing]: 'BadDiscoveryUrlMissing',
  [StatusCode.BadSempahoreFileMissing]: 'BadSempahoreFileMissing',
  [StatusCode.BadRequestTypeInvalid]: 'BadRequestTypeInvalid',
  [StatusCode.BadSecurityModeRejected]: 'BadSecurityModeRejected',
  [StatusCode.BadTooManySessions]: 'BadTooManySessions',
  [StatusCode.BadUserSignatureInvalid]: 'BadUserSignatureInvalid',
  [StatusCode.BadApplicationSignatureInvalid]: 'BadApplicationSignatureInvalid',
  [StatusCode.BadNoValidCertificates]: 'BadNoValidCertificates',
  [StatusCode.BadRequestCancelledByRequest]: 'BadRequestCancelledByRequest',
  [StatusCode.BadParentNodeIdInvalid]: 'BadParentNodeIdInvalid',
  [StatusCode.BadReferenceNotAllowed]: 'BadReferenceNotAllowed',
  [StatusCode.BadNodeIdRejected]: 'BadNodeIdRejected',
  [StatusCode.BadNodeIdExists]: 'BadNodeIdExists',
  [StatusCode.BadNodeClassInvalid]: 'BadNodeClassInvalid',
  [StatusCode.BadBrowseNameDuplicated]: 'BadBrowseNameDuplicated',
  [StatusCode.BadNodeAttributesInvalid]: 'BadNodeAttributesInvalid',
  [StatusCode.BadTypeDefinitionInvalid]: 'BadTypeDefinitionInvalid',
  [StatusCode.BadSourceNodeIdInvalid]: 'BadSourceNodeIdInvalid',
  [StatusCode.BadTargetNodeIdInvalid]: 'BadTargetNodeIdInvalid',
  [StatusCode.BadDuplicateReferenceNotAllowed]: 'BadDuplicateReferenceNotAllowed',
  [StatusCode.BadInvalidSelfReference]: 'BadInvalidSelfReference',
  [StatusCode.BadReferenceLocalOnly]: 'BadReferenceLocalOnly',
  [StatusCode.BadNoDeleteRights]: 'BadNoDeleteRights',
};
