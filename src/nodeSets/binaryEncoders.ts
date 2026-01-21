// AUTO-GENERATED – DO NOT EDIT
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IIdentifiable } from "../codecs/iIdentifiable";
import { ExpandedNodeId } from "../types/expandedNodeId";
import { NodeId } from "../types/nodeId";

export const encodeId = (writer: BufferWriter, encoderId: number) => {
   const id = new ExpandedNodeId(NodeId.NewFourByte(0,encoderId));
   writer.writeExpandedNodeId(id);
}

export const encodeEnumeration = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeUnion = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12766);
    (identifiable as any).encode(writer);
};

export const encodeKeyValuePair = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 14846);
    (identifiable as any).encode(writer);
};

export const encodeAdditionalParametersType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 17537);
    (identifiable as any).encode(writer);
};

export const encodeEphemeralKeyType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 17549);
    (identifiable as any).encode(writer);
};

export const encodeEndpointType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15671);
    (identifiable as any).encode(writer);
};

export const encodeBitFieldDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32422);
    (identifiable as any).encode(writer);
};

export const encodeRationalNumber = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18815);
    (identifiable as any).encode(writer);
};

export const encodeVector = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18816);
    (identifiable as any).encode(writer);
};

export const encodeThreeDVector = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18817);
    (identifiable as any).encode(writer);
};

export const encodeCartesianCoordinates = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18818);
    (identifiable as any).encode(writer);
};

export const encodeThreeDCartesianCoordinates = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18819);
    (identifiable as any).encode(writer);
};

export const encodeOrientation = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18820);
    (identifiable as any).encode(writer);
};

export const encodeThreeDOrientation = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18821);
    (identifiable as any).encode(writer);
};

export const encodeFrame = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18822);
    (identifiable as any).encode(writer);
};

export const encodeThreeDFrame = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18823);
    (identifiable as any).encode(writer);
};

export const encodeIdentityMappingRuleType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15736);
    (identifiable as any).encode(writer);
};

export const encodeCurrencyUnitType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23507);
    (identifiable as any).encode(writer);
};

export const encodeAnnotationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32560);
    (identifiable as any).encode(writer);
};

export const encodeLinearConversionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32561);
    (identifiable as any).encode(writer);
};

export const encodeQuantityDimension = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32562);
    (identifiable as any).encode(writer);
};

export const encodeTrustListDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12680);
    (identifiable as any).encode(writer);
};

export const encodeBaseConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16538);
    (identifiable as any).encode(writer);
};

export const encodeBaseConfigurationRecordDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16539);
    (identifiable as any).encode(writer);
};

export const encodeCertificateGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16540);
    (identifiable as any).encode(writer);
};

export const encodeConfigurationUpdateTargetType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16541);
    (identifiable as any).encode(writer);
};

export const encodeTransactionErrorType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32382);
    (identifiable as any).encode(writer);
};

export const encodeApplicationConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23754);
    (identifiable as any).encode(writer);
};

export const encodeApplicationIdentityDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16543);
    (identifiable as any).encode(writer);
};

export const encodeEndpointDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16544);
    (identifiable as any).encode(writer);
};

export const encodeServerEndpointDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16545);
    (identifiable as any).encode(writer);
};

export const encodeSecuritySettingsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16546);
    (identifiable as any).encode(writer);
};

export const encodeUserTokenSettingsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 16547);
    (identifiable as any).encode(writer);
};

export const encodeServiceCertificateDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23725);
    (identifiable as any).encode(writer);
};

export const encodeAuthorizationServiceConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23755);
    (identifiable as any).encode(writer);
};

export const encodeDecimalDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 17863);
    (identifiable as any).encode(writer);
};

export const encodeDataTypeSchemaHeader = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15676);
    (identifiable as any).encode(writer);
};

export const encodeDataTypeDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 125);
    (identifiable as any).encode(writer);
};

export const encodeStructureDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 126);
    (identifiable as any).encode(writer);
};

export const encodeEnumDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 127);
    (identifiable as any).encode(writer);
};

export const encodeSimpleTypeDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15421);
    (identifiable as any).encode(writer);
};

export const encodeUABinaryFileDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15422);
    (identifiable as any).encode(writer);
};

export const encodePortableQualifiedName = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 24108);
    (identifiable as any).encode(writer);
};

export const encodePortableNodeId = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 24109);
    (identifiable as any).encode(writer);
};

export const encodeUnsignedRationalNumber = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 24110);
    (identifiable as any).encode(writer);
};

export const encodeDataSetMetaDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 124);
    (identifiable as any).encode(writer);
};

export const encodeFieldMetaData = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 14839);
    (identifiable as any).encode(writer);
};

export const encodeConfigurationVersionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 14847);
    (identifiable as any).encode(writer);
};

export const encodePublishedDataSetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15677);
    (identifiable as any).encode(writer);
};

export const encodePublishedDataSetSourceDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15678);
    (identifiable as any).encode(writer);
};

export const encodePublishedVariableDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 14323);
    (identifiable as any).encode(writer);
};

export const encodePublishedDataItemsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15679);
    (identifiable as any).encode(writer);
};

export const encodePublishedEventsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15681);
    (identifiable as any).encode(writer);
};

export const encodePublishedDataSetCustomSourceDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 25529);
    (identifiable as any).encode(writer);
};

export const encodeActionTargetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18598);
    (identifiable as any).encode(writer);
};

export const encodePublishedActionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18599);
    (identifiable as any).encode(writer);
};

export const encodeActionMethodDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18600);
    (identifiable as any).encode(writer);
};

export const encodePublishedActionMethodDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18795);
    (identifiable as any).encode(writer);
};

export const encodeDataSetWriterDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15682);
    (identifiable as any).encode(writer);
};

export const encodeDataSetWriterTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15683);
    (identifiable as any).encode(writer);
};

export const encodeDataSetWriterMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15688);
    (identifiable as any).encode(writer);
};

export const encodePubSubGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15689);
    (identifiable as any).encode(writer);
};

export const encodeWriterGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 21150);
    (identifiable as any).encode(writer);
};

export const encodeWriterGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15691);
    (identifiable as any).encode(writer);
};

export const encodeWriterGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15693);
    (identifiable as any).encode(writer);
};

export const encodePubSubConnectionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15694);
    (identifiable as any).encode(writer);
};

export const encodeConnectionTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15695);
    (identifiable as any).encode(writer);
};

export const encodeNetworkAddressDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 21151);
    (identifiable as any).encode(writer);
};

export const encodeNetworkAddressUrlDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 21152);
    (identifiable as any).encode(writer);
};

export const encodeReaderGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 21153);
    (identifiable as any).encode(writer);
};

export const encodeReaderGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15701);
    (identifiable as any).encode(writer);
};

export const encodeReaderGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15702);
    (identifiable as any).encode(writer);
};

export const encodeDataSetReaderDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15703);
    (identifiable as any).encode(writer);
};

export const encodeDataSetReaderTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15705);
    (identifiable as any).encode(writer);
};

export const encodeDataSetReaderMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15706);
    (identifiable as any).encode(writer);
};

export const encodeSubscribedDataSetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15707);
    (identifiable as any).encode(writer);
};

export const encodeTargetVariablesDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15712);
    (identifiable as any).encode(writer);
};

export const encodeFieldTargetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 14848);
    (identifiable as any).encode(writer);
};

export const encodeSubscribedDataSetMirrorDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15713);
    (identifiable as any).encode(writer);
};

export const encodePubSubConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 21154);
    (identifiable as any).encode(writer);
};

export const encodeStandaloneSubscribedDataSetRefDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23851);
    (identifiable as any).encode(writer);
};

export const encodeStandaloneSubscribedDataSetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23852);
    (identifiable as any).encode(writer);
};

export const encodeSecurityGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23853);
    (identifiable as any).encode(writer);
};

export const encodePubSubKeyPushTargetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 25530);
    (identifiable as any).encode(writer);
};

export const encodePubSubConfiguration2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23854);
    (identifiable as any).encode(writer);
};

export const encodeUadpWriterGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15715);
    (identifiable as any).encode(writer);
};

export const encodeUadpDataSetWriterMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15717);
    (identifiable as any).encode(writer);
};

export const encodeUadpDataSetReaderMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15718);
    (identifiable as any).encode(writer);
};

export const encodeJsonWriterGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15719);
    (identifiable as any).encode(writer);
};

export const encodeJsonDataSetWriterMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15724);
    (identifiable as any).encode(writer);
};

export const encodeJsonDataSetReaderMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15725);
    (identifiable as any).encode(writer);
};

export const encodeQosDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23855);
    (identifiable as any).encode(writer);
};

export const encodeTransmitQosDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23856);
    (identifiable as any).encode(writer);
};

export const encodeTransmitQosPriorityDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23857);
    (identifiable as any).encode(writer);
};

export const encodeReceiveQosDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23860);
    (identifiable as any).encode(writer);
};

export const encodeReceiveQosPriorityDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23861);
    (identifiable as any).encode(writer);
};

export const encodeDatagramConnectionTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 17468);
    (identifiable as any).encode(writer);
};

export const encodeDatagramConnectionTransport2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23864);
    (identifiable as any).encode(writer);
};

export const encodeDatagramWriterGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 21155);
    (identifiable as any).encode(writer);
};

export const encodeDatagramWriterGroupTransport2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23865);
    (identifiable as any).encode(writer);
};

export const encodeDatagramDataSetReaderTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23866);
    (identifiable as any).encode(writer);
};

export const encodeDtlsPubSubConnectionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18930);
    (identifiable as any).encode(writer);
};

export const encodeBrokerConnectionTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15479);
    (identifiable as any).encode(writer);
};

export const encodeBrokerWriterGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15727);
    (identifiable as any).encode(writer);
};

export const encodeBrokerDataSetWriterTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15729);
    (identifiable as any).encode(writer);
};

export const encodeBrokerDataSetReaderTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15733);
    (identifiable as any).encode(writer);
};

export const encodePubSubConfigurationRefDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 25531);
    (identifiable as any).encode(writer);
};

export const encodePubSubConfigurationValueDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 25532);
    (identifiable as any).encode(writer);
};

export const encodeJsonNetworkMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonDataSetMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonDataSetMetaDataMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonApplicationDescriptionMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonServerEndpointsMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonStatusMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonPubSubConnectionMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonActionMetaDataMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonActionResponderMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonActionNetworkMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonActionRequestMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeJsonActionResponseMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    (identifiable as any).encode(writer);
};

export const encodeAliasNameDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23499);
    (identifiable as any).encode(writer);
};

export const encodeUserManagementDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 24292);
    (identifiable as any).encode(writer);
};

export const encodePriorityMappingEntryType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 25239);
    (identifiable as any).encode(writer);
};

export const encodeLldpManagementAddressTxPortType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19079);
    (identifiable as any).encode(writer);
};

export const encodeLldpManagementAddressType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19080);
    (identifiable as any).encode(writer);
};

export const encodeLldpTlvType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19081);
    (identifiable as any).encode(writer);
};

export const encodeReferenceDescriptionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32661);
    (identifiable as any).encode(writer);
};

export const encodeReferenceListEntryDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32662);
    (identifiable as any).encode(writer);
};

export const encodeLogRecord = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19379);
    (identifiable as any).encode(writer);
};

export const encodeLogRecordsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19753);
    (identifiable as any).encode(writer);
};

export const encodeSpanContextDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19754);
    (identifiable as any).encode(writer);
};

export const encodeTraceContextDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19755);
    (identifiable as any).encode(writer);
};

export const encodeNameValuePair = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 19756);
    (identifiable as any).encode(writer);
};

export const encodeRolePermissionType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 128);
    (identifiable as any).encode(writer);
};

export const encodeDataTypeDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 121);
    (identifiable as any).encode(writer);
};

export const encodeStructureField = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 14844);
    (identifiable as any).encode(writer);
};

export const encodeStructureDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 122);
    (identifiable as any).encode(writer);
};

export const encodeEnumDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 123);
    (identifiable as any).encode(writer);
};

export const encodeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 260);
    (identifiable as any).encode(writer);
};

export const encodeObjectNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 263);
    (identifiable as any).encode(writer);
};

export const encodeObjectTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 266);
    (identifiable as any).encode(writer);
};

export const encodeVariableNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 269);
    (identifiable as any).encode(writer);
};

export const encodeVariableTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 272);
    (identifiable as any).encode(writer);
};

export const encodeReferenceTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 275);
    (identifiable as any).encode(writer);
};

export const encodeMethodNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 278);
    (identifiable as any).encode(writer);
};

export const encodeViewNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 281);
    (identifiable as any).encode(writer);
};

export const encodeDataTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 284);
    (identifiable as any).encode(writer);
};

export const encodeReferenceNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 287);
    (identifiable as any).encode(writer);
};

export const encodeArgument = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 298);
    (identifiable as any).encode(writer);
};

export const encodeEnumValueType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 8251);
    (identifiable as any).encode(writer);
};

export const encodeEnumField = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 14845);
    (identifiable as any).encode(writer);
};

export const encodeOptionSet = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12765);
    (identifiable as any).encode(writer);
};

export const encodeTimeZoneDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 8917);
    (identifiable as any).encode(writer);
};

export const encodeApplicationDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 310);
    (identifiable as any).encode(writer);
};

export const encodeRequestHeader = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 391);
    (identifiable as any).encode(writer);
};

export const encodeResponseHeader = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 394);
    (identifiable as any).encode(writer);
};

export const encodeServiceFault = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 397);
    (identifiable as any).encode(writer);
};

export const encodeSessionlessInvokeRequestType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 15903);
    (identifiable as any).encode(writer);
};

export const encodeSessionlessInvokeResponseType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 21001);
    (identifiable as any).encode(writer);
};

export const encodeFindServersRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 422);
    (identifiable as any).encode(writer);
};

export const encodeFindServersResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 425);
    (identifiable as any).encode(writer);
};

export const encodeServerOnNetwork = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12207);
    (identifiable as any).encode(writer);
};

export const encodeFindServersOnNetworkRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12208);
    (identifiable as any).encode(writer);
};

export const encodeFindServersOnNetworkResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12209);
    (identifiable as any).encode(writer);
};

export const encodeUserTokenPolicy = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 306);
    (identifiable as any).encode(writer);
};

export const encodeEndpointDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 314);
    (identifiable as any).encode(writer);
};

export const encodeGetEndpointsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 428);
    (identifiable as any).encode(writer);
};

export const encodeGetEndpointsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 431);
    (identifiable as any).encode(writer);
};

export const encodeRegisteredServer = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 434);
    (identifiable as any).encode(writer);
};

export const encodeRegisterServerRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 437);
    (identifiable as any).encode(writer);
};

export const encodeRegisterServerResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 440);
    (identifiable as any).encode(writer);
};

export const encodeMdnsDiscoveryConfiguration = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12901);
    (identifiable as any).encode(writer);
};

export const encodeRegisterServer2Request = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12211);
    (identifiable as any).encode(writer);
};

export const encodeRegisterServer2Response = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12212);
    (identifiable as any).encode(writer);
};

export const encodeChannelSecurityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 443);
    (identifiable as any).encode(writer);
};

export const encodeOpenSecureChannelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 446);
    (identifiable as any).encode(writer);
};

export const encodeOpenSecureChannelResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 449);
    (identifiable as any).encode(writer);
};

export const encodeCloseSecureChannelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 452);
    (identifiable as any).encode(writer);
};

export const encodeCloseSecureChannelResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 455);
    (identifiable as any).encode(writer);
};

export const encodeSignedSoftwareCertificate = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 346);
    (identifiable as any).encode(writer);
};

export const encodeSignatureData = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 458);
    (identifiable as any).encode(writer);
};

export const encodeCreateSessionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 461);
    (identifiable as any).encode(writer);
};

export const encodeCreateSessionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 464);
    (identifiable as any).encode(writer);
};

export const encodeUserIdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 318);
    (identifiable as any).encode(writer);
};

export const encodeUserNameIdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 324);
    (identifiable as any).encode(writer);
};

export const encodeX509IdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 327);
    (identifiable as any).encode(writer);
};

export const encodeIssuedIdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 940);
    (identifiable as any).encode(writer);
};

export const encodeActivateSessionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 467);
    (identifiable as any).encode(writer);
};

export const encodeActivateSessionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 470);
    (identifiable as any).encode(writer);
};

export const encodeCloseSessionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 473);
    (identifiable as any).encode(writer);
};

export const encodeCloseSessionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 476);
    (identifiable as any).encode(writer);
};

export const encodeCancelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 479);
    (identifiable as any).encode(writer);
};

export const encodeCancelResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 482);
    (identifiable as any).encode(writer);
};

export const encodeNodeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 351);
    (identifiable as any).encode(writer);
};

export const encodeObjectAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 354);
    (identifiable as any).encode(writer);
};

export const encodeVariableAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 357);
    (identifiable as any).encode(writer);
};

export const encodeMethodAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 360);
    (identifiable as any).encode(writer);
};

export const encodeObjectTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 363);
    (identifiable as any).encode(writer);
};

export const encodeVariableTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 366);
    (identifiable as any).encode(writer);
};

export const encodeReferenceTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 369);
    (identifiable as any).encode(writer);
};

export const encodeDataTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 372);
    (identifiable as any).encode(writer);
};

export const encodeViewAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 375);
    (identifiable as any).encode(writer);
};

export const encodeGenericAttributeValue = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 17610);
    (identifiable as any).encode(writer);
};

export const encodeGenericAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 17611);
    (identifiable as any).encode(writer);
};

export const encodeAddNodesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 378);
    (identifiable as any).encode(writer);
};

export const encodeAddNodesResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 485);
    (identifiable as any).encode(writer);
};

export const encodeAddNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 488);
    (identifiable as any).encode(writer);
};

export const encodeAddNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 491);
    (identifiable as any).encode(writer);
};

export const encodeAddReferencesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 381);
    (identifiable as any).encode(writer);
};

export const encodeAddReferencesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 494);
    (identifiable as any).encode(writer);
};

export const encodeAddReferencesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 497);
    (identifiable as any).encode(writer);
};

export const encodeDeleteNodesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 384);
    (identifiable as any).encode(writer);
};

export const encodeDeleteNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 500);
    (identifiable as any).encode(writer);
};

export const encodeDeleteNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 503);
    (identifiable as any).encode(writer);
};

export const encodeDeleteReferencesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 387);
    (identifiable as any).encode(writer);
};

export const encodeDeleteReferencesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 506);
    (identifiable as any).encode(writer);
};

export const encodeDeleteReferencesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 509);
    (identifiable as any).encode(writer);
};

export const encodeViewDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 513);
    (identifiable as any).encode(writer);
};

export const encodeBrowseDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 516);
    (identifiable as any).encode(writer);
};

export const encodeReferenceDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 520);
    (identifiable as any).encode(writer);
};

export const encodeBrowseResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 524);
    (identifiable as any).encode(writer);
};

export const encodeBrowseRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 527);
    (identifiable as any).encode(writer);
};

export const encodeBrowseResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 530);
    (identifiable as any).encode(writer);
};

export const encodeBrowseNextRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 533);
    (identifiable as any).encode(writer);
};

export const encodeBrowseNextResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 536);
    (identifiable as any).encode(writer);
};

export const encodeRelativePathElement = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 539);
    (identifiable as any).encode(writer);
};

export const encodeRelativePath = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 542);
    (identifiable as any).encode(writer);
};

export const encodeBrowsePath = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 545);
    (identifiable as any).encode(writer);
};

export const encodeBrowsePathTarget = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 548);
    (identifiable as any).encode(writer);
};

export const encodeBrowsePathResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 551);
    (identifiable as any).encode(writer);
};

export const encodeTranslateBrowsePathsToNodeIdsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 554);
    (identifiable as any).encode(writer);
};

export const encodeTranslateBrowsePathsToNodeIdsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 557);
    (identifiable as any).encode(writer);
};

export const encodeRegisterNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 560);
    (identifiable as any).encode(writer);
};

export const encodeRegisterNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 563);
    (identifiable as any).encode(writer);
};

export const encodeUnregisterNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 566);
    (identifiable as any).encode(writer);
};

export const encodeUnregisterNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 569);
    (identifiable as any).encode(writer);
};

export const encodeEndpointConfiguration = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 333);
    (identifiable as any).encode(writer);
};

export const encodeQueryDataDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 572);
    (identifiable as any).encode(writer);
};

export const encodeNodeTypeDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 575);
    (identifiable as any).encode(writer);
};

export const encodeQueryDataSet = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 579);
    (identifiable as any).encode(writer);
};

export const encodeNodeReference = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 582);
    (identifiable as any).encode(writer);
};

export const encodeContentFilterElement = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 585);
    (identifiable as any).encode(writer);
};

export const encodeContentFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 588);
    (identifiable as any).encode(writer);
};

export const encodeFilterOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 591);
    (identifiable as any).encode(writer);
};

export const encodeElementOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 594);
    (identifiable as any).encode(writer);
};

export const encodeLiteralOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 597);
    (identifiable as any).encode(writer);
};

export const encodeAttributeOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 600);
    (identifiable as any).encode(writer);
};

export const encodeSimpleAttributeOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 603);
    (identifiable as any).encode(writer);
};

export const encodeContentFilterElementResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 606);
    (identifiable as any).encode(writer);
};

export const encodeContentFilterResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 609);
    (identifiable as any).encode(writer);
};

export const encodeParsingResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 612);
    (identifiable as any).encode(writer);
};

export const encodeQueryFirstRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 615);
    (identifiable as any).encode(writer);
};

export const encodeQueryFirstResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 618);
    (identifiable as any).encode(writer);
};

export const encodeQueryNextRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 621);
    (identifiable as any).encode(writer);
};

export const encodeQueryNextResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 624);
    (identifiable as any).encode(writer);
};

export const encodeReadValueId = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 628);
    (identifiable as any).encode(writer);
};

export const encodeReadRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 631);
    (identifiable as any).encode(writer);
};

export const encodeReadResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 634);
    (identifiable as any).encode(writer);
};

export const encodeHistoryReadValueId = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 637);
    (identifiable as any).encode(writer);
};

export const encodeHistoryReadResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 640);
    (identifiable as any).encode(writer);
};

export const encodeHistoryReadDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 643);
    (identifiable as any).encode(writer);
};

export const encodeReadEventDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 646);
    (identifiable as any).encode(writer);
};

export const encodeReadEventDetails2 = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32800);
    (identifiable as any).encode(writer);
};

export const encodeSortRuleElement = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18650);
    (identifiable as any).encode(writer);
};

export const encodeReadEventDetailsSorted = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 18651);
    (identifiable as any).encode(writer);
};

export const encodeReadRawModifiedDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 649);
    (identifiable as any).encode(writer);
};

export const encodeReadProcessedDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 652);
    (identifiable as any).encode(writer);
};

export const encodeReadAtTimeDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 655);
    (identifiable as any).encode(writer);
};

export const encodeReadAnnotationDataDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 23500);
    (identifiable as any).encode(writer);
};

export const encodeHistoryData = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 658);
    (identifiable as any).encode(writer);
};

export const encodeModificationInfo = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 11226);
    (identifiable as any).encode(writer);
};

export const encodeHistoryModifiedData = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 11227);
    (identifiable as any).encode(writer);
};

export const encodeHistoryEvent = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 661);
    (identifiable as any).encode(writer);
};

export const encodeHistoryModifiedEvent = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 32825);
    (identifiable as any).encode(writer);
};

export const encodeHistoryReadRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 664);
    (identifiable as any).encode(writer);
};

export const encodeHistoryReadResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 667);
    (identifiable as any).encode(writer);
};

export const encodeWriteValue = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 670);
    (identifiable as any).encode(writer);
};

export const encodeWriteRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 673);
    (identifiable as any).encode(writer);
};

export const encodeWriteResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 676);
    (identifiable as any).encode(writer);
};

export const encodeHistoryUpdateDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 679);
    (identifiable as any).encode(writer);
};

export const encodeUpdateDataDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 682);
    (identifiable as any).encode(writer);
};

export const encodeUpdateStructureDataDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 11300);
    (identifiable as any).encode(writer);
};

export const encodeUpdateEventDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 685);
    (identifiable as any).encode(writer);
};

export const encodeDeleteRawModifiedDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 688);
    (identifiable as any).encode(writer);
};

export const encodeDeleteAtTimeDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 691);
    (identifiable as any).encode(writer);
};

export const encodeDeleteEventDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 694);
    (identifiable as any).encode(writer);
};

export const encodeHistoryUpdateResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 697);
    (identifiable as any).encode(writer);
};

export const encodeHistoryUpdateRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 700);
    (identifiable as any).encode(writer);
};

export const encodeHistoryUpdateResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 703);
    (identifiable as any).encode(writer);
};

export const encodeCallMethodRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 706);
    (identifiable as any).encode(writer);
};

export const encodeCallMethodResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 709);
    (identifiable as any).encode(writer);
};

export const encodeCallRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 712);
    (identifiable as any).encode(writer);
};

export const encodeCallResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 715);
    (identifiable as any).encode(writer);
};

export const encodeDataChangeFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 724);
    (identifiable as any).encode(writer);
};

export const encodeEventFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 727);
    (identifiable as any).encode(writer);
};

export const encodeAggregateConfiguration = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 950);
    (identifiable as any).encode(writer);
};

export const encodeAggregateFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 730);
    (identifiable as any).encode(writer);
};

export const encodeEventFilterResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 736);
    (identifiable as any).encode(writer);
};

export const encodeAggregateFilterResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 739);
    (identifiable as any).encode(writer);
};

export const encodeMonitoringParameters = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 742);
    (identifiable as any).encode(writer);
};

export const encodeMonitoredItemCreateRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 745);
    (identifiable as any).encode(writer);
};

export const encodeMonitoredItemCreateResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 748);
    (identifiable as any).encode(writer);
};

export const encodeCreateMonitoredItemsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 751);
    (identifiable as any).encode(writer);
};

export const encodeCreateMonitoredItemsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 754);
    (identifiable as any).encode(writer);
};

export const encodeMonitoredItemModifyRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 757);
    (identifiable as any).encode(writer);
};

export const encodeMonitoredItemModifyResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 760);
    (identifiable as any).encode(writer);
};

export const encodeModifyMonitoredItemsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 763);
    (identifiable as any).encode(writer);
};

export const encodeModifyMonitoredItemsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 766);
    (identifiable as any).encode(writer);
};

export const encodeSetMonitoringModeRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 769);
    (identifiable as any).encode(writer);
};

export const encodeSetMonitoringModeResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 772);
    (identifiable as any).encode(writer);
};

export const encodeSetTriggeringRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 775);
    (identifiable as any).encode(writer);
};

export const encodeSetTriggeringResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 778);
    (identifiable as any).encode(writer);
};

export const encodeDeleteMonitoredItemsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 781);
    (identifiable as any).encode(writer);
};

export const encodeDeleteMonitoredItemsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 784);
    (identifiable as any).encode(writer);
};

export const encodeCreateSubscriptionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 787);
    (identifiable as any).encode(writer);
};

export const encodeCreateSubscriptionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 790);
    (identifiable as any).encode(writer);
};

export const encodeModifySubscriptionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 793);
    (identifiable as any).encode(writer);
};

export const encodeModifySubscriptionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 796);
    (identifiable as any).encode(writer);
};

export const encodeSetPublishingModeRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 799);
    (identifiable as any).encode(writer);
};

export const encodeSetPublishingModeResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 802);
    (identifiable as any).encode(writer);
};

export const encodeNotificationMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 805);
    (identifiable as any).encode(writer);
};

export const encodeDataChangeNotification = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 811);
    (identifiable as any).encode(writer);
};

export const encodeMonitoredItemNotification = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 808);
    (identifiable as any).encode(writer);
};

export const encodeEventNotificationList = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 916);
    (identifiable as any).encode(writer);
};

export const encodeEventFieldList = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 919);
    (identifiable as any).encode(writer);
};

export const encodeHistoryEventFieldList = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 922);
    (identifiable as any).encode(writer);
};

export const encodeStatusChangeNotification = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 820);
    (identifiable as any).encode(writer);
};

export const encodeSubscriptionAcknowledgement = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 823);
    (identifiable as any).encode(writer);
};

export const encodePublishRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 826);
    (identifiable as any).encode(writer);
};

export const encodePublishResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 829);
    (identifiable as any).encode(writer);
};

export const encodeRepublishRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 832);
    (identifiable as any).encode(writer);
};

export const encodeRepublishResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 835);
    (identifiable as any).encode(writer);
};

export const encodeTransferResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 838);
    (identifiable as any).encode(writer);
};

export const encodeTransferSubscriptionsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 841);
    (identifiable as any).encode(writer);
};

export const encodeTransferSubscriptionsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 844);
    (identifiable as any).encode(writer);
};

export const encodeDeleteSubscriptionsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 847);
    (identifiable as any).encode(writer);
};

export const encodeDeleteSubscriptionsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 850);
    (identifiable as any).encode(writer);
};

export const encodeBuildInfo = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 340);
    (identifiable as any).encode(writer);
};

export const encodeRedundantServerDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 855);
    (identifiable as any).encode(writer);
};

export const encodeEndpointUrlListDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 11957);
    (identifiable as any).encode(writer);
};

export const encodeNetworkGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 11958);
    (identifiable as any).encode(writer);
};

export const encodeSamplingIntervalDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 858);
    (identifiable as any).encode(writer);
};

export const encodeServerDiagnosticsSummaryDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 861);
    (identifiable as any).encode(writer);
};

export const encodeServerStatusDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 864);
    (identifiable as any).encode(writer);
};

export const encodeSessionDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 867);
    (identifiable as any).encode(writer);
};

export const encodeSessionSecurityDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 870);
    (identifiable as any).encode(writer);
};

export const encodeServiceCounterDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 873);
    (identifiable as any).encode(writer);
};

export const encodeStatusResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 301);
    (identifiable as any).encode(writer);
};

export const encodeSubscriptionDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 876);
    (identifiable as any).encode(writer);
};

export const encodeModelChangeStructureDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 879);
    (identifiable as any).encode(writer);
};

export const encodeSemanticChangeStructureDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 899);
    (identifiable as any).encode(writer);
};

export const encodeRange = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 886);
    (identifiable as any).encode(writer);
};

export const encodeEUInformation = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 889);
    (identifiable as any).encode(writer);
};

export const encodeComplexNumberType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12181);
    (identifiable as any).encode(writer);
};

export const encodeDoubleComplexNumberType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12182);
    (identifiable as any).encode(writer);
};

export const encodeAxisInformation = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12089);
    (identifiable as any).encode(writer);
};

export const encodeXVType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 12090);
    (identifiable as any).encode(writer);
};

export const encodeProgramDiagnosticDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 896);
    (identifiable as any).encode(writer);
};

export const encodeProgramDiagnostic2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 24034);
    (identifiable as any).encode(writer);
};

export const encodeAnnotation = (writer: BufferWriter, identifiable: IIdentifiable) => {
    encodeId(writer, 893);
    (identifiable as any).encode(writer);
};
