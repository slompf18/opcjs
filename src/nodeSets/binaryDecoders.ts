// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../codecs/binary/bufferReader";

export const decodeEnumeration = (reader: BufferReader) => {
    const { Enumeration } = require("./types/enumeration");
    return Enumeration.decode(reader);
};

export const decodeUnion = (reader: BufferReader) => {
    const { Union } = require("./types/union");
    return Union.decode(reader);
};

export const decodeKeyValuePair = (reader: BufferReader) => {
    const { KeyValuePair } = require("./types/keyValuePair");
    return KeyValuePair.decode(reader);
};

export const decodeAdditionalParametersType = (reader: BufferReader) => {
    const { AdditionalParametersType } = require("./types/additionalParametersType");
    return AdditionalParametersType.decode(reader);
};

export const decodeEphemeralKeyType = (reader: BufferReader) => {
    const { EphemeralKeyType } = require("./types/ephemeralKeyType");
    return EphemeralKeyType.decode(reader);
};

export const decodeEndpointType = (reader: BufferReader) => {
    const { EndpointType } = require("./types/endpointType");
    return EndpointType.decode(reader);
};

export const decodeBitFieldDefinition = (reader: BufferReader) => {
    const { BitFieldDefinition } = require("./types/bitFieldDefinition");
    return BitFieldDefinition.decode(reader);
};

export const decodeRationalNumber = (reader: BufferReader) => {
    const { RationalNumber } = require("./types/rationalNumber");
    return RationalNumber.decode(reader);
};

export const decodeVector = (reader: BufferReader) => {
    const { Vector } = require("./types/vector");
    return Vector.decode(reader);
};

export const decodeThreeDVector = (reader: BufferReader) => {
    const { ThreeDVector } = require("./types/threeDVector");
    return ThreeDVector.decode(reader);
};

export const decodeCartesianCoordinates = (reader: BufferReader) => {
    const { CartesianCoordinates } = require("./types/cartesianCoordinates");
    return CartesianCoordinates.decode(reader);
};

export const decodeThreeDCartesianCoordinates = (reader: BufferReader) => {
    const { ThreeDCartesianCoordinates } = require("./types/threeDCartesianCoordinates");
    return ThreeDCartesianCoordinates.decode(reader);
};

export const decodeOrientation = (reader: BufferReader) => {
    const { Orientation } = require("./types/orientation");
    return Orientation.decode(reader);
};

export const decodeThreeDOrientation = (reader: BufferReader) => {
    const { ThreeDOrientation } = require("./types/threeDOrientation");
    return ThreeDOrientation.decode(reader);
};

export const decodeFrame = (reader: BufferReader) => {
    const { Frame } = require("./types/frame");
    return Frame.decode(reader);
};

export const decodeThreeDFrame = (reader: BufferReader) => {
    const { ThreeDFrame } = require("./types/threeDFrame");
    return ThreeDFrame.decode(reader);
};

export const decodeIdentityMappingRuleType = (reader: BufferReader) => {
    const { IdentityMappingRuleType } = require("./types/identityMappingRuleType");
    return IdentityMappingRuleType.decode(reader);
};

export const decodeCurrencyUnitType = (reader: BufferReader) => {
    const { CurrencyUnitType } = require("./types/currencyUnitType");
    return CurrencyUnitType.decode(reader);
};

export const decodeAnnotationDataType = (reader: BufferReader) => {
    const { AnnotationDataType } = require("./types/annotationDataType");
    return AnnotationDataType.decode(reader);
};

export const decodeLinearConversionDataType = (reader: BufferReader) => {
    const { LinearConversionDataType } = require("./types/linearConversionDataType");
    return LinearConversionDataType.decode(reader);
};

export const decodeQuantityDimension = (reader: BufferReader) => {
    const { QuantityDimension } = require("./types/quantityDimension");
    return QuantityDimension.decode(reader);
};

export const decodeTrustListDataType = (reader: BufferReader) => {
    const { TrustListDataType } = require("./types/trustListDataType");
    return TrustListDataType.decode(reader);
};

export const decodeBaseConfigurationDataType = (reader: BufferReader) => {
    const { BaseConfigurationDataType } = require("./types/baseConfigurationDataType");
    return BaseConfigurationDataType.decode(reader);
};

export const decodeBaseConfigurationRecordDataType = (reader: BufferReader) => {
    const { BaseConfigurationRecordDataType } = require("./types/baseConfigurationRecordDataType");
    return BaseConfigurationRecordDataType.decode(reader);
};

export const decodeCertificateGroupDataType = (reader: BufferReader) => {
    const { CertificateGroupDataType } = require("./types/certificateGroupDataType");
    return CertificateGroupDataType.decode(reader);
};

export const decodeConfigurationUpdateTargetType = (reader: BufferReader) => {
    const { ConfigurationUpdateTargetType } = require("./types/configurationUpdateTargetType");
    return ConfigurationUpdateTargetType.decode(reader);
};

export const decodeTransactionErrorType = (reader: BufferReader) => {
    const { TransactionErrorType } = require("./types/transactionErrorType");
    return TransactionErrorType.decode(reader);
};

export const decodeApplicationConfigurationDataType = (reader: BufferReader) => {
    const { ApplicationConfigurationDataType } = require("./types/applicationConfigurationDataType");
    return ApplicationConfigurationDataType.decode(reader);
};

export const decodeApplicationIdentityDataType = (reader: BufferReader) => {
    const { ApplicationIdentityDataType } = require("./types/applicationIdentityDataType");
    return ApplicationIdentityDataType.decode(reader);
};

export const decodeEndpointDataType = (reader: BufferReader) => {
    const { EndpointDataType } = require("./types/endpointDataType");
    return EndpointDataType.decode(reader);
};

export const decodeServerEndpointDataType = (reader: BufferReader) => {
    const { ServerEndpointDataType } = require("./types/serverEndpointDataType");
    return ServerEndpointDataType.decode(reader);
};

export const decodeSecuritySettingsDataType = (reader: BufferReader) => {
    const { SecuritySettingsDataType } = require("./types/securitySettingsDataType");
    return SecuritySettingsDataType.decode(reader);
};

export const decodeUserTokenSettingsDataType = (reader: BufferReader) => {
    const { UserTokenSettingsDataType } = require("./types/userTokenSettingsDataType");
    return UserTokenSettingsDataType.decode(reader);
};

export const decodeServiceCertificateDataType = (reader: BufferReader) => {
    const { ServiceCertificateDataType } = require("./types/serviceCertificateDataType");
    return ServiceCertificateDataType.decode(reader);
};

export const decodeAuthorizationServiceConfigurationDataType = (reader: BufferReader) => {
    const { AuthorizationServiceConfigurationDataType } = require("./types/authorizationServiceConfigurationDataType");
    return AuthorizationServiceConfigurationDataType.decode(reader);
};

export const decodeDecimalDataType = (reader: BufferReader) => {
    const { DecimalDataType } = require("./types/decimalDataType");
    return DecimalDataType.decode(reader);
};

export const decodeDataTypeSchemaHeader = (reader: BufferReader) => {
    const { DataTypeSchemaHeader } = require("./types/dataTypeSchemaHeader");
    return DataTypeSchemaHeader.decode(reader);
};

export const decodeDataTypeDescription = (reader: BufferReader) => {
    const { DataTypeDescription } = require("./types/dataTypeDescription");
    return DataTypeDescription.decode(reader);
};

export const decodeStructureDescription = (reader: BufferReader) => {
    const { StructureDescription } = require("./types/structureDescription");
    return StructureDescription.decode(reader);
};

export const decodeEnumDescription = (reader: BufferReader) => {
    const { EnumDescription } = require("./types/enumDescription");
    return EnumDescription.decode(reader);
};

export const decodeSimpleTypeDescription = (reader: BufferReader) => {
    const { SimpleTypeDescription } = require("./types/simpleTypeDescription");
    return SimpleTypeDescription.decode(reader);
};

export const decodeUABinaryFileDataType = (reader: BufferReader) => {
    const { UABinaryFileDataType } = require("./types/uABinaryFileDataType");
    return UABinaryFileDataType.decode(reader);
};

export const decodePortableQualifiedName = (reader: BufferReader) => {
    const { PortableQualifiedName } = require("./types/portableQualifiedName");
    return PortableQualifiedName.decode(reader);
};

export const decodePortableNodeId = (reader: BufferReader) => {
    const { PortableNodeId } = require("./types/portableNodeId");
    return PortableNodeId.decode(reader);
};

export const decodeUnsignedRationalNumber = (reader: BufferReader) => {
    const { UnsignedRationalNumber } = require("./types/unsignedRationalNumber");
    return UnsignedRationalNumber.decode(reader);
};

export const decodeDataSetMetaDataType = (reader: BufferReader) => {
    const { DataSetMetaDataType } = require("./types/dataSetMetaDataType");
    return DataSetMetaDataType.decode(reader);
};

export const decodeFieldMetaData = (reader: BufferReader) => {
    const { FieldMetaData } = require("./types/fieldMetaData");
    return FieldMetaData.decode(reader);
};

export const decodeConfigurationVersionDataType = (reader: BufferReader) => {
    const { ConfigurationVersionDataType } = require("./types/configurationVersionDataType");
    return ConfigurationVersionDataType.decode(reader);
};

export const decodePublishedDataSetDataType = (reader: BufferReader) => {
    const { PublishedDataSetDataType } = require("./types/publishedDataSetDataType");
    return PublishedDataSetDataType.decode(reader);
};

export const decodePublishedDataSetSourceDataType = (reader: BufferReader) => {
    const { PublishedDataSetSourceDataType } = require("./types/publishedDataSetSourceDataType");
    return PublishedDataSetSourceDataType.decode(reader);
};

export const decodePublishedVariableDataType = (reader: BufferReader) => {
    const { PublishedVariableDataType } = require("./types/publishedVariableDataType");
    return PublishedVariableDataType.decode(reader);
};

export const decodePublishedDataItemsDataType = (reader: BufferReader) => {
    const { PublishedDataItemsDataType } = require("./types/publishedDataItemsDataType");
    return PublishedDataItemsDataType.decode(reader);
};

export const decodePublishedEventsDataType = (reader: BufferReader) => {
    const { PublishedEventsDataType } = require("./types/publishedEventsDataType");
    return PublishedEventsDataType.decode(reader);
};

export const decodePublishedDataSetCustomSourceDataType = (reader: BufferReader) => {
    const { PublishedDataSetCustomSourceDataType } = require("./types/publishedDataSetCustomSourceDataType");
    return PublishedDataSetCustomSourceDataType.decode(reader);
};

export const decodeActionTargetDataType = (reader: BufferReader) => {
    const { ActionTargetDataType } = require("./types/actionTargetDataType");
    return ActionTargetDataType.decode(reader);
};

export const decodePublishedActionDataType = (reader: BufferReader) => {
    const { PublishedActionDataType } = require("./types/publishedActionDataType");
    return PublishedActionDataType.decode(reader);
};

export const decodeActionMethodDataType = (reader: BufferReader) => {
    const { ActionMethodDataType } = require("./types/actionMethodDataType");
    return ActionMethodDataType.decode(reader);
};

export const decodePublishedActionMethodDataType = (reader: BufferReader) => {
    const { PublishedActionMethodDataType } = require("./types/publishedActionMethodDataType");
    return PublishedActionMethodDataType.decode(reader);
};

export const decodeDataSetWriterDataType = (reader: BufferReader) => {
    const { DataSetWriterDataType } = require("./types/dataSetWriterDataType");
    return DataSetWriterDataType.decode(reader);
};

export const decodeDataSetWriterTransportDataType = (reader: BufferReader) => {
    const { DataSetWriterTransportDataType } = require("./types/dataSetWriterTransportDataType");
    return DataSetWriterTransportDataType.decode(reader);
};

export const decodeDataSetWriterMessageDataType = (reader: BufferReader) => {
    const { DataSetWriterMessageDataType } = require("./types/dataSetWriterMessageDataType");
    return DataSetWriterMessageDataType.decode(reader);
};

export const decodePubSubGroupDataType = (reader: BufferReader) => {
    const { PubSubGroupDataType } = require("./types/pubSubGroupDataType");
    return PubSubGroupDataType.decode(reader);
};

export const decodeWriterGroupDataType = (reader: BufferReader) => {
    const { WriterGroupDataType } = require("./types/writerGroupDataType");
    return WriterGroupDataType.decode(reader);
};

export const decodeWriterGroupTransportDataType = (reader: BufferReader) => {
    const { WriterGroupTransportDataType } = require("./types/writerGroupTransportDataType");
    return WriterGroupTransportDataType.decode(reader);
};

export const decodeWriterGroupMessageDataType = (reader: BufferReader) => {
    const { WriterGroupMessageDataType } = require("./types/writerGroupMessageDataType");
    return WriterGroupMessageDataType.decode(reader);
};

export const decodePubSubConnectionDataType = (reader: BufferReader) => {
    const { PubSubConnectionDataType } = require("./types/pubSubConnectionDataType");
    return PubSubConnectionDataType.decode(reader);
};

export const decodeConnectionTransportDataType = (reader: BufferReader) => {
    const { ConnectionTransportDataType } = require("./types/connectionTransportDataType");
    return ConnectionTransportDataType.decode(reader);
};

export const decodeNetworkAddressDataType = (reader: BufferReader) => {
    const { NetworkAddressDataType } = require("./types/networkAddressDataType");
    return NetworkAddressDataType.decode(reader);
};

export const decodeNetworkAddressUrlDataType = (reader: BufferReader) => {
    const { NetworkAddressUrlDataType } = require("./types/networkAddressUrlDataType");
    return NetworkAddressUrlDataType.decode(reader);
};

export const decodeReaderGroupDataType = (reader: BufferReader) => {
    const { ReaderGroupDataType } = require("./types/readerGroupDataType");
    return ReaderGroupDataType.decode(reader);
};

export const decodeReaderGroupTransportDataType = (reader: BufferReader) => {
    const { ReaderGroupTransportDataType } = require("./types/readerGroupTransportDataType");
    return ReaderGroupTransportDataType.decode(reader);
};

export const decodeReaderGroupMessageDataType = (reader: BufferReader) => {
    const { ReaderGroupMessageDataType } = require("./types/readerGroupMessageDataType");
    return ReaderGroupMessageDataType.decode(reader);
};

export const decodeDataSetReaderDataType = (reader: BufferReader) => {
    const { DataSetReaderDataType } = require("./types/dataSetReaderDataType");
    return DataSetReaderDataType.decode(reader);
};

export const decodeDataSetReaderTransportDataType = (reader: BufferReader) => {
    const { DataSetReaderTransportDataType } = require("./types/dataSetReaderTransportDataType");
    return DataSetReaderTransportDataType.decode(reader);
};

export const decodeDataSetReaderMessageDataType = (reader: BufferReader) => {
    const { DataSetReaderMessageDataType } = require("./types/dataSetReaderMessageDataType");
    return DataSetReaderMessageDataType.decode(reader);
};

export const decodeSubscribedDataSetDataType = (reader: BufferReader) => {
    const { SubscribedDataSetDataType } = require("./types/subscribedDataSetDataType");
    return SubscribedDataSetDataType.decode(reader);
};

export const decodeTargetVariablesDataType = (reader: BufferReader) => {
    const { TargetVariablesDataType } = require("./types/targetVariablesDataType");
    return TargetVariablesDataType.decode(reader);
};

export const decodeFieldTargetDataType = (reader: BufferReader) => {
    const { FieldTargetDataType } = require("./types/fieldTargetDataType");
    return FieldTargetDataType.decode(reader);
};

export const decodeSubscribedDataSetMirrorDataType = (reader: BufferReader) => {
    const { SubscribedDataSetMirrorDataType } = require("./types/subscribedDataSetMirrorDataType");
    return SubscribedDataSetMirrorDataType.decode(reader);
};

export const decodePubSubConfigurationDataType = (reader: BufferReader) => {
    const { PubSubConfigurationDataType } = require("./types/pubSubConfigurationDataType");
    return PubSubConfigurationDataType.decode(reader);
};

export const decodeStandaloneSubscribedDataSetRefDataType = (reader: BufferReader) => {
    const { StandaloneSubscribedDataSetRefDataType } = require("./types/standaloneSubscribedDataSetRefDataType");
    return StandaloneSubscribedDataSetRefDataType.decode(reader);
};

export const decodeStandaloneSubscribedDataSetDataType = (reader: BufferReader) => {
    const { StandaloneSubscribedDataSetDataType } = require("./types/standaloneSubscribedDataSetDataType");
    return StandaloneSubscribedDataSetDataType.decode(reader);
};

export const decodeSecurityGroupDataType = (reader: BufferReader) => {
    const { SecurityGroupDataType } = require("./types/securityGroupDataType");
    return SecurityGroupDataType.decode(reader);
};

export const decodePubSubKeyPushTargetDataType = (reader: BufferReader) => {
    const { PubSubKeyPushTargetDataType } = require("./types/pubSubKeyPushTargetDataType");
    return PubSubKeyPushTargetDataType.decode(reader);
};

export const decodePubSubConfiguration2DataType = (reader: BufferReader) => {
    const { PubSubConfiguration2DataType } = require("./types/pubSubConfiguration2DataType");
    return PubSubConfiguration2DataType.decode(reader);
};

export const decodeUadpWriterGroupMessageDataType = (reader: BufferReader) => {
    const { UadpWriterGroupMessageDataType } = require("./types/uadpWriterGroupMessageDataType");
    return UadpWriterGroupMessageDataType.decode(reader);
};

export const decodeUadpDataSetWriterMessageDataType = (reader: BufferReader) => {
    const { UadpDataSetWriterMessageDataType } = require("./types/uadpDataSetWriterMessageDataType");
    return UadpDataSetWriterMessageDataType.decode(reader);
};

export const decodeUadpDataSetReaderMessageDataType = (reader: BufferReader) => {
    const { UadpDataSetReaderMessageDataType } = require("./types/uadpDataSetReaderMessageDataType");
    return UadpDataSetReaderMessageDataType.decode(reader);
};

export const decodeJsonWriterGroupMessageDataType = (reader: BufferReader) => {
    const { JsonWriterGroupMessageDataType } = require("./types/jsonWriterGroupMessageDataType");
    return JsonWriterGroupMessageDataType.decode(reader);
};

export const decodeJsonDataSetWriterMessageDataType = (reader: BufferReader) => {
    const { JsonDataSetWriterMessageDataType } = require("./types/jsonDataSetWriterMessageDataType");
    return JsonDataSetWriterMessageDataType.decode(reader);
};

export const decodeJsonDataSetReaderMessageDataType = (reader: BufferReader) => {
    const { JsonDataSetReaderMessageDataType } = require("./types/jsonDataSetReaderMessageDataType");
    return JsonDataSetReaderMessageDataType.decode(reader);
};

export const decodeQosDataType = (reader: BufferReader) => {
    const { QosDataType } = require("./types/qosDataType");
    return QosDataType.decode(reader);
};

export const decodeTransmitQosDataType = (reader: BufferReader) => {
    const { TransmitQosDataType } = require("./types/transmitQosDataType");
    return TransmitQosDataType.decode(reader);
};

export const decodeTransmitQosPriorityDataType = (reader: BufferReader) => {
    const { TransmitQosPriorityDataType } = require("./types/transmitQosPriorityDataType");
    return TransmitQosPriorityDataType.decode(reader);
};

export const decodeReceiveQosDataType = (reader: BufferReader) => {
    const { ReceiveQosDataType } = require("./types/receiveQosDataType");
    return ReceiveQosDataType.decode(reader);
};

export const decodeReceiveQosPriorityDataType = (reader: BufferReader) => {
    const { ReceiveQosPriorityDataType } = require("./types/receiveQosPriorityDataType");
    return ReceiveQosPriorityDataType.decode(reader);
};

export const decodeDatagramConnectionTransportDataType = (reader: BufferReader) => {
    const { DatagramConnectionTransportDataType } = require("./types/datagramConnectionTransportDataType");
    return DatagramConnectionTransportDataType.decode(reader);
};

export const decodeDatagramConnectionTransport2DataType = (reader: BufferReader) => {
    const { DatagramConnectionTransport2DataType } = require("./types/datagramConnectionTransport2DataType");
    return DatagramConnectionTransport2DataType.decode(reader);
};

export const decodeDatagramWriterGroupTransportDataType = (reader: BufferReader) => {
    const { DatagramWriterGroupTransportDataType } = require("./types/datagramWriterGroupTransportDataType");
    return DatagramWriterGroupTransportDataType.decode(reader);
};

export const decodeDatagramWriterGroupTransport2DataType = (reader: BufferReader) => {
    const { DatagramWriterGroupTransport2DataType } = require("./types/datagramWriterGroupTransport2DataType");
    return DatagramWriterGroupTransport2DataType.decode(reader);
};

export const decodeDatagramDataSetReaderTransportDataType = (reader: BufferReader) => {
    const { DatagramDataSetReaderTransportDataType } = require("./types/datagramDataSetReaderTransportDataType");
    return DatagramDataSetReaderTransportDataType.decode(reader);
};

export const decodeDtlsPubSubConnectionDataType = (reader: BufferReader) => {
    const { DtlsPubSubConnectionDataType } = require("./types/dtlsPubSubConnectionDataType");
    return DtlsPubSubConnectionDataType.decode(reader);
};

export const decodeBrokerConnectionTransportDataType = (reader: BufferReader) => {
    const { BrokerConnectionTransportDataType } = require("./types/brokerConnectionTransportDataType");
    return BrokerConnectionTransportDataType.decode(reader);
};

export const decodeBrokerWriterGroupTransportDataType = (reader: BufferReader) => {
    const { BrokerWriterGroupTransportDataType } = require("./types/brokerWriterGroupTransportDataType");
    return BrokerWriterGroupTransportDataType.decode(reader);
};

export const decodeBrokerDataSetWriterTransportDataType = (reader: BufferReader) => {
    const { BrokerDataSetWriterTransportDataType } = require("./types/brokerDataSetWriterTransportDataType");
    return BrokerDataSetWriterTransportDataType.decode(reader);
};

export const decodeBrokerDataSetReaderTransportDataType = (reader: BufferReader) => {
    const { BrokerDataSetReaderTransportDataType } = require("./types/brokerDataSetReaderTransportDataType");
    return BrokerDataSetReaderTransportDataType.decode(reader);
};

export const decodePubSubConfigurationRefDataType = (reader: BufferReader) => {
    const { PubSubConfigurationRefDataType } = require("./types/pubSubConfigurationRefDataType");
    return PubSubConfigurationRefDataType.decode(reader);
};

export const decodePubSubConfigurationValueDataType = (reader: BufferReader) => {
    const { PubSubConfigurationValueDataType } = require("./types/pubSubConfigurationValueDataType");
    return PubSubConfigurationValueDataType.decode(reader);
};

export const decodeJsonNetworkMessage = (reader: BufferReader) => {
    const { JsonNetworkMessage } = require("./types/jsonNetworkMessage");
    return JsonNetworkMessage.decode(reader);
};

export const decodeJsonDataSetMessage = (reader: BufferReader) => {
    const { JsonDataSetMessage } = require("./types/jsonDataSetMessage");
    return JsonDataSetMessage.decode(reader);
};

export const decodeJsonDataSetMetaDataMessage = (reader: BufferReader) => {
    const { JsonDataSetMetaDataMessage } = require("./types/jsonDataSetMetaDataMessage");
    return JsonDataSetMetaDataMessage.decode(reader);
};

export const decodeJsonApplicationDescriptionMessage = (reader: BufferReader) => {
    const { JsonApplicationDescriptionMessage } = require("./types/jsonApplicationDescriptionMessage");
    return JsonApplicationDescriptionMessage.decode(reader);
};

export const decodeJsonServerEndpointsMessage = (reader: BufferReader) => {
    const { JsonServerEndpointsMessage } = require("./types/jsonServerEndpointsMessage");
    return JsonServerEndpointsMessage.decode(reader);
};

export const decodeJsonStatusMessage = (reader: BufferReader) => {
    const { JsonStatusMessage } = require("./types/jsonStatusMessage");
    return JsonStatusMessage.decode(reader);
};

export const decodeJsonPubSubConnectionMessage = (reader: BufferReader) => {
    const { JsonPubSubConnectionMessage } = require("./types/jsonPubSubConnectionMessage");
    return JsonPubSubConnectionMessage.decode(reader);
};

export const decodeJsonActionMetaDataMessage = (reader: BufferReader) => {
    const { JsonActionMetaDataMessage } = require("./types/jsonActionMetaDataMessage");
    return JsonActionMetaDataMessage.decode(reader);
};

export const decodeJsonActionResponderMessage = (reader: BufferReader) => {
    const { JsonActionResponderMessage } = require("./types/jsonActionResponderMessage");
    return JsonActionResponderMessage.decode(reader);
};

export const decodeJsonActionNetworkMessage = (reader: BufferReader) => {
    const { JsonActionNetworkMessage } = require("./types/jsonActionNetworkMessage");
    return JsonActionNetworkMessage.decode(reader);
};

export const decodeJsonActionRequestMessage = (reader: BufferReader) => {
    const { JsonActionRequestMessage } = require("./types/jsonActionRequestMessage");
    return JsonActionRequestMessage.decode(reader);
};

export const decodeJsonActionResponseMessage = (reader: BufferReader) => {
    const { JsonActionResponseMessage } = require("./types/jsonActionResponseMessage");
    return JsonActionResponseMessage.decode(reader);
};

export const decodeAliasNameDataType = (reader: BufferReader) => {
    const { AliasNameDataType } = require("./types/aliasNameDataType");
    return AliasNameDataType.decode(reader);
};

export const decodeUserManagementDataType = (reader: BufferReader) => {
    const { UserManagementDataType } = require("./types/userManagementDataType");
    return UserManagementDataType.decode(reader);
};

export const decodePriorityMappingEntryType = (reader: BufferReader) => {
    const { PriorityMappingEntryType } = require("./types/priorityMappingEntryType");
    return PriorityMappingEntryType.decode(reader);
};

export const decodeLldpManagementAddressTxPortType = (reader: BufferReader) => {
    const { LldpManagementAddressTxPortType } = require("./types/lldpManagementAddressTxPortType");
    return LldpManagementAddressTxPortType.decode(reader);
};

export const decodeLldpManagementAddressType = (reader: BufferReader) => {
    const { LldpManagementAddressType } = require("./types/lldpManagementAddressType");
    return LldpManagementAddressType.decode(reader);
};

export const decodeLldpTlvType = (reader: BufferReader) => {
    const { LldpTlvType } = require("./types/lldpTlvType");
    return LldpTlvType.decode(reader);
};

export const decodeReferenceDescriptionDataType = (reader: BufferReader) => {
    const { ReferenceDescriptionDataType } = require("./types/referenceDescriptionDataType");
    return ReferenceDescriptionDataType.decode(reader);
};

export const decodeReferenceListEntryDataType = (reader: BufferReader) => {
    const { ReferenceListEntryDataType } = require("./types/referenceListEntryDataType");
    return ReferenceListEntryDataType.decode(reader);
};

export const decodeLogRecord = (reader: BufferReader) => {
    const { LogRecord } = require("./types/logRecord");
    return LogRecord.decode(reader);
};

export const decodeLogRecordsDataType = (reader: BufferReader) => {
    const { LogRecordsDataType } = require("./types/logRecordsDataType");
    return LogRecordsDataType.decode(reader);
};

export const decodeSpanContextDataType = (reader: BufferReader) => {
    const { SpanContextDataType } = require("./types/spanContextDataType");
    return SpanContextDataType.decode(reader);
};

export const decodeTraceContextDataType = (reader: BufferReader) => {
    const { TraceContextDataType } = require("./types/traceContextDataType");
    return TraceContextDataType.decode(reader);
};

export const decodeNameValuePair = (reader: BufferReader) => {
    const { NameValuePair } = require("./types/nameValuePair");
    return NameValuePair.decode(reader);
};

export const decodeRolePermissionType = (reader: BufferReader) => {
    const { RolePermissionType } = require("./types/rolePermissionType");
    return RolePermissionType.decode(reader);
};

export const decodeDataTypeDefinition = (reader: BufferReader) => {
    const { DataTypeDefinition } = require("./types/dataTypeDefinition");
    return DataTypeDefinition.decode(reader);
};

export const decodeStructureField = (reader: BufferReader) => {
    const { StructureField } = require("./types/structureField");
    return StructureField.decode(reader);
};

export const decodeStructureDefinition = (reader: BufferReader) => {
    const { StructureDefinition } = require("./types/structureDefinition");
    return StructureDefinition.decode(reader);
};

export const decodeEnumDefinition = (reader: BufferReader) => {
    const { EnumDefinition } = require("./types/enumDefinition");
    return EnumDefinition.decode(reader);
};

export const decodeNode = (reader: BufferReader) => {
    const { Node } = require("./types/node");
    return Node.decode(reader);
};

export const decodeObjectNode = (reader: BufferReader) => {
    const { ObjectNode } = require("./types/objectNode");
    return ObjectNode.decode(reader);
};

export const decodeObjectTypeNode = (reader: BufferReader) => {
    const { ObjectTypeNode } = require("./types/objectTypeNode");
    return ObjectTypeNode.decode(reader);
};

export const decodeVariableNode = (reader: BufferReader) => {
    const { VariableNode } = require("./types/variableNode");
    return VariableNode.decode(reader);
};

export const decodeVariableTypeNode = (reader: BufferReader) => {
    const { VariableTypeNode } = require("./types/variableTypeNode");
    return VariableTypeNode.decode(reader);
};

export const decodeReferenceTypeNode = (reader: BufferReader) => {
    const { ReferenceTypeNode } = require("./types/referenceTypeNode");
    return ReferenceTypeNode.decode(reader);
};

export const decodeMethodNode = (reader: BufferReader) => {
    const { MethodNode } = require("./types/methodNode");
    return MethodNode.decode(reader);
};

export const decodeViewNode = (reader: BufferReader) => {
    const { ViewNode } = require("./types/viewNode");
    return ViewNode.decode(reader);
};

export const decodeDataTypeNode = (reader: BufferReader) => {
    const { DataTypeNode } = require("./types/dataTypeNode");
    return DataTypeNode.decode(reader);
};

export const decodeReferenceNode = (reader: BufferReader) => {
    const { ReferenceNode } = require("./types/referenceNode");
    return ReferenceNode.decode(reader);
};

export const decodeArgument = (reader: BufferReader) => {
    const { Argument } = require("./types/argument");
    return Argument.decode(reader);
};

export const decodeEnumValueType = (reader: BufferReader) => {
    const { EnumValueType } = require("./types/enumValueType");
    return EnumValueType.decode(reader);
};

export const decodeEnumField = (reader: BufferReader) => {
    const { EnumField } = require("./types/enumField");
    return EnumField.decode(reader);
};

export const decodeOptionSet = (reader: BufferReader) => {
    const { OptionSet } = require("./types/optionSet");
    return OptionSet.decode(reader);
};

export const decodeTimeZoneDataType = (reader: BufferReader) => {
    const { TimeZoneDataType } = require("./types/timeZoneDataType");
    return TimeZoneDataType.decode(reader);
};

export const decodeApplicationDescription = (reader: BufferReader) => {
    const { ApplicationDescription } = require("./types/applicationDescription");
    return ApplicationDescription.decode(reader);
};

export const decodeRequestHeader = (reader: BufferReader) => {
    const { RequestHeader } = require("./types/requestHeader");
    return RequestHeader.decode(reader);
};

export const decodeResponseHeader = (reader: BufferReader) => {
    const { ResponseHeader } = require("./types/responseHeader");
    return ResponseHeader.decode(reader);
};

export const decodeServiceFault = (reader: BufferReader) => {
    const { ServiceFault } = require("./types/serviceFault");
    return ServiceFault.decode(reader);
};

export const decodeSessionlessInvokeRequestType = (reader: BufferReader) => {
    const { SessionlessInvokeRequestType } = require("./types/sessionlessInvokeRequestType");
    return SessionlessInvokeRequestType.decode(reader);
};

export const decodeSessionlessInvokeResponseType = (reader: BufferReader) => {
    const { SessionlessInvokeResponseType } = require("./types/sessionlessInvokeResponseType");
    return SessionlessInvokeResponseType.decode(reader);
};

export const decodeFindServersRequest = (reader: BufferReader) => {
    const { FindServersRequest } = require("./types/findServersRequest");
    return FindServersRequest.decode(reader);
};

export const decodeFindServersResponse = (reader: BufferReader) => {
    const { FindServersResponse } = require("./types/findServersResponse");
    return FindServersResponse.decode(reader);
};

export const decodeServerOnNetwork = (reader: BufferReader) => {
    const { ServerOnNetwork } = require("./types/serverOnNetwork");
    return ServerOnNetwork.decode(reader);
};

export const decodeFindServersOnNetworkRequest = (reader: BufferReader) => {
    const { FindServersOnNetworkRequest } = require("./types/findServersOnNetworkRequest");
    return FindServersOnNetworkRequest.decode(reader);
};

export const decodeFindServersOnNetworkResponse = (reader: BufferReader) => {
    const { FindServersOnNetworkResponse } = require("./types/findServersOnNetworkResponse");
    return FindServersOnNetworkResponse.decode(reader);
};

export const decodeUserTokenPolicy = (reader: BufferReader) => {
    const { UserTokenPolicy } = require("./types/userTokenPolicy");
    return UserTokenPolicy.decode(reader);
};

export const decodeEndpointDescription = (reader: BufferReader) => {
    const { EndpointDescription } = require("./types/endpointDescription");
    return EndpointDescription.decode(reader);
};

export const decodeGetEndpointsRequest = (reader: BufferReader) => {
    const { GetEndpointsRequest } = require("./types/getEndpointsRequest");
    return GetEndpointsRequest.decode(reader);
};

export const decodeGetEndpointsResponse = (reader: BufferReader) => {
    const { GetEndpointsResponse } = require("./types/getEndpointsResponse");
    return GetEndpointsResponse.decode(reader);
};

export const decodeRegisteredServer = (reader: BufferReader) => {
    const { RegisteredServer } = require("./types/registeredServer");
    return RegisteredServer.decode(reader);
};

export const decodeRegisterServerRequest = (reader: BufferReader) => {
    const { RegisterServerRequest } = require("./types/registerServerRequest");
    return RegisterServerRequest.decode(reader);
};

export const decodeRegisterServerResponse = (reader: BufferReader) => {
    const { RegisterServerResponse } = require("./types/registerServerResponse");
    return RegisterServerResponse.decode(reader);
};

export const decodeMdnsDiscoveryConfiguration = (reader: BufferReader) => {
    const { MdnsDiscoveryConfiguration } = require("./types/mdnsDiscoveryConfiguration");
    return MdnsDiscoveryConfiguration.decode(reader);
};

export const decodeRegisterServer2Request = (reader: BufferReader) => {
    const { RegisterServer2Request } = require("./types/registerServer2Request");
    return RegisterServer2Request.decode(reader);
};

export const decodeRegisterServer2Response = (reader: BufferReader) => {
    const { RegisterServer2Response } = require("./types/registerServer2Response");
    return RegisterServer2Response.decode(reader);
};

export const decodeChannelSecurityToken = (reader: BufferReader) => {
    const { ChannelSecurityToken } = require("./types/channelSecurityToken");
    return ChannelSecurityToken.decode(reader);
};

export const decodeOpenSecureChannelRequest = (reader: BufferReader) => {
    const { OpenSecureChannelRequest } = require("./types/openSecureChannelRequest");
    return OpenSecureChannelRequest.decode(reader);
};

export const decodeOpenSecureChannelResponse = (reader: BufferReader) => {
    const { OpenSecureChannelResponse } = require("./types/openSecureChannelResponse");
    return OpenSecureChannelResponse.decode(reader);
};

export const decodeCloseSecureChannelRequest = (reader: BufferReader) => {
    const { CloseSecureChannelRequest } = require("./types/closeSecureChannelRequest");
    return CloseSecureChannelRequest.decode(reader);
};

export const decodeCloseSecureChannelResponse = (reader: BufferReader) => {
    const { CloseSecureChannelResponse } = require("./types/closeSecureChannelResponse");
    return CloseSecureChannelResponse.decode(reader);
};

export const decodeSignedSoftwareCertificate = (reader: BufferReader) => {
    const { SignedSoftwareCertificate } = require("./types/signedSoftwareCertificate");
    return SignedSoftwareCertificate.decode(reader);
};

export const decodeSignatureData = (reader: BufferReader) => {
    const { SignatureData } = require("./types/signatureData");
    return SignatureData.decode(reader);
};

export const decodeCreateSessionRequest = (reader: BufferReader) => {
    const { CreateSessionRequest } = require("./types/createSessionRequest");
    return CreateSessionRequest.decode(reader);
};

export const decodeCreateSessionResponse = (reader: BufferReader) => {
    const { CreateSessionResponse } = require("./types/createSessionResponse");
    return CreateSessionResponse.decode(reader);
};

export const decodeUserIdentityToken = (reader: BufferReader) => {
    const { UserIdentityToken } = require("./types/userIdentityToken");
    return UserIdentityToken.decode(reader);
};

export const decodeUserNameIdentityToken = (reader: BufferReader) => {
    const { UserNameIdentityToken } = require("./types/userNameIdentityToken");
    return UserNameIdentityToken.decode(reader);
};

export const decodeX509IdentityToken = (reader: BufferReader) => {
    const { X509IdentityToken } = require("./types/x509IdentityToken");
    return X509IdentityToken.decode(reader);
};

export const decodeIssuedIdentityToken = (reader: BufferReader) => {
    const { IssuedIdentityToken } = require("./types/issuedIdentityToken");
    return IssuedIdentityToken.decode(reader);
};

export const decodeActivateSessionRequest = (reader: BufferReader) => {
    const { ActivateSessionRequest } = require("./types/activateSessionRequest");
    return ActivateSessionRequest.decode(reader);
};

export const decodeActivateSessionResponse = (reader: BufferReader) => {
    const { ActivateSessionResponse } = require("./types/activateSessionResponse");
    return ActivateSessionResponse.decode(reader);
};

export const decodeCloseSessionRequest = (reader: BufferReader) => {
    const { CloseSessionRequest } = require("./types/closeSessionRequest");
    return CloseSessionRequest.decode(reader);
};

export const decodeCloseSessionResponse = (reader: BufferReader) => {
    const { CloseSessionResponse } = require("./types/closeSessionResponse");
    return CloseSessionResponse.decode(reader);
};

export const decodeCancelRequest = (reader: BufferReader) => {
    const { CancelRequest } = require("./types/cancelRequest");
    return CancelRequest.decode(reader);
};

export const decodeCancelResponse = (reader: BufferReader) => {
    const { CancelResponse } = require("./types/cancelResponse");
    return CancelResponse.decode(reader);
};

export const decodeNodeAttributes = (reader: BufferReader) => {
    const { NodeAttributes } = require("./types/nodeAttributes");
    return NodeAttributes.decode(reader);
};

export const decodeObjectAttributes = (reader: BufferReader) => {
    const { ObjectAttributes } = require("./types/objectAttributes");
    return ObjectAttributes.decode(reader);
};

export const decodeVariableAttributes = (reader: BufferReader) => {
    const { VariableAttributes } = require("./types/variableAttributes");
    return VariableAttributes.decode(reader);
};

export const decodeMethodAttributes = (reader: BufferReader) => {
    const { MethodAttributes } = require("./types/methodAttributes");
    return MethodAttributes.decode(reader);
};

export const decodeObjectTypeAttributes = (reader: BufferReader) => {
    const { ObjectTypeAttributes } = require("./types/objectTypeAttributes");
    return ObjectTypeAttributes.decode(reader);
};

export const decodeVariableTypeAttributes = (reader: BufferReader) => {
    const { VariableTypeAttributes } = require("./types/variableTypeAttributes");
    return VariableTypeAttributes.decode(reader);
};

export const decodeReferenceTypeAttributes = (reader: BufferReader) => {
    const { ReferenceTypeAttributes } = require("./types/referenceTypeAttributes");
    return ReferenceTypeAttributes.decode(reader);
};

export const decodeDataTypeAttributes = (reader: BufferReader) => {
    const { DataTypeAttributes } = require("./types/dataTypeAttributes");
    return DataTypeAttributes.decode(reader);
};

export const decodeViewAttributes = (reader: BufferReader) => {
    const { ViewAttributes } = require("./types/viewAttributes");
    return ViewAttributes.decode(reader);
};

export const decodeGenericAttributeValue = (reader: BufferReader) => {
    const { GenericAttributeValue } = require("./types/genericAttributeValue");
    return GenericAttributeValue.decode(reader);
};

export const decodeGenericAttributes = (reader: BufferReader) => {
    const { GenericAttributes } = require("./types/genericAttributes");
    return GenericAttributes.decode(reader);
};

export const decodeAddNodesItem = (reader: BufferReader) => {
    const { AddNodesItem } = require("./types/addNodesItem");
    return AddNodesItem.decode(reader);
};

export const decodeAddNodesResult = (reader: BufferReader) => {
    const { AddNodesResult } = require("./types/addNodesResult");
    return AddNodesResult.decode(reader);
};

export const decodeAddNodesRequest = (reader: BufferReader) => {
    const { AddNodesRequest } = require("./types/addNodesRequest");
    return AddNodesRequest.decode(reader);
};

export const decodeAddNodesResponse = (reader: BufferReader) => {
    const { AddNodesResponse } = require("./types/addNodesResponse");
    return AddNodesResponse.decode(reader);
};

export const decodeAddReferencesItem = (reader: BufferReader) => {
    const { AddReferencesItem } = require("./types/addReferencesItem");
    return AddReferencesItem.decode(reader);
};

export const decodeAddReferencesRequest = (reader: BufferReader) => {
    const { AddReferencesRequest } = require("./types/addReferencesRequest");
    return AddReferencesRequest.decode(reader);
};

export const decodeAddReferencesResponse = (reader: BufferReader) => {
    const { AddReferencesResponse } = require("./types/addReferencesResponse");
    return AddReferencesResponse.decode(reader);
};

export const decodeDeleteNodesItem = (reader: BufferReader) => {
    const { DeleteNodesItem } = require("./types/deleteNodesItem");
    return DeleteNodesItem.decode(reader);
};

export const decodeDeleteNodesRequest = (reader: BufferReader) => {
    const { DeleteNodesRequest } = require("./types/deleteNodesRequest");
    return DeleteNodesRequest.decode(reader);
};

export const decodeDeleteNodesResponse = (reader: BufferReader) => {
    const { DeleteNodesResponse } = require("./types/deleteNodesResponse");
    return DeleteNodesResponse.decode(reader);
};

export const decodeDeleteReferencesItem = (reader: BufferReader) => {
    const { DeleteReferencesItem } = require("./types/deleteReferencesItem");
    return DeleteReferencesItem.decode(reader);
};

export const decodeDeleteReferencesRequest = (reader: BufferReader) => {
    const { DeleteReferencesRequest } = require("./types/deleteReferencesRequest");
    return DeleteReferencesRequest.decode(reader);
};

export const decodeDeleteReferencesResponse = (reader: BufferReader) => {
    const { DeleteReferencesResponse } = require("./types/deleteReferencesResponse");
    return DeleteReferencesResponse.decode(reader);
};

export const decodeViewDescription = (reader: BufferReader) => {
    const { ViewDescription } = require("./types/viewDescription");
    return ViewDescription.decode(reader);
};

export const decodeBrowseDescription = (reader: BufferReader) => {
    const { BrowseDescription } = require("./types/browseDescription");
    return BrowseDescription.decode(reader);
};

export const decodeReferenceDescription = (reader: BufferReader) => {
    const { ReferenceDescription } = require("./types/referenceDescription");
    return ReferenceDescription.decode(reader);
};

export const decodeBrowseResult = (reader: BufferReader) => {
    const { BrowseResult } = require("./types/browseResult");
    return BrowseResult.decode(reader);
};

export const decodeBrowseRequest = (reader: BufferReader) => {
    const { BrowseRequest } = require("./types/browseRequest");
    return BrowseRequest.decode(reader);
};

export const decodeBrowseResponse = (reader: BufferReader) => {
    const { BrowseResponse } = require("./types/browseResponse");
    return BrowseResponse.decode(reader);
};

export const decodeBrowseNextRequest = (reader: BufferReader) => {
    const { BrowseNextRequest } = require("./types/browseNextRequest");
    return BrowseNextRequest.decode(reader);
};

export const decodeBrowseNextResponse = (reader: BufferReader) => {
    const { BrowseNextResponse } = require("./types/browseNextResponse");
    return BrowseNextResponse.decode(reader);
};

export const decodeRelativePathElement = (reader: BufferReader) => {
    const { RelativePathElement } = require("./types/relativePathElement");
    return RelativePathElement.decode(reader);
};

export const decodeRelativePath = (reader: BufferReader) => {
    const { RelativePath } = require("./types/relativePath");
    return RelativePath.decode(reader);
};

export const decodeBrowsePath = (reader: BufferReader) => {
    const { BrowsePath } = require("./types/browsePath");
    return BrowsePath.decode(reader);
};

export const decodeBrowsePathTarget = (reader: BufferReader) => {
    const { BrowsePathTarget } = require("./types/browsePathTarget");
    return BrowsePathTarget.decode(reader);
};

export const decodeBrowsePathResult = (reader: BufferReader) => {
    const { BrowsePathResult } = require("./types/browsePathResult");
    return BrowsePathResult.decode(reader);
};

export const decodeTranslateBrowsePathsToNodeIdsRequest = (reader: BufferReader) => {
    const { TranslateBrowsePathsToNodeIdsRequest } = require("./types/translateBrowsePathsToNodeIdsRequest");
    return TranslateBrowsePathsToNodeIdsRequest.decode(reader);
};

export const decodeTranslateBrowsePathsToNodeIdsResponse = (reader: BufferReader) => {
    const { TranslateBrowsePathsToNodeIdsResponse } = require("./types/translateBrowsePathsToNodeIdsResponse");
    return TranslateBrowsePathsToNodeIdsResponse.decode(reader);
};

export const decodeRegisterNodesRequest = (reader: BufferReader) => {
    const { RegisterNodesRequest } = require("./types/registerNodesRequest");
    return RegisterNodesRequest.decode(reader);
};

export const decodeRegisterNodesResponse = (reader: BufferReader) => {
    const { RegisterNodesResponse } = require("./types/registerNodesResponse");
    return RegisterNodesResponse.decode(reader);
};

export const decodeUnregisterNodesRequest = (reader: BufferReader) => {
    const { UnregisterNodesRequest } = require("./types/unregisterNodesRequest");
    return UnregisterNodesRequest.decode(reader);
};

export const decodeUnregisterNodesResponse = (reader: BufferReader) => {
    const { UnregisterNodesResponse } = require("./types/unregisterNodesResponse");
    return UnregisterNodesResponse.decode(reader);
};

export const decodeEndpointConfiguration = (reader: BufferReader) => {
    const { EndpointConfiguration } = require("./types/endpointConfiguration");
    return EndpointConfiguration.decode(reader);
};

export const decodeQueryDataDescription = (reader: BufferReader) => {
    const { QueryDataDescription } = require("./types/queryDataDescription");
    return QueryDataDescription.decode(reader);
};

export const decodeNodeTypeDescription = (reader: BufferReader) => {
    const { NodeTypeDescription } = require("./types/nodeTypeDescription");
    return NodeTypeDescription.decode(reader);
};

export const decodeQueryDataSet = (reader: BufferReader) => {
    const { QueryDataSet } = require("./types/queryDataSet");
    return QueryDataSet.decode(reader);
};

export const decodeNodeReference = (reader: BufferReader) => {
    const { NodeReference } = require("./types/nodeReference");
    return NodeReference.decode(reader);
};

export const decodeContentFilterElement = (reader: BufferReader) => {
    const { ContentFilterElement } = require("./types/contentFilterElement");
    return ContentFilterElement.decode(reader);
};

export const decodeContentFilter = (reader: BufferReader) => {
    const { ContentFilter } = require("./types/contentFilter");
    return ContentFilter.decode(reader);
};

export const decodeFilterOperand = (reader: BufferReader) => {
    const { FilterOperand } = require("./types/filterOperand");
    return FilterOperand.decode(reader);
};

export const decodeElementOperand = (reader: BufferReader) => {
    const { ElementOperand } = require("./types/elementOperand");
    return ElementOperand.decode(reader);
};

export const decodeLiteralOperand = (reader: BufferReader) => {
    const { LiteralOperand } = require("./types/literalOperand");
    return LiteralOperand.decode(reader);
};

export const decodeAttributeOperand = (reader: BufferReader) => {
    const { AttributeOperand } = require("./types/attributeOperand");
    return AttributeOperand.decode(reader);
};

export const decodeSimpleAttributeOperand = (reader: BufferReader) => {
    const { SimpleAttributeOperand } = require("./types/simpleAttributeOperand");
    return SimpleAttributeOperand.decode(reader);
};

export const decodeContentFilterElementResult = (reader: BufferReader) => {
    const { ContentFilterElementResult } = require("./types/contentFilterElementResult");
    return ContentFilterElementResult.decode(reader);
};

export const decodeContentFilterResult = (reader: BufferReader) => {
    const { ContentFilterResult } = require("./types/contentFilterResult");
    return ContentFilterResult.decode(reader);
};

export const decodeParsingResult = (reader: BufferReader) => {
    const { ParsingResult } = require("./types/parsingResult");
    return ParsingResult.decode(reader);
};

export const decodeQueryFirstRequest = (reader: BufferReader) => {
    const { QueryFirstRequest } = require("./types/queryFirstRequest");
    return QueryFirstRequest.decode(reader);
};

export const decodeQueryFirstResponse = (reader: BufferReader) => {
    const { QueryFirstResponse } = require("./types/queryFirstResponse");
    return QueryFirstResponse.decode(reader);
};

export const decodeQueryNextRequest = (reader: BufferReader) => {
    const { QueryNextRequest } = require("./types/queryNextRequest");
    return QueryNextRequest.decode(reader);
};

export const decodeQueryNextResponse = (reader: BufferReader) => {
    const { QueryNextResponse } = require("./types/queryNextResponse");
    return QueryNextResponse.decode(reader);
};

export const decodeReadValueId = (reader: BufferReader) => {
    const { ReadValueId } = require("./types/readValueId");
    return ReadValueId.decode(reader);
};

export const decodeReadRequest = (reader: BufferReader) => {
    const { ReadRequest } = require("./types/readRequest");
    return ReadRequest.decode(reader);
};

export const decodeReadResponse = (reader: BufferReader) => {
    const { ReadResponse } = require("./types/readResponse");
    return ReadResponse.decode(reader);
};

export const decodeHistoryReadValueId = (reader: BufferReader) => {
    const { HistoryReadValueId } = require("./types/historyReadValueId");
    return HistoryReadValueId.decode(reader);
};

export const decodeHistoryReadResult = (reader: BufferReader) => {
    const { HistoryReadResult } = require("./types/historyReadResult");
    return HistoryReadResult.decode(reader);
};

export const decodeHistoryReadDetails = (reader: BufferReader) => {
    const { HistoryReadDetails } = require("./types/historyReadDetails");
    return HistoryReadDetails.decode(reader);
};

export const decodeReadEventDetails = (reader: BufferReader) => {
    const { ReadEventDetails } = require("./types/readEventDetails");
    return ReadEventDetails.decode(reader);
};

export const decodeReadEventDetails2 = (reader: BufferReader) => {
    const { ReadEventDetails2 } = require("./types/readEventDetails2");
    return ReadEventDetails2.decode(reader);
};

export const decodeSortRuleElement = (reader: BufferReader) => {
    const { SortRuleElement } = require("./types/sortRuleElement");
    return SortRuleElement.decode(reader);
};

export const decodeReadEventDetailsSorted = (reader: BufferReader) => {
    const { ReadEventDetailsSorted } = require("./types/readEventDetailsSorted");
    return ReadEventDetailsSorted.decode(reader);
};

export const decodeReadRawModifiedDetails = (reader: BufferReader) => {
    const { ReadRawModifiedDetails } = require("./types/readRawModifiedDetails");
    return ReadRawModifiedDetails.decode(reader);
};

export const decodeReadProcessedDetails = (reader: BufferReader) => {
    const { ReadProcessedDetails } = require("./types/readProcessedDetails");
    return ReadProcessedDetails.decode(reader);
};

export const decodeReadAtTimeDetails = (reader: BufferReader) => {
    const { ReadAtTimeDetails } = require("./types/readAtTimeDetails");
    return ReadAtTimeDetails.decode(reader);
};

export const decodeReadAnnotationDataDetails = (reader: BufferReader) => {
    const { ReadAnnotationDataDetails } = require("./types/readAnnotationDataDetails");
    return ReadAnnotationDataDetails.decode(reader);
};

export const decodeHistoryData = (reader: BufferReader) => {
    const { HistoryData } = require("./types/historyData");
    return HistoryData.decode(reader);
};

export const decodeModificationInfo = (reader: BufferReader) => {
    const { ModificationInfo } = require("./types/modificationInfo");
    return ModificationInfo.decode(reader);
};

export const decodeHistoryModifiedData = (reader: BufferReader) => {
    const { HistoryModifiedData } = require("./types/historyModifiedData");
    return HistoryModifiedData.decode(reader);
};

export const decodeHistoryEvent = (reader: BufferReader) => {
    const { HistoryEvent } = require("./types/historyEvent");
    return HistoryEvent.decode(reader);
};

export const decodeHistoryModifiedEvent = (reader: BufferReader) => {
    const { HistoryModifiedEvent } = require("./types/historyModifiedEvent");
    return HistoryModifiedEvent.decode(reader);
};

export const decodeHistoryReadRequest = (reader: BufferReader) => {
    const { HistoryReadRequest } = require("./types/historyReadRequest");
    return HistoryReadRequest.decode(reader);
};

export const decodeHistoryReadResponse = (reader: BufferReader) => {
    const { HistoryReadResponse } = require("./types/historyReadResponse");
    return HistoryReadResponse.decode(reader);
};

export const decodeWriteValue = (reader: BufferReader) => {
    const { WriteValue } = require("./types/writeValue");
    return WriteValue.decode(reader);
};

export const decodeWriteRequest = (reader: BufferReader) => {
    const { WriteRequest } = require("./types/writeRequest");
    return WriteRequest.decode(reader);
};

export const decodeWriteResponse = (reader: BufferReader) => {
    const { WriteResponse } = require("./types/writeResponse");
    return WriteResponse.decode(reader);
};

export const decodeHistoryUpdateDetails = (reader: BufferReader) => {
    const { HistoryUpdateDetails } = require("./types/historyUpdateDetails");
    return HistoryUpdateDetails.decode(reader);
};

export const decodeUpdateDataDetails = (reader: BufferReader) => {
    const { UpdateDataDetails } = require("./types/updateDataDetails");
    return UpdateDataDetails.decode(reader);
};

export const decodeUpdateStructureDataDetails = (reader: BufferReader) => {
    const { UpdateStructureDataDetails } = require("./types/updateStructureDataDetails");
    return UpdateStructureDataDetails.decode(reader);
};

export const decodeUpdateEventDetails = (reader: BufferReader) => {
    const { UpdateEventDetails } = require("./types/updateEventDetails");
    return UpdateEventDetails.decode(reader);
};

export const decodeDeleteRawModifiedDetails = (reader: BufferReader) => {
    const { DeleteRawModifiedDetails } = require("./types/deleteRawModifiedDetails");
    return DeleteRawModifiedDetails.decode(reader);
};

export const decodeDeleteAtTimeDetails = (reader: BufferReader) => {
    const { DeleteAtTimeDetails } = require("./types/deleteAtTimeDetails");
    return DeleteAtTimeDetails.decode(reader);
};

export const decodeDeleteEventDetails = (reader: BufferReader) => {
    const { DeleteEventDetails } = require("./types/deleteEventDetails");
    return DeleteEventDetails.decode(reader);
};

export const decodeHistoryUpdateResult = (reader: BufferReader) => {
    const { HistoryUpdateResult } = require("./types/historyUpdateResult");
    return HistoryUpdateResult.decode(reader);
};

export const decodeHistoryUpdateRequest = (reader: BufferReader) => {
    const { HistoryUpdateRequest } = require("./types/historyUpdateRequest");
    return HistoryUpdateRequest.decode(reader);
};

export const decodeHistoryUpdateResponse = (reader: BufferReader) => {
    const { HistoryUpdateResponse } = require("./types/historyUpdateResponse");
    return HistoryUpdateResponse.decode(reader);
};

export const decodeCallMethodRequest = (reader: BufferReader) => {
    const { CallMethodRequest } = require("./types/callMethodRequest");
    return CallMethodRequest.decode(reader);
};

export const decodeCallMethodResult = (reader: BufferReader) => {
    const { CallMethodResult } = require("./types/callMethodResult");
    return CallMethodResult.decode(reader);
};

export const decodeCallRequest = (reader: BufferReader) => {
    const { CallRequest } = require("./types/callRequest");
    return CallRequest.decode(reader);
};

export const decodeCallResponse = (reader: BufferReader) => {
    const { CallResponse } = require("./types/callResponse");
    return CallResponse.decode(reader);
};

export const decodeDataChangeFilter = (reader: BufferReader) => {
    const { DataChangeFilter } = require("./types/dataChangeFilter");
    return DataChangeFilter.decode(reader);
};

export const decodeEventFilter = (reader: BufferReader) => {
    const { EventFilter } = require("./types/eventFilter");
    return EventFilter.decode(reader);
};

export const decodeAggregateConfiguration = (reader: BufferReader) => {
    const { AggregateConfiguration } = require("./types/aggregateConfiguration");
    return AggregateConfiguration.decode(reader);
};

export const decodeAggregateFilter = (reader: BufferReader) => {
    const { AggregateFilter } = require("./types/aggregateFilter");
    return AggregateFilter.decode(reader);
};

export const decodeEventFilterResult = (reader: BufferReader) => {
    const { EventFilterResult } = require("./types/eventFilterResult");
    return EventFilterResult.decode(reader);
};

export const decodeAggregateFilterResult = (reader: BufferReader) => {
    const { AggregateFilterResult } = require("./types/aggregateFilterResult");
    return AggregateFilterResult.decode(reader);
};

export const decodeMonitoringParameters = (reader: BufferReader) => {
    const { MonitoringParameters } = require("./types/monitoringParameters");
    return MonitoringParameters.decode(reader);
};

export const decodeMonitoredItemCreateRequest = (reader: BufferReader) => {
    const { MonitoredItemCreateRequest } = require("./types/monitoredItemCreateRequest");
    return MonitoredItemCreateRequest.decode(reader);
};

export const decodeMonitoredItemCreateResult = (reader: BufferReader) => {
    const { MonitoredItemCreateResult } = require("./types/monitoredItemCreateResult");
    return MonitoredItemCreateResult.decode(reader);
};

export const decodeCreateMonitoredItemsRequest = (reader: BufferReader) => {
    const { CreateMonitoredItemsRequest } = require("./types/createMonitoredItemsRequest");
    return CreateMonitoredItemsRequest.decode(reader);
};

export const decodeCreateMonitoredItemsResponse = (reader: BufferReader) => {
    const { CreateMonitoredItemsResponse } = require("./types/createMonitoredItemsResponse");
    return CreateMonitoredItemsResponse.decode(reader);
};

export const decodeMonitoredItemModifyRequest = (reader: BufferReader) => {
    const { MonitoredItemModifyRequest } = require("./types/monitoredItemModifyRequest");
    return MonitoredItemModifyRequest.decode(reader);
};

export const decodeMonitoredItemModifyResult = (reader: BufferReader) => {
    const { MonitoredItemModifyResult } = require("./types/monitoredItemModifyResult");
    return MonitoredItemModifyResult.decode(reader);
};

export const decodeModifyMonitoredItemsRequest = (reader: BufferReader) => {
    const { ModifyMonitoredItemsRequest } = require("./types/modifyMonitoredItemsRequest");
    return ModifyMonitoredItemsRequest.decode(reader);
};

export const decodeModifyMonitoredItemsResponse = (reader: BufferReader) => {
    const { ModifyMonitoredItemsResponse } = require("./types/modifyMonitoredItemsResponse");
    return ModifyMonitoredItemsResponse.decode(reader);
};

export const decodeSetMonitoringModeRequest = (reader: BufferReader) => {
    const { SetMonitoringModeRequest } = require("./types/setMonitoringModeRequest");
    return SetMonitoringModeRequest.decode(reader);
};

export const decodeSetMonitoringModeResponse = (reader: BufferReader) => {
    const { SetMonitoringModeResponse } = require("./types/setMonitoringModeResponse");
    return SetMonitoringModeResponse.decode(reader);
};

export const decodeSetTriggeringRequest = (reader: BufferReader) => {
    const { SetTriggeringRequest } = require("./types/setTriggeringRequest");
    return SetTriggeringRequest.decode(reader);
};

export const decodeSetTriggeringResponse = (reader: BufferReader) => {
    const { SetTriggeringResponse } = require("./types/setTriggeringResponse");
    return SetTriggeringResponse.decode(reader);
};

export const decodeDeleteMonitoredItemsRequest = (reader: BufferReader) => {
    const { DeleteMonitoredItemsRequest } = require("./types/deleteMonitoredItemsRequest");
    return DeleteMonitoredItemsRequest.decode(reader);
};

export const decodeDeleteMonitoredItemsResponse = (reader: BufferReader) => {
    const { DeleteMonitoredItemsResponse } = require("./types/deleteMonitoredItemsResponse");
    return DeleteMonitoredItemsResponse.decode(reader);
};

export const decodeCreateSubscriptionRequest = (reader: BufferReader) => {
    const { CreateSubscriptionRequest } = require("./types/createSubscriptionRequest");
    return CreateSubscriptionRequest.decode(reader);
};

export const decodeCreateSubscriptionResponse = (reader: BufferReader) => {
    const { CreateSubscriptionResponse } = require("./types/createSubscriptionResponse");
    return CreateSubscriptionResponse.decode(reader);
};

export const decodeModifySubscriptionRequest = (reader: BufferReader) => {
    const { ModifySubscriptionRequest } = require("./types/modifySubscriptionRequest");
    return ModifySubscriptionRequest.decode(reader);
};

export const decodeModifySubscriptionResponse = (reader: BufferReader) => {
    const { ModifySubscriptionResponse } = require("./types/modifySubscriptionResponse");
    return ModifySubscriptionResponse.decode(reader);
};

export const decodeSetPublishingModeRequest = (reader: BufferReader) => {
    const { SetPublishingModeRequest } = require("./types/setPublishingModeRequest");
    return SetPublishingModeRequest.decode(reader);
};

export const decodeSetPublishingModeResponse = (reader: BufferReader) => {
    const { SetPublishingModeResponse } = require("./types/setPublishingModeResponse");
    return SetPublishingModeResponse.decode(reader);
};

export const decodeNotificationMessage = (reader: BufferReader) => {
    const { NotificationMessage } = require("./types/notificationMessage");
    return NotificationMessage.decode(reader);
};

export const decodeDataChangeNotification = (reader: BufferReader) => {
    const { DataChangeNotification } = require("./types/dataChangeNotification");
    return DataChangeNotification.decode(reader);
};

export const decodeMonitoredItemNotification = (reader: BufferReader) => {
    const { MonitoredItemNotification } = require("./types/monitoredItemNotification");
    return MonitoredItemNotification.decode(reader);
};

export const decodeEventNotificationList = (reader: BufferReader) => {
    const { EventNotificationList } = require("./types/eventNotificationList");
    return EventNotificationList.decode(reader);
};

export const decodeEventFieldList = (reader: BufferReader) => {
    const { EventFieldList } = require("./types/eventFieldList");
    return EventFieldList.decode(reader);
};

export const decodeHistoryEventFieldList = (reader: BufferReader) => {
    const { HistoryEventFieldList } = require("./types/historyEventFieldList");
    return HistoryEventFieldList.decode(reader);
};

export const decodeStatusChangeNotification = (reader: BufferReader) => {
    const { StatusChangeNotification } = require("./types/statusChangeNotification");
    return StatusChangeNotification.decode(reader);
};

export const decodeSubscriptionAcknowledgement = (reader: BufferReader) => {
    const { SubscriptionAcknowledgement } = require("./types/subscriptionAcknowledgement");
    return SubscriptionAcknowledgement.decode(reader);
};

export const decodePublishRequest = (reader: BufferReader) => {
    const { PublishRequest } = require("./types/publishRequest");
    return PublishRequest.decode(reader);
};

export const decodePublishResponse = (reader: BufferReader) => {
    const { PublishResponse } = require("./types/publishResponse");
    return PublishResponse.decode(reader);
};

export const decodeRepublishRequest = (reader: BufferReader) => {
    const { RepublishRequest } = require("./types/republishRequest");
    return RepublishRequest.decode(reader);
};

export const decodeRepublishResponse = (reader: BufferReader) => {
    const { RepublishResponse } = require("./types/republishResponse");
    return RepublishResponse.decode(reader);
};

export const decodeTransferResult = (reader: BufferReader) => {
    const { TransferResult } = require("./types/transferResult");
    return TransferResult.decode(reader);
};

export const decodeTransferSubscriptionsRequest = (reader: BufferReader) => {
    const { TransferSubscriptionsRequest } = require("./types/transferSubscriptionsRequest");
    return TransferSubscriptionsRequest.decode(reader);
};

export const decodeTransferSubscriptionsResponse = (reader: BufferReader) => {
    const { TransferSubscriptionsResponse } = require("./types/transferSubscriptionsResponse");
    return TransferSubscriptionsResponse.decode(reader);
};

export const decodeDeleteSubscriptionsRequest = (reader: BufferReader) => {
    const { DeleteSubscriptionsRequest } = require("./types/deleteSubscriptionsRequest");
    return DeleteSubscriptionsRequest.decode(reader);
};

export const decodeDeleteSubscriptionsResponse = (reader: BufferReader) => {
    const { DeleteSubscriptionsResponse } = require("./types/deleteSubscriptionsResponse");
    return DeleteSubscriptionsResponse.decode(reader);
};

export const decodeBuildInfo = (reader: BufferReader) => {
    const { BuildInfo } = require("./types/buildInfo");
    return BuildInfo.decode(reader);
};

export const decodeRedundantServerDataType = (reader: BufferReader) => {
    const { RedundantServerDataType } = require("./types/redundantServerDataType");
    return RedundantServerDataType.decode(reader);
};

export const decodeEndpointUrlListDataType = (reader: BufferReader) => {
    const { EndpointUrlListDataType } = require("./types/endpointUrlListDataType");
    return EndpointUrlListDataType.decode(reader);
};

export const decodeNetworkGroupDataType = (reader: BufferReader) => {
    const { NetworkGroupDataType } = require("./types/networkGroupDataType");
    return NetworkGroupDataType.decode(reader);
};

export const decodeSamplingIntervalDiagnosticsDataType = (reader: BufferReader) => {
    const { SamplingIntervalDiagnosticsDataType } = require("./types/samplingIntervalDiagnosticsDataType");
    return SamplingIntervalDiagnosticsDataType.decode(reader);
};

export const decodeServerDiagnosticsSummaryDataType = (reader: BufferReader) => {
    const { ServerDiagnosticsSummaryDataType } = require("./types/serverDiagnosticsSummaryDataType");
    return ServerDiagnosticsSummaryDataType.decode(reader);
};

export const decodeServerStatusDataType = (reader: BufferReader) => {
    const { ServerStatusDataType } = require("./types/serverStatusDataType");
    return ServerStatusDataType.decode(reader);
};

export const decodeSessionDiagnosticsDataType = (reader: BufferReader) => {
    const { SessionDiagnosticsDataType } = require("./types/sessionDiagnosticsDataType");
    return SessionDiagnosticsDataType.decode(reader);
};

export const decodeSessionSecurityDiagnosticsDataType = (reader: BufferReader) => {
    const { SessionSecurityDiagnosticsDataType } = require("./types/sessionSecurityDiagnosticsDataType");
    return SessionSecurityDiagnosticsDataType.decode(reader);
};

export const decodeServiceCounterDataType = (reader: BufferReader) => {
    const { ServiceCounterDataType } = require("./types/serviceCounterDataType");
    return ServiceCounterDataType.decode(reader);
};

export const decodeStatusResult = (reader: BufferReader) => {
    const { StatusResult } = require("./types/statusResult");
    return StatusResult.decode(reader);
};

export const decodeSubscriptionDiagnosticsDataType = (reader: BufferReader) => {
    const { SubscriptionDiagnosticsDataType } = require("./types/subscriptionDiagnosticsDataType");
    return SubscriptionDiagnosticsDataType.decode(reader);
};

export const decodeModelChangeStructureDataType = (reader: BufferReader) => {
    const { ModelChangeStructureDataType } = require("./types/modelChangeStructureDataType");
    return ModelChangeStructureDataType.decode(reader);
};

export const decodeSemanticChangeStructureDataType = (reader: BufferReader) => {
    const { SemanticChangeStructureDataType } = require("./types/semanticChangeStructureDataType");
    return SemanticChangeStructureDataType.decode(reader);
};

export const decodeRange = (reader: BufferReader) => {
    const { Range } = require("./types/range");
    return Range.decode(reader);
};

export const decodeEUInformation = (reader: BufferReader) => {
    const { EUInformation } = require("./types/eUInformation");
    return EUInformation.decode(reader);
};

export const decodeComplexNumberType = (reader: BufferReader) => {
    const { ComplexNumberType } = require("./types/complexNumberType");
    return ComplexNumberType.decode(reader);
};

export const decodeDoubleComplexNumberType = (reader: BufferReader) => {
    const { DoubleComplexNumberType } = require("./types/doubleComplexNumberType");
    return DoubleComplexNumberType.decode(reader);
};

export const decodeAxisInformation = (reader: BufferReader) => {
    const { AxisInformation } = require("./types/axisInformation");
    return AxisInformation.decode(reader);
};

export const decodeXVType = (reader: BufferReader) => {
    const { XVType } = require("./types/xVType");
    return XVType.decode(reader);
};

export const decodeProgramDiagnosticDataType = (reader: BufferReader) => {
    const { ProgramDiagnosticDataType } = require("./types/programDiagnosticDataType");
    return ProgramDiagnosticDataType.decode(reader);
};

export const decodeProgramDiagnostic2DataType = (reader: BufferReader) => {
    const { ProgramDiagnostic2DataType } = require("./types/programDiagnostic2DataType");
    return ProgramDiagnostic2DataType.decode(reader);
};

export const decodeAnnotation = (reader: BufferReader) => {
    const { Annotation } = require("./types/annotation");
    return Annotation.decode(reader);
};
