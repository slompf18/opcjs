/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * 
 * This file was automatically generated from OPC UA NodeSet2 XML.
 * 
 * Source: Opc.Ua.NodeSet2.Services.xml
 * Generated: 2026-02-27T12:42:09.143Z
 * Generator: @opcua/nodeset-generator
 * 
 * Any changes made to this file will be lost when regenerated.
 */

import { Encoder } from 'opcjs-base';
import {
    encodeUnion,
    encodeKeyValuePair,
    encodeAdditionalParametersType,
    encodeEphemeralKeyType,
    encodeEndpointType,
    encodeBitFieldDefinition,
    encodeRationalNumber,
    encodeVector,
    encodeCartesianCoordinates,
    encodeOrientation,
    encodeFrame,
    encodeIdentityMappingRuleType,
    encodeCurrencyUnitType,
    encodeAnnotationDataType,
    encodeLinearConversionDataType,
    encodeQuantityDimension,
    encodeTrustListDataType,
    encodeBaseConfigurationDataType,
    encodeBaseConfigurationRecordDataType,
    encodeCertificateGroupDataType,
    encodeConfigurationUpdateTargetType,
    encodeTransactionErrorType,
    encodeApplicationConfigurationDataType,
    encodeApplicationIdentityDataType,
    encodeEndpointDataType,
    encodeServerEndpointDataType,
    encodeSecuritySettingsDataType,
    encodeUserTokenSettingsDataType,
    encodeServiceCertificateDataType,
    encodeAuthorizationServiceConfigurationDataType,
    encodeDecimalDataType,
    encodeDataTypeSchemaHeader,
    encodeDataTypeDescription,
    encodeStructureDescription,
    encodeEnumDescription,
    encodeSimpleTypeDescription,
    encodeUABinaryFileDataType,
    encodePortableQualifiedName,
    encodePortableNodeId,
    encodeUnsignedRationalNumber,
    encodeDataSetMetaDataType,
    encodeFieldMetaData,
    encodeConfigurationVersionDataType,
    encodePublishedDataSetDataType,
    encodePublishedDataSetSourceDataType,
    encodePublishedVariableDataType,
    encodePublishedDataItemsDataType,
    encodePublishedEventsDataType,
    encodePublishedDataSetCustomSourceDataType,
    encodeActionTargetDataType,
    encodePublishedActionDataType,
    encodeActionMethodDataType,
    encodePublishedActionMethodDataType,
    encodeDataSetWriterDataType,
    encodeDataSetWriterTransportDataType,
    encodeDataSetWriterMessageDataType,
    encodePubSubGroupDataType,
    encodeWriterGroupDataType,
    encodeWriterGroupTransportDataType,
    encodeWriterGroupMessageDataType,
    encodePubSubConnectionDataType,
    encodeConnectionTransportDataType,
    encodeNetworkAddressDataType,
    encodeNetworkAddressUrlDataType,
    encodeReaderGroupDataType,
    encodeReaderGroupTransportDataType,
    encodeReaderGroupMessageDataType,
    encodeDataSetReaderDataType,
    encodeDataSetReaderTransportDataType,
    encodeDataSetReaderMessageDataType,
    encodeSubscribedDataSetDataType,
    encodeTargetVariablesDataType,
    encodeFieldTargetDataType,
    encodeSubscribedDataSetMirrorDataType,
    encodePubSubConfigurationDataType,
    encodeStandaloneSubscribedDataSetRefDataType,
    encodeStandaloneSubscribedDataSetDataType,
    encodeSecurityGroupDataType,
    encodePubSubKeyPushTargetDataType,
    encodePubSubConfiguration2DataType,
    encodeUadpWriterGroupMessageDataType,
    encodeUadpDataSetWriterMessageDataType,
    encodeUadpDataSetReaderMessageDataType,
    encodeJsonWriterGroupMessageDataType,
    encodeJsonDataSetWriterMessageDataType,
    encodeJsonDataSetReaderMessageDataType,
    encodeQosDataType,
    encodeTransmitQosDataType,
    encodeTransmitQosPriorityDataType,
    encodeReceiveQosDataType,
    encodeReceiveQosPriorityDataType,
    encodeDatagramConnectionTransportDataType,
    encodeDatagramConnectionTransport2DataType,
    encodeDatagramWriterGroupTransportDataType,
    encodeDatagramWriterGroupTransport2DataType,
    encodeDatagramDataSetReaderTransportDataType,
    encodeDtlsPubSubConnectionDataType,
    encodeBrokerConnectionTransportDataType,
    encodeBrokerWriterGroupTransportDataType,
    encodeBrokerDataSetWriterTransportDataType,
    encodeBrokerDataSetReaderTransportDataType,
    encodePubSubConfigurationRefDataType,
    encodePubSubConfigurationValueDataType,
    encodeJsonNetworkMessage,
    encodeJsonDataSetMessage,
    encodeJsonDataSetMetaDataMessage,
    encodeJsonApplicationDescriptionMessage,
    encodeJsonServerEndpointsMessage,
    encodeJsonStatusMessage,
    encodeJsonPubSubConnectionMessage,
    encodeJsonActionMetaDataMessage,
    encodeJsonActionResponderMessage,
    encodeJsonActionNetworkMessage,
    encodeJsonActionRequestMessage,
    encodeJsonActionResponseMessage,
    encodeAliasNameDataType,
    encodeUserManagementDataType,
    encodePriorityMappingEntryType,
    encodeLldpManagementAddressTxPortType,
    encodeLldpManagementAddressType,
    encodeLldpTlvType,
    encodeReferenceDescriptionDataType,
    encodeReferenceListEntryDataType,
    encodeLogRecord,
    encodeLogRecordsDataType,
    encodeSpanContextDataType,
    encodeTraceContextDataType,
    encodeNameValuePair,
    encodeRolePermissionType,
    encodeDataTypeDefinition,
    encodeStructureField,
    encodeStructureDefinition,
    encodeEnumDefinition,
    encodeNode,
    encodeInstanceNode,
    encodeTypeNode,
    encodeObjectNode,
    encodeObjectTypeNode,
    encodeVariableNode,
    encodeVariableTypeNode,
    encodeReferenceTypeNode,
    encodeMethodNode,
    encodeViewNode,
    encodeDataTypeNode,
    encodeReferenceNode,
    encodeArgument,
    encodeEnumValueType,
    encodeEnumField,
    encodeOptionSet,
    encodeTimeZoneDataType,
    encodeApplicationDescription,
    encodeRequestHeader,
    encodeResponseHeader,
    encodeServiceFault,
    encodeSessionlessInvokeRequestType,
    encodeSessionlessInvokeResponseType,
    encodeFindServersRequest,
    encodeFindServersResponse,
    encodeServerOnNetwork,
    encodeFindServersOnNetworkRequest,
    encodeFindServersOnNetworkResponse,
    encodeUserTokenPolicy,
    encodeEndpointDescription,
    encodeGetEndpointsRequest,
    encodeGetEndpointsResponse,
    encodeRegisteredServer,
    encodeRegisterServerRequest,
    encodeRegisterServerResponse,
    encodeDiscoveryConfiguration,
    encodeMdnsDiscoveryConfiguration,
    encodeRegisterServer2Request,
    encodeRegisterServer2Response,
    encodeChannelSecurityToken,
    encodeOpenSecureChannelRequest,
    encodeOpenSecureChannelResponse,
    encodeCloseSecureChannelRequest,
    encodeCloseSecureChannelResponse,
    encodeSignedSoftwareCertificate,
    encodeSignatureData,
    encodeCreateSessionRequest,
    encodeCreateSessionResponse,
    encodeUserIdentityToken,
    encodeAnonymousIdentityToken,
    encodeUserNameIdentityToken,
    encodeX509IdentityToken,
    encodeIssuedIdentityToken,
    encodeActivateSessionRequest,
    encodeActivateSessionResponse,
    encodeCloseSessionRequest,
    encodeCloseSessionResponse,
    encodeCancelRequest,
    encodeCancelResponse,
    encodeNodeAttributes,
    encodeObjectAttributes,
    encodeVariableAttributes,
    encodeMethodAttributes,
    encodeObjectTypeAttributes,
    encodeVariableTypeAttributes,
    encodeReferenceTypeAttributes,
    encodeDataTypeAttributes,
    encodeViewAttributes,
    encodeGenericAttributeValue,
    encodeGenericAttributes,
    encodeAddNodesItem,
    encodeAddNodesResult,
    encodeAddNodesRequest,
    encodeAddNodesResponse,
    encodeAddReferencesItem,
    encodeAddReferencesRequest,
    encodeAddReferencesResponse,
    encodeDeleteNodesItem,
    encodeDeleteNodesRequest,
    encodeDeleteNodesResponse,
    encodeDeleteReferencesItem,
    encodeDeleteReferencesRequest,
    encodeDeleteReferencesResponse,
    encodeViewDescription,
    encodeBrowseDescription,
    encodeReferenceDescription,
    encodeBrowseResult,
    encodeBrowseRequest,
    encodeBrowseResponse,
    encodeBrowseNextRequest,
    encodeBrowseNextResponse,
    encodeRelativePathElement,
    encodeRelativePath,
    encodeBrowsePath,
    encodeBrowsePathTarget,
    encodeBrowsePathResult,
    encodeTranslateBrowsePathsToNodeIdsRequest,
    encodeTranslateBrowsePathsToNodeIdsResponse,
    encodeRegisterNodesRequest,
    encodeRegisterNodesResponse,
    encodeUnregisterNodesRequest,
    encodeUnregisterNodesResponse,
    encodeEndpointConfiguration,
    encodeQueryDataDescription,
    encodeNodeTypeDescription,
    encodeQueryDataSet,
    encodeNodeReference,
    encodeContentFilterElement,
    encodeContentFilter,
    encodeFilterOperand,
    encodeElementOperand,
    encodeLiteralOperand,
    encodeAttributeOperand,
    encodeSimpleAttributeOperand,
    encodeContentFilterElementResult,
    encodeContentFilterResult,
    encodeParsingResult,
    encodeQueryFirstRequest,
    encodeQueryFirstResponse,
    encodeQueryNextRequest,
    encodeQueryNextResponse,
    encodeReadValueId,
    encodeReadRequest,
    encodeReadResponse,
    encodeHistoryReadValueId,
    encodeHistoryReadResult,
    encodeHistoryReadDetails,
    encodeReadEventDetails,
    encodeReadEventDetails2,
    encodeSortRuleElement,
    encodeReadEventDetailsSorted,
    encodeReadRawModifiedDetails,
    encodeReadProcessedDetails,
    encodeReadAtTimeDetails,
    encodeReadAnnotationDataDetails,
    encodeHistoryData,
    encodeModificationInfo,
    encodeHistoryModifiedData,
    encodeHistoryEvent,
    encodeHistoryModifiedEvent,
    encodeHistoryReadRequest,
    encodeHistoryReadResponse,
    encodeWriteValue,
    encodeWriteRequest,
    encodeWriteResponse,
    encodeHistoryUpdateDetails,
    encodeUpdateDataDetails,
    encodeUpdateStructureDataDetails,
    encodeUpdateEventDetails,
    encodeDeleteRawModifiedDetails,
    encodeDeleteAtTimeDetails,
    encodeDeleteEventDetails,
    encodeHistoryUpdateResult,
    encodeHistoryUpdateRequest,
    encodeHistoryUpdateResponse,
    encodeCallMethodRequest,
    encodeCallMethodResult,
    encodeCallRequest,
    encodeCallResponse,
    encodeMonitoringFilter,
    encodeDataChangeFilter,
    encodeEventFilter,
    encodeAggregateConfiguration,
    encodeAggregateFilter,
    encodeMonitoringFilterResult,
    encodeEventFilterResult,
    encodeAggregateFilterResult,
    encodeMonitoringParameters,
    encodeMonitoredItemCreateRequest,
    encodeMonitoredItemCreateResult,
    encodeCreateMonitoredItemsRequest,
    encodeCreateMonitoredItemsResponse,
    encodeMonitoredItemModifyRequest,
    encodeMonitoredItemModifyResult,
    encodeModifyMonitoredItemsRequest,
    encodeModifyMonitoredItemsResponse,
    encodeSetMonitoringModeRequest,
    encodeSetMonitoringModeResponse,
    encodeSetTriggeringRequest,
    encodeSetTriggeringResponse,
    encodeDeleteMonitoredItemsRequest,
    encodeDeleteMonitoredItemsResponse,
    encodeCreateSubscriptionRequest,
    encodeCreateSubscriptionResponse,
    encodeModifySubscriptionRequest,
    encodeModifySubscriptionResponse,
    encodeSetPublishingModeRequest,
    encodeSetPublishingModeResponse,
    encodeNotificationMessage,
    encodeNotificationData,
    encodeDataChangeNotification,
    encodeMonitoredItemNotification,
    encodeEventNotificationList,
    encodeEventFieldList,
    encodeHistoryEventFieldList,
    encodeStatusChangeNotification,
    encodeSubscriptionAcknowledgement,
    encodePublishRequest,
    encodePublishResponse,
    encodeRepublishRequest,
    encodeRepublishResponse,
    encodeTransferResult,
    encodeTransferSubscriptionsRequest,
    encodeTransferSubscriptionsResponse,
    encodeDeleteSubscriptionsRequest,
    encodeDeleteSubscriptionsResponse,
    encodeBuildInfo,
    encodeRedundantServerDataType,
    encodeEndpointUrlListDataType,
    encodeNetworkGroupDataType,
    encodeSamplingIntervalDiagnosticsDataType,
    encodeServerDiagnosticsSummaryDataType,
    encodeServerStatusDataType,
    encodeSessionDiagnosticsDataType,
    encodeSessionSecurityDiagnosticsDataType,
    encodeServiceCounterDataType,
    encodeStatusResult,
    encodeSubscriptionDiagnosticsDataType,
    encodeModelChangeStructureDataType,
    encodeSemanticChangeStructureDataType,
    encodeRange,
    encodeEUInformation,
    encodeComplexNumberType,
    encodeDoubleComplexNumberType,
    encodeAxisInformation,
    encodeXVType,
    encodeProgramDiagnosticDataType,
    encodeProgramDiagnostic2DataType,
    encodeAnnotation
} from './encoders.js';

export function registerEncoders(encoder: Encoder){
    encoder.registerType(12756, (w, v) => encodeUnion(w, v, encoder));
    encoder.registerType(14533, (w, v) => encodeKeyValuePair(w, v, encoder));
    encoder.registerType(16313, (w, v) => encodeAdditionalParametersType(w, v, encoder));
    encoder.registerType(17548, (w, v) => encodeEphemeralKeyType(w, v, encoder));
    encoder.registerType(15528, (w, v) => encodeEndpointType(w, v, encoder));
    encoder.registerType(32421, (w, v) => encodeBitFieldDefinition(w, v, encoder));
    encoder.registerType(18806, (w, v) => encodeRationalNumber(w, v, encoder));
    encoder.registerType(18807, (w, v) => encodeVector(w, v, encoder));
    encoder.registerType(18809, (w, v) => encodeCartesianCoordinates(w, v, encoder));
    encoder.registerType(18811, (w, v) => encodeOrientation(w, v, encoder));
    encoder.registerType(18813, (w, v) => encodeFrame(w, v, encoder));
    encoder.registerType(15634, (w, v) => encodeIdentityMappingRuleType(w, v, encoder));
    encoder.registerType(23498, (w, v) => encodeCurrencyUnitType(w, v, encoder));
    encoder.registerType(32434, (w, v) => encodeAnnotationDataType(w, v, encoder));
    encoder.registerType(32435, (w, v) => encodeLinearConversionDataType(w, v, encoder));
    encoder.registerType(32438, (w, v) => encodeQuantityDimension(w, v, encoder));
    encoder.registerType(12554, (w, v) => encodeTrustListDataType(w, v, encoder));
    encoder.registerType(15434, (w, v) => encodeBaseConfigurationDataType(w, v, encoder));
    encoder.registerType(15435, (w, v) => encodeBaseConfigurationRecordDataType(w, v, encoder));
    encoder.registerType(15436, (w, v) => encodeCertificateGroupDataType(w, v, encoder));
    encoder.registerType(15538, (w, v) => encodeConfigurationUpdateTargetType(w, v, encoder));
    encoder.registerType(32285, (w, v) => encodeTransactionErrorType(w, v, encoder));
    encoder.registerType(23743, (w, v) => encodeApplicationConfigurationDataType(w, v, encoder));
    encoder.registerType(15556, (w, v) => encodeApplicationIdentityDataType(w, v, encoder));
    encoder.registerType(15557, (w, v) => encodeEndpointDataType(w, v, encoder));
    encoder.registerType(15558, (w, v) => encodeServerEndpointDataType(w, v, encoder));
    encoder.registerType(15559, (w, v) => encodeSecuritySettingsDataType(w, v, encoder));
    encoder.registerType(15560, (w, v) => encodeUserTokenSettingsDataType(w, v, encoder));
    encoder.registerType(23724, (w, v) => encodeServiceCertificateDataType(w, v, encoder));
    encoder.registerType(23744, (w, v) => encodeAuthorizationServiceConfigurationDataType(w, v, encoder));
    encoder.registerType(17861, (w, v) => encodeDecimalDataType(w, v, encoder));
    encoder.registerType(15534, (w, v) => encodeDataTypeSchemaHeader(w, v, encoder));
    encoder.registerType(14525, (w, v) => encodeDataTypeDescription(w, v, encoder));
    encoder.registerType(15487, (w, v) => encodeStructureDescription(w, v, encoder));
    encoder.registerType(15488, (w, v) => encodeEnumDescription(w, v, encoder));
    encoder.registerType(15005, (w, v) => encodeSimpleTypeDescription(w, v, encoder));
    encoder.registerType(15006, (w, v) => encodeUABinaryFileDataType(w, v, encoder));
    encoder.registerType(24105, (w, v) => encodePortableQualifiedName(w, v, encoder));
    encoder.registerType(24106, (w, v) => encodePortableNodeId(w, v, encoder));
    encoder.registerType(24107, (w, v) => encodeUnsignedRationalNumber(w, v, encoder));
    encoder.registerType(14523, (w, v) => encodeDataSetMetaDataType(w, v, encoder));
    encoder.registerType(14524, (w, v) => encodeFieldMetaData(w, v, encoder));
    encoder.registerType(14593, (w, v) => encodeConfigurationVersionDataType(w, v, encoder));
    encoder.registerType(15578, (w, v) => encodePublishedDataSetDataType(w, v, encoder));
    encoder.registerType(15580, (w, v) => encodePublishedDataSetSourceDataType(w, v, encoder));
    encoder.registerType(14273, (w, v) => encodePublishedVariableDataType(w, v, encoder));
    encoder.registerType(15581, (w, v) => encodePublishedDataItemsDataType(w, v, encoder));
    encoder.registerType(15582, (w, v) => encodePublishedEventsDataType(w, v, encoder));
    encoder.registerType(25269, (w, v) => encodePublishedDataSetCustomSourceDataType(w, v, encoder));
    encoder.registerType(18593, (w, v) => encodeActionTargetDataType(w, v, encoder));
    encoder.registerType(18594, (w, v) => encodePublishedActionDataType(w, v, encoder));
    encoder.registerType(18597, (w, v) => encodeActionMethodDataType(w, v, encoder));
    encoder.registerType(18793, (w, v) => encodePublishedActionMethodDataType(w, v, encoder));
    encoder.registerType(15597, (w, v) => encodeDataSetWriterDataType(w, v, encoder));
    encoder.registerType(15598, (w, v) => encodeDataSetWriterTransportDataType(w, v, encoder));
    encoder.registerType(15605, (w, v) => encodeDataSetWriterMessageDataType(w, v, encoder));
    encoder.registerType(15609, (w, v) => encodePubSubGroupDataType(w, v, encoder));
    encoder.registerType(15480, (w, v) => encodeWriterGroupDataType(w, v, encoder));
    encoder.registerType(15611, (w, v) => encodeWriterGroupTransportDataType(w, v, encoder));
    encoder.registerType(15616, (w, v) => encodeWriterGroupMessageDataType(w, v, encoder));
    encoder.registerType(15617, (w, v) => encodePubSubConnectionDataType(w, v, encoder));
    encoder.registerType(15618, (w, v) => encodeConnectionTransportDataType(w, v, encoder));
    encoder.registerType(15502, (w, v) => encodeNetworkAddressDataType(w, v, encoder));
    encoder.registerType(15510, (w, v) => encodeNetworkAddressUrlDataType(w, v, encoder));
    encoder.registerType(15520, (w, v) => encodeReaderGroupDataType(w, v, encoder));
    encoder.registerType(15621, (w, v) => encodeReaderGroupTransportDataType(w, v, encoder));
    encoder.registerType(15622, (w, v) => encodeReaderGroupMessageDataType(w, v, encoder));
    encoder.registerType(15623, (w, v) => encodeDataSetReaderDataType(w, v, encoder));
    encoder.registerType(15628, (w, v) => encodeDataSetReaderTransportDataType(w, v, encoder));
    encoder.registerType(15629, (w, v) => encodeDataSetReaderMessageDataType(w, v, encoder));
    encoder.registerType(15630, (w, v) => encodeSubscribedDataSetDataType(w, v, encoder));
    encoder.registerType(15631, (w, v) => encodeTargetVariablesDataType(w, v, encoder));
    encoder.registerType(14744, (w, v) => encodeFieldTargetDataType(w, v, encoder));
    encoder.registerType(15635, (w, v) => encodeSubscribedDataSetMirrorDataType(w, v, encoder));
    encoder.registerType(15530, (w, v) => encodePubSubConfigurationDataType(w, v, encoder));
    encoder.registerType(23599, (w, v) => encodeStandaloneSubscribedDataSetRefDataType(w, v, encoder));
    encoder.registerType(23600, (w, v) => encodeStandaloneSubscribedDataSetDataType(w, v, encoder));
    encoder.registerType(23601, (w, v) => encodeSecurityGroupDataType(w, v, encoder));
    encoder.registerType(25270, (w, v) => encodePubSubKeyPushTargetDataType(w, v, encoder));
    encoder.registerType(23602, (w, v) => encodePubSubConfiguration2DataType(w, v, encoder));
    encoder.registerType(15645, (w, v) => encodeUadpWriterGroupMessageDataType(w, v, encoder));
    encoder.registerType(15652, (w, v) => encodeUadpDataSetWriterMessageDataType(w, v, encoder));
    encoder.registerType(15653, (w, v) => encodeUadpDataSetReaderMessageDataType(w, v, encoder));
    encoder.registerType(15657, (w, v) => encodeJsonWriterGroupMessageDataType(w, v, encoder));
    encoder.registerType(15664, (w, v) => encodeJsonDataSetWriterMessageDataType(w, v, encoder));
    encoder.registerType(15665, (w, v) => encodeJsonDataSetReaderMessageDataType(w, v, encoder));
    encoder.registerType(23603, (w, v) => encodeQosDataType(w, v, encoder));
    encoder.registerType(23604, (w, v) => encodeTransmitQosDataType(w, v, encoder));
    encoder.registerType(23605, (w, v) => encodeTransmitQosPriorityDataType(w, v, encoder));
    encoder.registerType(23608, (w, v) => encodeReceiveQosDataType(w, v, encoder));
    encoder.registerType(23609, (w, v) => encodeReceiveQosPriorityDataType(w, v, encoder));
    encoder.registerType(17467, (w, v) => encodeDatagramConnectionTransportDataType(w, v, encoder));
    encoder.registerType(23612, (w, v) => encodeDatagramConnectionTransport2DataType(w, v, encoder));
    encoder.registerType(15532, (w, v) => encodeDatagramWriterGroupTransportDataType(w, v, encoder));
    encoder.registerType(23613, (w, v) => encodeDatagramWriterGroupTransport2DataType(w, v, encoder));
    encoder.registerType(23614, (w, v) => encodeDatagramDataSetReaderTransportDataType(w, v, encoder));
    encoder.registerType(18794, (w, v) => encodeDtlsPubSubConnectionDataType(w, v, encoder));
    encoder.registerType(15007, (w, v) => encodeBrokerConnectionTransportDataType(w, v, encoder));
    encoder.registerType(15667, (w, v) => encodeBrokerWriterGroupTransportDataType(w, v, encoder));
    encoder.registerType(15669, (w, v) => encodeBrokerDataSetWriterTransportDataType(w, v, encoder));
    encoder.registerType(15670, (w, v) => encodeBrokerDataSetReaderTransportDataType(w, v, encoder));
    encoder.registerType(25519, (w, v) => encodePubSubConfigurationRefDataType(w, v, encoder));
    encoder.registerType(25520, (w, v) => encodePubSubConfigurationValueDataType(w, v, encoder));
    encoder.registerType(19311, (w, v) => encodeJsonNetworkMessage(w, v, encoder));
    encoder.registerType(19312, (w, v) => encodeJsonDataSetMessage(w, v, encoder));
    encoder.registerType(19313, (w, v) => encodeJsonDataSetMetaDataMessage(w, v, encoder));
    encoder.registerType(19314, (w, v) => encodeJsonApplicationDescriptionMessage(w, v, encoder));
    encoder.registerType(19315, (w, v) => encodeJsonServerEndpointsMessage(w, v, encoder));
    encoder.registerType(19316, (w, v) => encodeJsonStatusMessage(w, v, encoder));
    encoder.registerType(19317, (w, v) => encodeJsonPubSubConnectionMessage(w, v, encoder));
    encoder.registerType(19318, (w, v) => encodeJsonActionMetaDataMessage(w, v, encoder));
    encoder.registerType(19319, (w, v) => encodeJsonActionResponderMessage(w, v, encoder));
    encoder.registerType(19320, (w, v) => encodeJsonActionNetworkMessage(w, v, encoder));
    encoder.registerType(19321, (w, v) => encodeJsonActionRequestMessage(w, v, encoder));
    encoder.registerType(19322, (w, v) => encodeJsonActionResponseMessage(w, v, encoder));
    encoder.registerType(23468, (w, v) => encodeAliasNameDataType(w, v, encoder));
    encoder.registerType(24281, (w, v) => encodeUserManagementDataType(w, v, encoder));
    encoder.registerType(25220, (w, v) => encodePriorityMappingEntryType(w, v, encoder));
    encoder.registerType(18953, (w, v) => encodeLldpManagementAddressTxPortType(w, v, encoder));
    encoder.registerType(18954, (w, v) => encodeLldpManagementAddressType(w, v, encoder));
    encoder.registerType(18955, (w, v) => encodeLldpTlvType(w, v, encoder));
    encoder.registerType(32659, (w, v) => encodeReferenceDescriptionDataType(w, v, encoder));
    encoder.registerType(32660, (w, v) => encodeReferenceListEntryDataType(w, v, encoder));
    encoder.registerType(19361, (w, v) => encodeLogRecord(w, v, encoder));
    encoder.registerType(19745, (w, v) => encodeLogRecordsDataType(w, v, encoder));
    encoder.registerType(19746, (w, v) => encodeSpanContextDataType(w, v, encoder));
    encoder.registerType(19747, (w, v) => encodeTraceContextDataType(w, v, encoder));
    encoder.registerType(19748, (w, v) => encodeNameValuePair(w, v, encoder));
    encoder.registerType(96, (w, v) => encodeRolePermissionType(w, v, encoder));
    encoder.registerType(97, (w, v) => encodeDataTypeDefinition(w, v, encoder));
    encoder.registerType(101, (w, v) => encodeStructureField(w, v, encoder));
    encoder.registerType(99, (w, v) => encodeStructureDefinition(w, v, encoder));
    encoder.registerType(100, (w, v) => encodeEnumDefinition(w, v, encoder));
    encoder.registerType(258, (w, v) => encodeNode(w, v, encoder));
    encoder.registerType(11879, (w, v) => encodeInstanceNode(w, v, encoder));
    encoder.registerType(11880, (w, v) => encodeTypeNode(w, v, encoder));
    encoder.registerType(261, (w, v) => encodeObjectNode(w, v, encoder));
    encoder.registerType(264, (w, v) => encodeObjectTypeNode(w, v, encoder));
    encoder.registerType(267, (w, v) => encodeVariableNode(w, v, encoder));
    encoder.registerType(270, (w, v) => encodeVariableTypeNode(w, v, encoder));
    encoder.registerType(273, (w, v) => encodeReferenceTypeNode(w, v, encoder));
    encoder.registerType(276, (w, v) => encodeMethodNode(w, v, encoder));
    encoder.registerType(279, (w, v) => encodeViewNode(w, v, encoder));
    encoder.registerType(282, (w, v) => encodeDataTypeNode(w, v, encoder));
    encoder.registerType(285, (w, v) => encodeReferenceNode(w, v, encoder));
    encoder.registerType(296, (w, v) => encodeArgument(w, v, encoder));
    encoder.registerType(7594, (w, v) => encodeEnumValueType(w, v, encoder));
    encoder.registerType(102, (w, v) => encodeEnumField(w, v, encoder));
    encoder.registerType(12755, (w, v) => encodeOptionSet(w, v, encoder));
    encoder.registerType(8912, (w, v) => encodeTimeZoneDataType(w, v, encoder));
    encoder.registerType(308, (w, v) => encodeApplicationDescription(w, v, encoder));
    encoder.registerType(389, (w, v) => encodeRequestHeader(w, v, encoder));
    encoder.registerType(392, (w, v) => encodeResponseHeader(w, v, encoder));
    encoder.registerType(395, (w, v) => encodeServiceFault(w, v, encoder));
    encoder.registerType(15901, (w, v) => encodeSessionlessInvokeRequestType(w, v, encoder));
    encoder.registerType(20999, (w, v) => encodeSessionlessInvokeResponseType(w, v, encoder));
    encoder.registerType(420, (w, v) => encodeFindServersRequest(w, v, encoder));
    encoder.registerType(423, (w, v) => encodeFindServersResponse(w, v, encoder));
    encoder.registerType(12189, (w, v) => encodeServerOnNetwork(w, v, encoder));
    encoder.registerType(12190, (w, v) => encodeFindServersOnNetworkRequest(w, v, encoder));
    encoder.registerType(12191, (w, v) => encodeFindServersOnNetworkResponse(w, v, encoder));
    encoder.registerType(304, (w, v) => encodeUserTokenPolicy(w, v, encoder));
    encoder.registerType(312, (w, v) => encodeEndpointDescription(w, v, encoder));
    encoder.registerType(426, (w, v) => encodeGetEndpointsRequest(w, v, encoder));
    encoder.registerType(429, (w, v) => encodeGetEndpointsResponse(w, v, encoder));
    encoder.registerType(432, (w, v) => encodeRegisteredServer(w, v, encoder));
    encoder.registerType(435, (w, v) => encodeRegisterServerRequest(w, v, encoder));
    encoder.registerType(438, (w, v) => encodeRegisterServerResponse(w, v, encoder));
    encoder.registerType(12890, (w, v) => encodeDiscoveryConfiguration(w, v, encoder));
    encoder.registerType(12891, (w, v) => encodeMdnsDiscoveryConfiguration(w, v, encoder));
    encoder.registerType(12193, (w, v) => encodeRegisterServer2Request(w, v, encoder));
    encoder.registerType(12194, (w, v) => encodeRegisterServer2Response(w, v, encoder));
    encoder.registerType(441, (w, v) => encodeChannelSecurityToken(w, v, encoder));
    encoder.registerType(444, (w, v) => encodeOpenSecureChannelRequest(w, v, encoder));
    encoder.registerType(447, (w, v) => encodeOpenSecureChannelResponse(w, v, encoder));
    encoder.registerType(450, (w, v) => encodeCloseSecureChannelRequest(w, v, encoder));
    encoder.registerType(453, (w, v) => encodeCloseSecureChannelResponse(w, v, encoder));
    encoder.registerType(344, (w, v) => encodeSignedSoftwareCertificate(w, v, encoder));
    encoder.registerType(456, (w, v) => encodeSignatureData(w, v, encoder));
    encoder.registerType(459, (w, v) => encodeCreateSessionRequest(w, v, encoder));
    encoder.registerType(462, (w, v) => encodeCreateSessionResponse(w, v, encoder));
    encoder.registerType(316, (w, v) => encodeUserIdentityToken(w, v, encoder));
    encoder.registerType(319, (w, v) => encodeAnonymousIdentityToken(w, v, encoder));
    encoder.registerType(322, (w, v) => encodeUserNameIdentityToken(w, v, encoder));
    encoder.registerType(325, (w, v) => encodeX509IdentityToken(w, v, encoder));
    encoder.registerType(938, (w, v) => encodeIssuedIdentityToken(w, v, encoder));
    encoder.registerType(465, (w, v) => encodeActivateSessionRequest(w, v, encoder));
    encoder.registerType(468, (w, v) => encodeActivateSessionResponse(w, v, encoder));
    encoder.registerType(471, (w, v) => encodeCloseSessionRequest(w, v, encoder));
    encoder.registerType(474, (w, v) => encodeCloseSessionResponse(w, v, encoder));
    encoder.registerType(477, (w, v) => encodeCancelRequest(w, v, encoder));
    encoder.registerType(480, (w, v) => encodeCancelResponse(w, v, encoder));
    encoder.registerType(349, (w, v) => encodeNodeAttributes(w, v, encoder));
    encoder.registerType(352, (w, v) => encodeObjectAttributes(w, v, encoder));
    encoder.registerType(355, (w, v) => encodeVariableAttributes(w, v, encoder));
    encoder.registerType(358, (w, v) => encodeMethodAttributes(w, v, encoder));
    encoder.registerType(361, (w, v) => encodeObjectTypeAttributes(w, v, encoder));
    encoder.registerType(364, (w, v) => encodeVariableTypeAttributes(w, v, encoder));
    encoder.registerType(367, (w, v) => encodeReferenceTypeAttributes(w, v, encoder));
    encoder.registerType(370, (w, v) => encodeDataTypeAttributes(w, v, encoder));
    encoder.registerType(373, (w, v) => encodeViewAttributes(w, v, encoder));
    encoder.registerType(17606, (w, v) => encodeGenericAttributeValue(w, v, encoder));
    encoder.registerType(17607, (w, v) => encodeGenericAttributes(w, v, encoder));
    encoder.registerType(376, (w, v) => encodeAddNodesItem(w, v, encoder));
    encoder.registerType(483, (w, v) => encodeAddNodesResult(w, v, encoder));
    encoder.registerType(486, (w, v) => encodeAddNodesRequest(w, v, encoder));
    encoder.registerType(489, (w, v) => encodeAddNodesResponse(w, v, encoder));
    encoder.registerType(379, (w, v) => encodeAddReferencesItem(w, v, encoder));
    encoder.registerType(492, (w, v) => encodeAddReferencesRequest(w, v, encoder));
    encoder.registerType(495, (w, v) => encodeAddReferencesResponse(w, v, encoder));
    encoder.registerType(382, (w, v) => encodeDeleteNodesItem(w, v, encoder));
    encoder.registerType(498, (w, v) => encodeDeleteNodesRequest(w, v, encoder));
    encoder.registerType(501, (w, v) => encodeDeleteNodesResponse(w, v, encoder));
    encoder.registerType(385, (w, v) => encodeDeleteReferencesItem(w, v, encoder));
    encoder.registerType(504, (w, v) => encodeDeleteReferencesRequest(w, v, encoder));
    encoder.registerType(507, (w, v) => encodeDeleteReferencesResponse(w, v, encoder));
    encoder.registerType(511, (w, v) => encodeViewDescription(w, v, encoder));
    encoder.registerType(514, (w, v) => encodeBrowseDescription(w, v, encoder));
    encoder.registerType(518, (w, v) => encodeReferenceDescription(w, v, encoder));
    encoder.registerType(522, (w, v) => encodeBrowseResult(w, v, encoder));
    encoder.registerType(525, (w, v) => encodeBrowseRequest(w, v, encoder));
    encoder.registerType(528, (w, v) => encodeBrowseResponse(w, v, encoder));
    encoder.registerType(531, (w, v) => encodeBrowseNextRequest(w, v, encoder));
    encoder.registerType(534, (w, v) => encodeBrowseNextResponse(w, v, encoder));
    encoder.registerType(537, (w, v) => encodeRelativePathElement(w, v, encoder));
    encoder.registerType(540, (w, v) => encodeRelativePath(w, v, encoder));
    encoder.registerType(543, (w, v) => encodeBrowsePath(w, v, encoder));
    encoder.registerType(546, (w, v) => encodeBrowsePathTarget(w, v, encoder));
    encoder.registerType(549, (w, v) => encodeBrowsePathResult(w, v, encoder));
    encoder.registerType(552, (w, v) => encodeTranslateBrowsePathsToNodeIdsRequest(w, v, encoder));
    encoder.registerType(555, (w, v) => encodeTranslateBrowsePathsToNodeIdsResponse(w, v, encoder));
    encoder.registerType(558, (w, v) => encodeRegisterNodesRequest(w, v, encoder));
    encoder.registerType(561, (w, v) => encodeRegisterNodesResponse(w, v, encoder));
    encoder.registerType(564, (w, v) => encodeUnregisterNodesRequest(w, v, encoder));
    encoder.registerType(567, (w, v) => encodeUnregisterNodesResponse(w, v, encoder));
    encoder.registerType(331, (w, v) => encodeEndpointConfiguration(w, v, encoder));
    encoder.registerType(570, (w, v) => encodeQueryDataDescription(w, v, encoder));
    encoder.registerType(573, (w, v) => encodeNodeTypeDescription(w, v, encoder));
    encoder.registerType(577, (w, v) => encodeQueryDataSet(w, v, encoder));
    encoder.registerType(580, (w, v) => encodeNodeReference(w, v, encoder));
    encoder.registerType(583, (w, v) => encodeContentFilterElement(w, v, encoder));
    encoder.registerType(586, (w, v) => encodeContentFilter(w, v, encoder));
    encoder.registerType(589, (w, v) => encodeFilterOperand(w, v, encoder));
    encoder.registerType(592, (w, v) => encodeElementOperand(w, v, encoder));
    encoder.registerType(595, (w, v) => encodeLiteralOperand(w, v, encoder));
    encoder.registerType(598, (w, v) => encodeAttributeOperand(w, v, encoder));
    encoder.registerType(601, (w, v) => encodeSimpleAttributeOperand(w, v, encoder));
    encoder.registerType(604, (w, v) => encodeContentFilterElementResult(w, v, encoder));
    encoder.registerType(607, (w, v) => encodeContentFilterResult(w, v, encoder));
    encoder.registerType(610, (w, v) => encodeParsingResult(w, v, encoder));
    encoder.registerType(613, (w, v) => encodeQueryFirstRequest(w, v, encoder));
    encoder.registerType(616, (w, v) => encodeQueryFirstResponse(w, v, encoder));
    encoder.registerType(619, (w, v) => encodeQueryNextRequest(w, v, encoder));
    encoder.registerType(622, (w, v) => encodeQueryNextResponse(w, v, encoder));
    encoder.registerType(626, (w, v) => encodeReadValueId(w, v, encoder));
    encoder.registerType(629, (w, v) => encodeReadRequest(w, v, encoder));
    encoder.registerType(632, (w, v) => encodeReadResponse(w, v, encoder));
    encoder.registerType(635, (w, v) => encodeHistoryReadValueId(w, v, encoder));
    encoder.registerType(638, (w, v) => encodeHistoryReadResult(w, v, encoder));
    encoder.registerType(641, (w, v) => encodeHistoryReadDetails(w, v, encoder));
    encoder.registerType(644, (w, v) => encodeReadEventDetails(w, v, encoder));
    encoder.registerType(32799, (w, v) => encodeReadEventDetails2(w, v, encoder));
    encoder.registerType(18648, (w, v) => encodeSortRuleElement(w, v, encoder));
    encoder.registerType(18649, (w, v) => encodeReadEventDetailsSorted(w, v, encoder));
    encoder.registerType(647, (w, v) => encodeReadRawModifiedDetails(w, v, encoder));
    encoder.registerType(650, (w, v) => encodeReadProcessedDetails(w, v, encoder));
    encoder.registerType(653, (w, v) => encodeReadAtTimeDetails(w, v, encoder));
    encoder.registerType(23497, (w, v) => encodeReadAnnotationDataDetails(w, v, encoder));
    encoder.registerType(656, (w, v) => encodeHistoryData(w, v, encoder));
    encoder.registerType(11216, (w, v) => encodeModificationInfo(w, v, encoder));
    encoder.registerType(11217, (w, v) => encodeHistoryModifiedData(w, v, encoder));
    encoder.registerType(659, (w, v) => encodeHistoryEvent(w, v, encoder));
    encoder.registerType(32824, (w, v) => encodeHistoryModifiedEvent(w, v, encoder));
    encoder.registerType(662, (w, v) => encodeHistoryReadRequest(w, v, encoder));
    encoder.registerType(665, (w, v) => encodeHistoryReadResponse(w, v, encoder));
    encoder.registerType(668, (w, v) => encodeWriteValue(w, v, encoder));
    encoder.registerType(671, (w, v) => encodeWriteRequest(w, v, encoder));
    encoder.registerType(674, (w, v) => encodeWriteResponse(w, v, encoder));
    encoder.registerType(677, (w, v) => encodeHistoryUpdateDetails(w, v, encoder));
    encoder.registerType(680, (w, v) => encodeUpdateDataDetails(w, v, encoder));
    encoder.registerType(11295, (w, v) => encodeUpdateStructureDataDetails(w, v, encoder));
    encoder.registerType(683, (w, v) => encodeUpdateEventDetails(w, v, encoder));
    encoder.registerType(686, (w, v) => encodeDeleteRawModifiedDetails(w, v, encoder));
    encoder.registerType(689, (w, v) => encodeDeleteAtTimeDetails(w, v, encoder));
    encoder.registerType(692, (w, v) => encodeDeleteEventDetails(w, v, encoder));
    encoder.registerType(695, (w, v) => encodeHistoryUpdateResult(w, v, encoder));
    encoder.registerType(698, (w, v) => encodeHistoryUpdateRequest(w, v, encoder));
    encoder.registerType(701, (w, v) => encodeHistoryUpdateResponse(w, v, encoder));
    encoder.registerType(704, (w, v) => encodeCallMethodRequest(w, v, encoder));
    encoder.registerType(707, (w, v) => encodeCallMethodResult(w, v, encoder));
    encoder.registerType(710, (w, v) => encodeCallRequest(w, v, encoder));
    encoder.registerType(713, (w, v) => encodeCallResponse(w, v, encoder));
    encoder.registerType(719, (w, v) => encodeMonitoringFilter(w, v, encoder));
    encoder.registerType(722, (w, v) => encodeDataChangeFilter(w, v, encoder));
    encoder.registerType(725, (w, v) => encodeEventFilter(w, v, encoder));
    encoder.registerType(948, (w, v) => encodeAggregateConfiguration(w, v, encoder));
    encoder.registerType(728, (w, v) => encodeAggregateFilter(w, v, encoder));
    encoder.registerType(731, (w, v) => encodeMonitoringFilterResult(w, v, encoder));
    encoder.registerType(734, (w, v) => encodeEventFilterResult(w, v, encoder));
    encoder.registerType(737, (w, v) => encodeAggregateFilterResult(w, v, encoder));
    encoder.registerType(740, (w, v) => encodeMonitoringParameters(w, v, encoder));
    encoder.registerType(743, (w, v) => encodeMonitoredItemCreateRequest(w, v, encoder));
    encoder.registerType(746, (w, v) => encodeMonitoredItemCreateResult(w, v, encoder));
    encoder.registerType(749, (w, v) => encodeCreateMonitoredItemsRequest(w, v, encoder));
    encoder.registerType(752, (w, v) => encodeCreateMonitoredItemsResponse(w, v, encoder));
    encoder.registerType(755, (w, v) => encodeMonitoredItemModifyRequest(w, v, encoder));
    encoder.registerType(758, (w, v) => encodeMonitoredItemModifyResult(w, v, encoder));
    encoder.registerType(761, (w, v) => encodeModifyMonitoredItemsRequest(w, v, encoder));
    encoder.registerType(764, (w, v) => encodeModifyMonitoredItemsResponse(w, v, encoder));
    encoder.registerType(767, (w, v) => encodeSetMonitoringModeRequest(w, v, encoder));
    encoder.registerType(770, (w, v) => encodeSetMonitoringModeResponse(w, v, encoder));
    encoder.registerType(773, (w, v) => encodeSetTriggeringRequest(w, v, encoder));
    encoder.registerType(776, (w, v) => encodeSetTriggeringResponse(w, v, encoder));
    encoder.registerType(779, (w, v) => encodeDeleteMonitoredItemsRequest(w, v, encoder));
    encoder.registerType(782, (w, v) => encodeDeleteMonitoredItemsResponse(w, v, encoder));
    encoder.registerType(785, (w, v) => encodeCreateSubscriptionRequest(w, v, encoder));
    encoder.registerType(788, (w, v) => encodeCreateSubscriptionResponse(w, v, encoder));
    encoder.registerType(791, (w, v) => encodeModifySubscriptionRequest(w, v, encoder));
    encoder.registerType(794, (w, v) => encodeModifySubscriptionResponse(w, v, encoder));
    encoder.registerType(797, (w, v) => encodeSetPublishingModeRequest(w, v, encoder));
    encoder.registerType(800, (w, v) => encodeSetPublishingModeResponse(w, v, encoder));
    encoder.registerType(803, (w, v) => encodeNotificationMessage(w, v, encoder));
    encoder.registerType(945, (w, v) => encodeNotificationData(w, v, encoder));
    encoder.registerType(809, (w, v) => encodeDataChangeNotification(w, v, encoder));
    encoder.registerType(806, (w, v) => encodeMonitoredItemNotification(w, v, encoder));
    encoder.registerType(914, (w, v) => encodeEventNotificationList(w, v, encoder));
    encoder.registerType(917, (w, v) => encodeEventFieldList(w, v, encoder));
    encoder.registerType(920, (w, v) => encodeHistoryEventFieldList(w, v, encoder));
    encoder.registerType(818, (w, v) => encodeStatusChangeNotification(w, v, encoder));
    encoder.registerType(821, (w, v) => encodeSubscriptionAcknowledgement(w, v, encoder));
    encoder.registerType(824, (w, v) => encodePublishRequest(w, v, encoder));
    encoder.registerType(827, (w, v) => encodePublishResponse(w, v, encoder));
    encoder.registerType(830, (w, v) => encodeRepublishRequest(w, v, encoder));
    encoder.registerType(833, (w, v) => encodeRepublishResponse(w, v, encoder));
    encoder.registerType(836, (w, v) => encodeTransferResult(w, v, encoder));
    encoder.registerType(839, (w, v) => encodeTransferSubscriptionsRequest(w, v, encoder));
    encoder.registerType(842, (w, v) => encodeTransferSubscriptionsResponse(w, v, encoder));
    encoder.registerType(845, (w, v) => encodeDeleteSubscriptionsRequest(w, v, encoder));
    encoder.registerType(848, (w, v) => encodeDeleteSubscriptionsResponse(w, v, encoder));
    encoder.registerType(338, (w, v) => encodeBuildInfo(w, v, encoder));
    encoder.registerType(853, (w, v) => encodeRedundantServerDataType(w, v, encoder));
    encoder.registerType(11943, (w, v) => encodeEndpointUrlListDataType(w, v, encoder));
    encoder.registerType(11944, (w, v) => encodeNetworkGroupDataType(w, v, encoder));
    encoder.registerType(856, (w, v) => encodeSamplingIntervalDiagnosticsDataType(w, v, encoder));
    encoder.registerType(859, (w, v) => encodeServerDiagnosticsSummaryDataType(w, v, encoder));
    encoder.registerType(862, (w, v) => encodeServerStatusDataType(w, v, encoder));
    encoder.registerType(865, (w, v) => encodeSessionDiagnosticsDataType(w, v, encoder));
    encoder.registerType(868, (w, v) => encodeSessionSecurityDiagnosticsDataType(w, v, encoder));
    encoder.registerType(871, (w, v) => encodeServiceCounterDataType(w, v, encoder));
    encoder.registerType(299, (w, v) => encodeStatusResult(w, v, encoder));
    encoder.registerType(874, (w, v) => encodeSubscriptionDiagnosticsDataType(w, v, encoder));
    encoder.registerType(877, (w, v) => encodeModelChangeStructureDataType(w, v, encoder));
    encoder.registerType(897, (w, v) => encodeSemanticChangeStructureDataType(w, v, encoder));
    encoder.registerType(884, (w, v) => encodeRange(w, v, encoder));
    encoder.registerType(887, (w, v) => encodeEUInformation(w, v, encoder));
    encoder.registerType(12171, (w, v) => encodeComplexNumberType(w, v, encoder));
    encoder.registerType(12172, (w, v) => encodeDoubleComplexNumberType(w, v, encoder));
    encoder.registerType(12079, (w, v) => encodeAxisInformation(w, v, encoder));
    encoder.registerType(12080, (w, v) => encodeXVType(w, v, encoder));
    encoder.registerType(894, (w, v) => encodeProgramDiagnosticDataType(w, v, encoder));
    encoder.registerType(24033, (w, v) => encodeProgramDiagnostic2DataType(w, v, encoder));
    encoder.registerType(891, (w, v) => encodeAnnotation(w, v, encoder));
}
