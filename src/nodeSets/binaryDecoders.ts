// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../codecs/binary/bufferReader";
import { ActionStateEnum } from "./types/actionState";
import { ApplicationTypeEnum } from "./types/applicationType";
import { AxisScaleEnumerationEnum } from "./types/axisScaleEnumeration";
import { BrokerTransportQualityOfServiceEnum } from "./types/brokerTransportQualityOfService";
import { BrowseDirectionEnum } from "./types/browseDirection";
import { ConfigurationUpdateTypeEnum } from "./types/configurationUpdateType";
import { DataChangeTriggerEnum } from "./types/dataChangeTrigger";
import { DataSetFieldContentMaskEnum } from "./types/dataSetFieldContentMask";
import { DataSetFieldFlagsEnum } from "./types/dataSetFieldFlags";
import { DataSetOrderingTypeEnum } from "./types/dataSetOrderingType";
import { FilterOperatorEnum } from "./types/filterOperator";
import { HistoryUpdateTypeEnum } from "./types/historyUpdateType";
import { IdentityCriteriaTypeEnum } from "./types/identityCriteriaType";
import { JsonDataSetMessageContentMaskEnum } from "./types/jsonDataSetMessageContentMask";
import { JsonNetworkMessageContentMaskEnum } from "./types/jsonNetworkMessageContentMask";
import { ManAddrIfSubtypeEnum } from "./types/manAddrIfSubtype";
import { MessageSecurityModeEnum } from "./types/messageSecurityMode";
import { MonitoringModeEnum } from "./types/monitoringMode";
import { NodeClassEnum } from "./types/nodeClass";
import { OverrideValueHandlingEnum } from "./types/overrideValueHandling";
import { PerformUpdateTypeEnum } from "./types/performUpdateType";
import { PermissionTypeEnum } from "./types/permissionType";
import { PubSubConfigurationRefMaskEnum } from "./types/pubSubConfigurationRefMask";
import { PubSubStateEnum } from "./types/pubSubState";
import { SecurityTokenRequestTypeEnum } from "./types/securityTokenRequestType";
import { ServerStateEnum } from "./types/serverState";
import { SortOrderTypeEnum } from "./types/sortOrderType";
import { StructureTypeEnum } from "./types/structureType";
import { TimestampsToReturnEnum } from "./types/timestampsToReturn";
import { TrustListValidationOptionsEnum } from "./types/trustListValidationOptions";
import { UadpDataSetMessageContentMaskEnum } from "./types/uadpDataSetMessageContentMask";
import { UadpNetworkMessageContentMaskEnum } from "./types/uadpNetworkMessageContentMask";
import { UserConfigurationMaskEnum } from "./types/userConfigurationMask";
import { UserTokenTypeEnum } from "./types/userTokenType";

export class BinaryDecoders {
    static decodeEnumeration = (reader: BufferReader) => {
        const { Enumeration } = require("./types/enumeration");
        return new Enumeration();
    };

    static decodeUnion = (reader: BufferReader) => {
        const { Union } = require("./types/union");
        return new Union();
    };

    static decodeKeyValuePair = (reader: BufferReader) => {
        const { KeyValuePair } = require("./types/keyValuePair");
        return new KeyValuePair(
            reader.readQualifiedName(),
            reader.readVariant()
        );
    };

    static decodeAdditionalParametersType = (reader: BufferReader) => {
        const { AdditionalParametersType } = require("./types/additionalParametersType");
        return new AdditionalParametersType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })()
        );
    };

    static decodeEphemeralKeyType = (reader: BufferReader) => {
        const { EphemeralKeyType } = require("./types/ephemeralKeyType");
        return new EphemeralKeyType(
            reader.readByteString(),
            reader.readByteString()
        );
    };

    static decodeEndpointType = (reader: BufferReader) => {
        const { EndpointType } = require("./types/endpointType");
        return new EndpointType(
            reader.readString(),
            reader.readUInt32() as MessageSecurityModeEnum,
            reader.readString(),
            reader.readString()
        );
    };

    static decodeBitFieldDefinition = (reader: BufferReader) => {
        const { BitFieldDefinition } = require("./types/bitFieldDefinition");
        return new BitFieldDefinition(
            reader.readString(),
            reader.readLocalizedText(),
            reader.readBoolean(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeRationalNumber = (reader: BufferReader) => {
        const { RationalNumber } = require("./types/rationalNumber");
        return new RationalNumber(
            reader.readInt32(),
            reader.readUInt32()
        );
    };

    static decodeVector = (reader: BufferReader) => {
        const { Vector } = require("./types/vector");
        return new Vector();
    };

    static decodeThreeDVector = (reader: BufferReader) => {
        const { ThreeDVector } = require("./types/threeDVector");
        return new ThreeDVector(
            reader.readFloat64(),
            reader.readFloat64(),
            reader.readFloat64()
        );
    };

    static decodeCartesianCoordinates = (reader: BufferReader) => {
        const { CartesianCoordinates } = require("./types/cartesianCoordinates");
        return new CartesianCoordinates();
    };

    static decodeThreeDCartesianCoordinates = (reader: BufferReader) => {
        const { ThreeDCartesianCoordinates } = require("./types/threeDCartesianCoordinates");
        return new ThreeDCartesianCoordinates(
            reader.readFloat64(),
            reader.readFloat64(),
            reader.readFloat64()
        );
    };

    static decodeOrientation = (reader: BufferReader) => {
        const { Orientation } = require("./types/orientation");
        return new Orientation();
    };

    static decodeThreeDOrientation = (reader: BufferReader) => {
        const { ThreeDOrientation } = require("./types/threeDOrientation");
        return new ThreeDOrientation(
            reader.readFloat64(),
            reader.readFloat64(),
            reader.readFloat64()
        );
    };

    static decodeFrame = (reader: BufferReader) => {
        const { Frame } = require("./types/frame");
        return new Frame();
    };

    static decodeThreeDFrame = (reader: BufferReader) => {
        const { ThreeDFrame } = require("./types/threeDFrame");
        return new ThreeDFrame(
            BinaryDecoders.decodeThreeDCartesianCoordinates(reader),
            BinaryDecoders.decodeThreeDOrientation(reader)
        );
    };

    static decodeIdentityMappingRuleType = (reader: BufferReader) => {
        const { IdentityMappingRuleType } = require("./types/identityMappingRuleType");
        return new IdentityMappingRuleType(
            reader.readUInt32() as IdentityCriteriaTypeEnum,
            reader.readString()
        );
    };

    static decodeCurrencyUnitType = (reader: BufferReader) => {
        const { CurrencyUnitType } = require("./types/currencyUnitType");
        return new CurrencyUnitType(
            reader.readInt16(),
            reader.readInt8(),
            reader.readString(),
            reader.readLocalizedText()
        );
    };

    static decodeAnnotationDataType = (reader: BufferReader) => {
        const { AnnotationDataType } = require("./types/annotationDataType");
        return new AnnotationDataType(
            reader.readString(),
            reader.readString(),
            reader.readString()
        );
    };

    static decodeLinearConversionDataType = (reader: BufferReader) => {
        const { LinearConversionDataType } = require("./types/linearConversionDataType");
        return new LinearConversionDataType(
            reader.readFloat32(),
            reader.readFloat32(),
            reader.readFloat32(),
            reader.readFloat32()
        );
    };

    static decodeQuantityDimension = (reader: BufferReader) => {
        const { QuantityDimension } = require("./types/quantityDimension");
        return new QuantityDimension(
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8()
        );
    };

    static decodeTrustListDataType = (reader: BufferReader) => {
        const { TrustListDataType } = require("./types/trustListDataType");
        return new TrustListDataType(
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })()
        );
    };

    static decodeBaseConfigurationDataType = (reader: BufferReader) => {
        const { BaseConfigurationDataType } = require("./types/baseConfigurationDataType");
        return new BaseConfigurationDataType(
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })()
        );
    };

    static decodeBaseConfigurationRecordDataType = (reader: BufferReader) => {
        const { BaseConfigurationRecordDataType } = require("./types/baseConfigurationRecordDataType");
        return new BaseConfigurationRecordDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })()
        );
    };

    static decodeCertificateGroupDataType = (reader: BufferReader) => {
        const { CertificateGroupDataType } = require("./types/certificateGroupDataType");
        return new CertificateGroupDataType(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readBoolean(); } return arr; })(),
            reader.readUInt32() as TrustListValidationOptionsEnum
        );
    };

    static decodeConfigurationUpdateTargetType = (reader: BufferReader) => {
        const { ConfigurationUpdateTargetType } = require("./types/configurationUpdateTargetType");
        return new ConfigurationUpdateTargetType(
            reader.readString(),
            reader.readUInt32() as ConfigurationUpdateTypeEnum
        );
    };

    static decodeTransactionErrorType = (reader: BufferReader) => {
        const { TransactionErrorType } = require("./types/transactionErrorType");
        return new TransactionErrorType(
            reader.readNodeId(),
            reader.readStatusCode(),
            reader.readLocalizedText()
        );
    };

    static decodeApplicationConfigurationDataType = (reader: BufferReader) => {
        const { ApplicationConfigurationDataType } = require("./types/applicationConfigurationDataType");
        return new ApplicationConfigurationDataType(
            BinaryDecoders.decodeApplicationIdentityDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeCertificateGroupDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeServerEndpointDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSecuritySettingsDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeUserTokenSettingsDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeAuthorizationServiceConfigurationDataType(reader); } return arr; })()
        );
    };

    static decodeApplicationIdentityDataType = (reader: BufferReader) => {
        const { ApplicationIdentityDataType } = require("./types/applicationIdentityDataType");
        return new ApplicationIdentityDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readLocalizedText(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeApplicationDescription(reader); } return arr; })()
        );
    };

    static decodeEndpointDataType = (reader: BufferReader) => {
        const { EndpointDataType } = require("./types/endpointDataType");
        return new EndpointDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readUInt16()
        );
    };

    static decodeServerEndpointDataType = (reader: BufferReader) => {
        const { ServerEndpointDataType } = require("./types/serverEndpointDataType");
        return new ServerEndpointDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeSecuritySettingsDataType = (reader: BufferReader) => {
        const { SecuritySettingsDataType } = require("./types/securitySettingsDataType");
        return new SecuritySettingsDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32() as MessageSecurityModeEnum; } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString()
        );
    };

    static decodeUserTokenSettingsDataType = (reader: BufferReader) => {
        const { UserTokenSettingsDataType } = require("./types/userTokenSettingsDataType");
        return new UserTokenSettingsDataType(
            reader.readUInt32() as UserTokenTypeEnum,
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString()
        );
    };

    static decodeServiceCertificateDataType = (reader: BufferReader) => {
        const { ServiceCertificateDataType } = require("./types/serviceCertificateDataType");
        return new ServiceCertificateDataType(
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            reader.readDateTime(),
            reader.readDateTime()
        );
    };

    static decodeAuthorizationServiceConfigurationDataType = (reader: BufferReader) => {
        const { AuthorizationServiceConfigurationDataType } = require("./types/authorizationServiceConfigurationDataType");
        return new AuthorizationServiceConfigurationDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeServiceCertificateDataType(reader); } return arr; })(),
            reader.readString()
        );
    };

    static decodeDecimalDataType = (reader: BufferReader) => {
        const { DecimalDataType } = require("./types/decimalDataType");
        return new DecimalDataType(
            reader.readInt16(),
            reader.readByteString()
        );
    };

    static decodeDataTypeSchemaHeader = (reader: BufferReader) => {
        const { DataTypeSchemaHeader } = require("./types/dataTypeSchemaHeader");
        return new DataTypeSchemaHeader(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeStructureDescription(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEnumDescription(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSimpleTypeDescription(reader); } return arr; })()
        );
    };

    static decodeDataTypeDescription = (reader: BufferReader) => {
        const { DataTypeDescription } = require("./types/dataTypeDescription");
        return new DataTypeDescription(
            reader.readNodeId(),
            reader.readQualifiedName()
        );
    };

    static decodeStructureDescription = (reader: BufferReader) => {
        const { StructureDescription } = require("./types/structureDescription");
        return new StructureDescription(
            BinaryDecoders.decodeStructureDefinition(reader)
        );
    };

    static decodeEnumDescription = (reader: BufferReader) => {
        const { EnumDescription } = require("./types/enumDescription");
        return new EnumDescription(
            BinaryDecoders.decodeEnumDefinition(reader),
            reader.readUInt8()
        );
    };

    static decodeSimpleTypeDescription = (reader: BufferReader) => {
        const { SimpleTypeDescription } = require("./types/simpleTypeDescription");
        return new SimpleTypeDescription(
            reader.readNodeId(),
            reader.readUInt8()
        );
    };

    static decodeUABinaryFileDataType = (reader: BufferReader) => {
        const { UABinaryFileDataType } = require("./types/uABinaryFileDataType");
        return new UABinaryFileDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })(),
            reader.readVariant()
        );
    };

    static decodePortableQualifiedName = (reader: BufferReader) => {
        const { PortableQualifiedName } = require("./types/portableQualifiedName");
        return new PortableQualifiedName(
            reader.readString(),
            reader.readString()
        );
    };

    static decodePortableNodeId = (reader: BufferReader) => {
        const { PortableNodeId } = require("./types/portableNodeId");
        return new PortableNodeId(
            reader.readString(),
            reader.readNodeId()
        );
    };

    static decodeUnsignedRationalNumber = (reader: BufferReader) => {
        const { UnsignedRationalNumber } = require("./types/unsignedRationalNumber");
        return new UnsignedRationalNumber(
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeDataSetMetaDataType = (reader: BufferReader) => {
        const { DataSetMetaDataType } = require("./types/dataSetMetaDataType");
        return new DataSetMetaDataType(
            reader.readString(),
            reader.readLocalizedText(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeFieldMetaData(reader); } return arr; })(),
            reader.readGuid(),
            BinaryDecoders.decodeConfigurationVersionDataType(reader)
        );
    };

    static decodeFieldMetaData = (reader: BufferReader) => {
        const { FieldMetaData } = require("./types/fieldMetaData");
        return new FieldMetaData(
            reader.readString(),
            reader.readLocalizedText(),
            reader.readUInt32() as DataSetFieldFlagsEnum,
            reader.readUInt8(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readUInt32(),
            reader.readGuid(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })()
        );
    };

    static decodeConfigurationVersionDataType = (reader: BufferReader) => {
        const { ConfigurationVersionDataType } = require("./types/configurationVersionDataType");
        return new ConfigurationVersionDataType(
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodePublishedDataSetDataType = (reader: BufferReader) => {
        const { PublishedDataSetDataType } = require("./types/publishedDataSetDataType");
        return new PublishedDataSetDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            BinaryDecoders.decodeDataSetMetaDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })(),
            BinaryDecoders.decodePublishedDataSetSourceDataType(reader)
        );
    };

    static decodePublishedDataSetSourceDataType = (reader: BufferReader) => {
        const { PublishedDataSetSourceDataType } = require("./types/publishedDataSetSourceDataType");
        return new PublishedDataSetSourceDataType();
    };

    static decodePublishedVariableDataType = (reader: BufferReader) => {
        const { PublishedVariableDataType } = require("./types/publishedVariableDataType");
        return new PublishedVariableDataType(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readString(),
            reader.readVariant(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readQualifiedName(); } return arr; })()
        );
    };

    static decodePublishedDataItemsDataType = (reader: BufferReader) => {
        const { PublishedDataItemsDataType } = require("./types/publishedDataItemsDataType");
        return new PublishedDataItemsDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodePublishedVariableDataType(reader); } return arr; })()
        );
    };

    static decodePublishedEventsDataType = (reader: BufferReader) => {
        const { PublishedEventsDataType } = require("./types/publishedEventsDataType");
        return new PublishedEventsDataType(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSimpleAttributeOperand(reader); } return arr; })(),
            BinaryDecoders.decodeContentFilter(reader)
        );
    };

    static decodePublishedDataSetCustomSourceDataType = (reader: BufferReader) => {
        const { PublishedDataSetCustomSourceDataType } = require("./types/publishedDataSetCustomSourceDataType");
        return new PublishedDataSetCustomSourceDataType(
            reader.readBoolean()
        );
    };

    static decodeActionTargetDataType = (reader: BufferReader) => {
        const { ActionTargetDataType } = require("./types/actionTargetDataType");
        return new ActionTargetDataType(
            reader.readUInt16(),
            reader.readString(),
            reader.readLocalizedText()
        );
    };

    static decodePublishedActionDataType = (reader: BufferReader) => {
        const { PublishedActionDataType } = require("./types/publishedActionDataType");
        return new PublishedActionDataType(
            BinaryDecoders.decodeDataSetMetaDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeActionTargetDataType(reader); } return arr; })()
        );
    };

    static decodeActionMethodDataType = (reader: BufferReader) => {
        const { ActionMethodDataType } = require("./types/actionMethodDataType");
        return new ActionMethodDataType(
            reader.readNodeId(),
            reader.readNodeId()
        );
    };

    static decodePublishedActionMethodDataType = (reader: BufferReader) => {
        const { PublishedActionMethodDataType } = require("./types/publishedActionMethodDataType");
        return new PublishedActionMethodDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeActionMethodDataType(reader); } return arr; })()
        );
    };

    static decodeDataSetWriterDataType = (reader: BufferReader) => {
        const { DataSetWriterDataType } = require("./types/dataSetWriterDataType");
        return new DataSetWriterDataType(
            reader.readString(),
            reader.readBoolean(),
            reader.readUInt16(),
            reader.readUInt32() as DataSetFieldContentMaskEnum,
            reader.readUInt32(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })(),
            BinaryDecoders.decodeDataSetWriterTransportDataType(reader),
            BinaryDecoders.decodeDataSetWriterMessageDataType(reader)
        );
    };

    static decodeDataSetWriterTransportDataType = (reader: BufferReader) => {
        const { DataSetWriterTransportDataType } = require("./types/dataSetWriterTransportDataType");
        return new DataSetWriterTransportDataType();
    };

    static decodeDataSetWriterMessageDataType = (reader: BufferReader) => {
        const { DataSetWriterMessageDataType } = require("./types/dataSetWriterMessageDataType");
        return new DataSetWriterMessageDataType();
    };

    static decodePubSubGroupDataType = (reader: BufferReader) => {
        const { PubSubGroupDataType } = require("./types/pubSubGroupDataType");
        return new PubSubGroupDataType(
            reader.readString(),
            reader.readBoolean(),
            reader.readUInt32() as MessageSecurityModeEnum,
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointDescription(reader); } return arr; })(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })()
        );
    };

    static decodeWriterGroupDataType = (reader: BufferReader) => {
        const { WriterGroupDataType } = require("./types/writerGroupDataType");
        return new WriterGroupDataType(
            reader.readUInt16(),
            reader.readFloat64(),
            reader.readFloat64(),
            reader.readUInt8(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            BinaryDecoders.decodeWriterGroupTransportDataType(reader),
            BinaryDecoders.decodeWriterGroupMessageDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeDataSetWriterDataType(reader); } return arr; })()
        );
    };

    static decodeWriterGroupTransportDataType = (reader: BufferReader) => {
        const { WriterGroupTransportDataType } = require("./types/writerGroupTransportDataType");
        return new WriterGroupTransportDataType();
    };

    static decodeWriterGroupMessageDataType = (reader: BufferReader) => {
        const { WriterGroupMessageDataType } = require("./types/writerGroupMessageDataType");
        return new WriterGroupMessageDataType();
    };

    static decodePubSubConnectionDataType = (reader: BufferReader) => {
        const { PubSubConnectionDataType } = require("./types/pubSubConnectionDataType");
        return new PubSubConnectionDataType(
            reader.readString(),
            reader.readBoolean(),
            reader.readVariant(),
            reader.readString(),
            BinaryDecoders.decodeNetworkAddressDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })(),
            BinaryDecoders.decodeConnectionTransportDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeWriterGroupDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeReaderGroupDataType(reader); } return arr; })()
        );
    };

    static decodeConnectionTransportDataType = (reader: BufferReader) => {
        const { ConnectionTransportDataType } = require("./types/connectionTransportDataType");
        return new ConnectionTransportDataType();
    };

    static decodeNetworkAddressDataType = (reader: BufferReader) => {
        const { NetworkAddressDataType } = require("./types/networkAddressDataType");
        return new NetworkAddressDataType(
            reader.readString()
        );
    };

    static decodeNetworkAddressUrlDataType = (reader: BufferReader) => {
        const { NetworkAddressUrlDataType } = require("./types/networkAddressUrlDataType");
        return new NetworkAddressUrlDataType(
            reader.readString()
        );
    };

    static decodeReaderGroupDataType = (reader: BufferReader) => {
        const { ReaderGroupDataType } = require("./types/readerGroupDataType");
        return new ReaderGroupDataType(
            BinaryDecoders.decodeReaderGroupTransportDataType(reader),
            BinaryDecoders.decodeReaderGroupMessageDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeDataSetReaderDataType(reader); } return arr; })()
        );
    };

    static decodeReaderGroupTransportDataType = (reader: BufferReader) => {
        const { ReaderGroupTransportDataType } = require("./types/readerGroupTransportDataType");
        return new ReaderGroupTransportDataType();
    };

    static decodeReaderGroupMessageDataType = (reader: BufferReader) => {
        const { ReaderGroupMessageDataType } = require("./types/readerGroupMessageDataType");
        return new ReaderGroupMessageDataType();
    };

    static decodeDataSetReaderDataType = (reader: BufferReader) => {
        const { DataSetReaderDataType } = require("./types/dataSetReaderDataType");
        return new DataSetReaderDataType(
            reader.readString(),
            reader.readBoolean(),
            reader.readVariant(),
            reader.readUInt16(),
            reader.readUInt16(),
            BinaryDecoders.decodeDataSetMetaDataType(reader),
            reader.readUInt32() as DataSetFieldContentMaskEnum,
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readString(),
            reader.readUInt32() as MessageSecurityModeEnum,
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointDescription(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })(),
            BinaryDecoders.decodeDataSetReaderTransportDataType(reader),
            BinaryDecoders.decodeDataSetReaderMessageDataType(reader),
            BinaryDecoders.decodeSubscribedDataSetDataType(reader)
        );
    };

    static decodeDataSetReaderTransportDataType = (reader: BufferReader) => {
        const { DataSetReaderTransportDataType } = require("./types/dataSetReaderTransportDataType");
        return new DataSetReaderTransportDataType();
    };

    static decodeDataSetReaderMessageDataType = (reader: BufferReader) => {
        const { DataSetReaderMessageDataType } = require("./types/dataSetReaderMessageDataType");
        return new DataSetReaderMessageDataType();
    };

    static decodeSubscribedDataSetDataType = (reader: BufferReader) => {
        const { SubscribedDataSetDataType } = require("./types/subscribedDataSetDataType");
        return new SubscribedDataSetDataType();
    };

    static decodeTargetVariablesDataType = (reader: BufferReader) => {
        const { TargetVariablesDataType } = require("./types/targetVariablesDataType");
        return new TargetVariablesDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeFieldTargetDataType(reader); } return arr; })()
        );
    };

    static decodeFieldTargetDataType = (reader: BufferReader) => {
        const { FieldTargetDataType } = require("./types/fieldTargetDataType");
        return new FieldTargetDataType(
            reader.readGuid(),
            reader.readString(),
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readString(),
            reader.readUInt32() as OverrideValueHandlingEnum,
            reader.readVariant()
        );
    };

    static decodeSubscribedDataSetMirrorDataType = (reader: BufferReader) => {
        const { SubscribedDataSetMirrorDataType } = require("./types/subscribedDataSetMirrorDataType");
        return new SubscribedDataSetMirrorDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeRolePermissionType(reader); } return arr; })()
        );
    };

    static decodePubSubConfigurationDataType = (reader: BufferReader) => {
        const { PubSubConfigurationDataType } = require("./types/pubSubConfigurationDataType");
        return new PubSubConfigurationDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodePublishedDataSetDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodePubSubConnectionDataType(reader); } return arr; })(),
            reader.readBoolean()
        );
    };

    static decodeStandaloneSubscribedDataSetRefDataType = (reader: BufferReader) => {
        const { StandaloneSubscribedDataSetRefDataType } = require("./types/standaloneSubscribedDataSetRefDataType");
        return new StandaloneSubscribedDataSetRefDataType(
            reader.readString()
        );
    };

    static decodeStandaloneSubscribedDataSetDataType = (reader: BufferReader) => {
        const { StandaloneSubscribedDataSetDataType } = require("./types/standaloneSubscribedDataSetDataType");
        return new StandaloneSubscribedDataSetDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            BinaryDecoders.decodeDataSetMetaDataType(reader),
            BinaryDecoders.decodeSubscribedDataSetDataType(reader)
        );
    };

    static decodeSecurityGroupDataType = (reader: BufferReader) => {
        const { SecurityGroupDataType } = require("./types/securityGroupDataType");
        return new SecurityGroupDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readFloat64(),
            reader.readString(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeRolePermissionType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })()
        );
    };

    static decodePubSubKeyPushTargetDataType = (reader: BufferReader) => {
        const { PubSubKeyPushTargetDataType } = require("./types/pubSubKeyPushTargetDataType");
        return new PubSubKeyPushTargetDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readString(),
            BinaryDecoders.decodeUserTokenPolicy(reader),
            reader.readUInt16(),
            reader.readFloat64(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodePubSubConfiguration2DataType = (reader: BufferReader) => {
        const { PubSubConfiguration2DataType } = require("./types/pubSubConfiguration2DataType");
        return new PubSubConfiguration2DataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeStandaloneSubscribedDataSetDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeDataSetMetaDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointDescription(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSecurityGroupDataType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodePubSubKeyPushTargetDataType(reader); } return arr; })(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeKeyValuePair(reader); } return arr; })()
        );
    };

    static decodeUadpWriterGroupMessageDataType = (reader: BufferReader) => {
        const { UadpWriterGroupMessageDataType } = require("./types/uadpWriterGroupMessageDataType");
        return new UadpWriterGroupMessageDataType(
            reader.readUInt32(),
            reader.readUInt32() as DataSetOrderingTypeEnum,
            reader.readUInt32() as UadpNetworkMessageContentMaskEnum,
            reader.readFloat64(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readFloat64(); } return arr; })()
        );
    };

    static decodeUadpDataSetWriterMessageDataType = (reader: BufferReader) => {
        const { UadpDataSetWriterMessageDataType } = require("./types/uadpDataSetWriterMessageDataType");
        return new UadpDataSetWriterMessageDataType(
            reader.readUInt32() as UadpDataSetMessageContentMaskEnum,
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readUInt16()
        );
    };

    static decodeUadpDataSetReaderMessageDataType = (reader: BufferReader) => {
        const { UadpDataSetReaderMessageDataType } = require("./types/uadpDataSetReaderMessageDataType");
        return new UadpDataSetReaderMessageDataType(
            reader.readUInt32(),
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readGuid(),
            reader.readUInt32() as UadpNetworkMessageContentMaskEnum,
            reader.readUInt32() as UadpDataSetMessageContentMaskEnum,
            reader.readFloat64(),
            reader.readFloat64(),
            reader.readFloat64()
        );
    };

    static decodeJsonWriterGroupMessageDataType = (reader: BufferReader) => {
        const { JsonWriterGroupMessageDataType } = require("./types/jsonWriterGroupMessageDataType");
        return new JsonWriterGroupMessageDataType(
            reader.readUInt32() as JsonNetworkMessageContentMaskEnum
        );
    };

    static decodeJsonDataSetWriterMessageDataType = (reader: BufferReader) => {
        const { JsonDataSetWriterMessageDataType } = require("./types/jsonDataSetWriterMessageDataType");
        return new JsonDataSetWriterMessageDataType(
            reader.readUInt32() as JsonDataSetMessageContentMaskEnum
        );
    };

    static decodeJsonDataSetReaderMessageDataType = (reader: BufferReader) => {
        const { JsonDataSetReaderMessageDataType } = require("./types/jsonDataSetReaderMessageDataType");
        return new JsonDataSetReaderMessageDataType(
            reader.readUInt32() as JsonNetworkMessageContentMaskEnum,
            reader.readUInt32() as JsonDataSetMessageContentMaskEnum
        );
    };

    static decodeQosDataType = (reader: BufferReader) => {
        const { QosDataType } = require("./types/qosDataType");
        return new QosDataType();
    };

    static decodeTransmitQosDataType = (reader: BufferReader) => {
        const { TransmitQosDataType } = require("./types/transmitQosDataType");
        return new TransmitQosDataType();
    };

    static decodeTransmitQosPriorityDataType = (reader: BufferReader) => {
        const { TransmitQosPriorityDataType } = require("./types/transmitQosPriorityDataType");
        return new TransmitQosPriorityDataType(
            reader.readString()
        );
    };

    static decodeReceiveQosDataType = (reader: BufferReader) => {
        const { ReceiveQosDataType } = require("./types/receiveQosDataType");
        return new ReceiveQosDataType();
    };

    static decodeReceiveQosPriorityDataType = (reader: BufferReader) => {
        const { ReceiveQosPriorityDataType } = require("./types/receiveQosPriorityDataType");
        return new ReceiveQosPriorityDataType(
            reader.readString()
        );
    };

    static decodeDatagramConnectionTransportDataType = (reader: BufferReader) => {
        const { DatagramConnectionTransportDataType } = require("./types/datagramConnectionTransportDataType");
        return new DatagramConnectionTransportDataType(
            BinaryDecoders.decodeNetworkAddressDataType(reader)
        );
    };

    static decodeDatagramConnectionTransport2DataType = (reader: BufferReader) => {
        const { DatagramConnectionTransport2DataType } = require("./types/datagramConnectionTransport2DataType");
        return new DatagramConnectionTransport2DataType(
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeQosDataType(reader); } return arr; })()
        );
    };

    static decodeDatagramWriterGroupTransportDataType = (reader: BufferReader) => {
        const { DatagramWriterGroupTransportDataType } = require("./types/datagramWriterGroupTransportDataType");
        return new DatagramWriterGroupTransportDataType(
            reader.readUInt8(),
            reader.readFloat64()
        );
    };

    static decodeDatagramWriterGroupTransport2DataType = (reader: BufferReader) => {
        const { DatagramWriterGroupTransport2DataType } = require("./types/datagramWriterGroupTransport2DataType");
        return new DatagramWriterGroupTransport2DataType(
            BinaryDecoders.decodeNetworkAddressDataType(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeTransmitQosDataType(reader); } return arr; })(),
            reader.readUInt32(),
            reader.readString()
        );
    };

    static decodeDatagramDataSetReaderTransportDataType = (reader: BufferReader) => {
        const { DatagramDataSetReaderTransportDataType } = require("./types/datagramDataSetReaderTransportDataType");
        return new DatagramDataSetReaderTransportDataType(
            BinaryDecoders.decodeNetworkAddressDataType(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeReceiveQosDataType(reader); } return arr; })(),
            reader.readString()
        );
    };

    static decodeDtlsPubSubConnectionDataType = (reader: BufferReader) => {
        const { DtlsPubSubConnectionDataType } = require("./types/dtlsPubSubConnectionDataType");
        return new DtlsPubSubConnectionDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readBoolean(),
            reader.readNodeId(),
            reader.readBoolean()
        );
    };

    static decodeBrokerConnectionTransportDataType = (reader: BufferReader) => {
        const { BrokerConnectionTransportDataType } = require("./types/brokerConnectionTransportDataType");
        return new BrokerConnectionTransportDataType(
            reader.readString(),
            reader.readString()
        );
    };

    static decodeBrokerWriterGroupTransportDataType = (reader: BufferReader) => {
        const { BrokerWriterGroupTransportDataType } = require("./types/brokerWriterGroupTransportDataType");
        return new BrokerWriterGroupTransportDataType(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt32() as BrokerTransportQualityOfServiceEnum
        );
    };

    static decodeBrokerDataSetWriterTransportDataType = (reader: BufferReader) => {
        const { BrokerDataSetWriterTransportDataType } = require("./types/brokerDataSetWriterTransportDataType");
        return new BrokerDataSetWriterTransportDataType(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt32() as BrokerTransportQualityOfServiceEnum,
            reader.readString(),
            reader.readFloat64()
        );
    };

    static decodeBrokerDataSetReaderTransportDataType = (reader: BufferReader) => {
        const { BrokerDataSetReaderTransportDataType } = require("./types/brokerDataSetReaderTransportDataType");
        return new BrokerDataSetReaderTransportDataType(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt32() as BrokerTransportQualityOfServiceEnum,
            reader.readString()
        );
    };

    static decodePubSubConfigurationRefDataType = (reader: BufferReader) => {
        const { PubSubConfigurationRefDataType } = require("./types/pubSubConfigurationRefDataType");
        return new PubSubConfigurationRefDataType(
            reader.readUInt32() as PubSubConfigurationRefMaskEnum,
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readUInt16()
        );
    };

    static decodePubSubConfigurationValueDataType = (reader: BufferReader) => {
        const { PubSubConfigurationValueDataType } = require("./types/pubSubConfigurationValueDataType");
        return new PubSubConfigurationValueDataType(
            BinaryDecoders.decodePubSubConfigurationRefDataType(reader),
            reader.readString(),
            reader.readVariant()
        );
    };

    static decodeJsonNetworkMessage = (reader: BufferReader) => {
        const { JsonNetworkMessage } = require("./types/jsonNetworkMessage");
        return new JsonNetworkMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readExtensionObject()
        );
    };

    static decodeJsonDataSetMessage = (reader: BufferReader) => {
        const { JsonDataSetMessage } = require("./types/jsonDataSetMessage");
        return new JsonDataSetMessage(
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt32(),
            BinaryDecoders.decodeConfigurationVersionDataType(reader),
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readStatusCode(),
            reader.readString(),
            reader.readExtensionObject()
        );
    };

    static decodeJsonDataSetMetaDataMessage = (reader: BufferReader) => {
        const { JsonDataSetMetaDataMessage } = require("./types/jsonDataSetMetaDataMessage");
        return new JsonDataSetMetaDataMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            BinaryDecoders.decodeDataSetMetaDataType(reader)
        );
    };

    static decodeJsonApplicationDescriptionMessage = (reader: BufferReader) => {
        const { JsonApplicationDescriptionMessage } = require("./types/jsonApplicationDescriptionMessage");
        return new JsonApplicationDescriptionMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            BinaryDecoders.decodeApplicationDescription(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeJsonServerEndpointsMessage = (reader: BufferReader) => {
        const { JsonServerEndpointsMessage } = require("./types/jsonServerEndpointsMessage");
        return new JsonServerEndpointsMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            BinaryDecoders.decodeApplicationDescription(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointDescription(reader); } return arr; })()
        );
    };

    static decodeJsonStatusMessage = (reader: BufferReader) => {
        const { JsonStatusMessage } = require("./types/jsonStatusMessage");
        return new JsonStatusMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            reader.readBoolean(),
            reader.readUInt32() as PubSubStateEnum,
            reader.readDateTime()
        );
    };

    static decodeJsonPubSubConnectionMessage = (reader: BufferReader) => {
        const { JsonPubSubConnectionMessage } = require("./types/jsonPubSubConnectionMessage");
        return new JsonPubSubConnectionMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            BinaryDecoders.decodePubSubConnectionDataType(reader)
        );
    };

    static decodeJsonActionMetaDataMessage = (reader: BufferReader) => {
        const { JsonActionMetaDataMessage } = require("./types/jsonActionMetaDataMessage");
        return new JsonActionMetaDataMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt16(),
            reader.readString(),
            reader.readDateTime(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeActionTargetDataType(reader); } return arr; })(),
            BinaryDecoders.decodeDataSetMetaDataType(reader),
            BinaryDecoders.decodeDataSetMetaDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeActionMethodDataType(reader); } return arr; })()
        );
    };

    static decodeJsonActionResponderMessage = (reader: BufferReader) => {
        const { JsonActionResponderMessage } = require("./types/jsonActionResponderMessage");
        return new JsonActionResponderMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            BinaryDecoders.decodePubSubConnectionDataType(reader)
        );
    };

    static decodeJsonActionNetworkMessage = (reader: BufferReader) => {
        const { JsonActionNetworkMessage } = require("./types/jsonActionNetworkMessage");
        return new JsonActionNetworkMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            reader.readString(),
            reader.readByteString(),
            reader.readString(),
            reader.readFloat64(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
    };

    static decodeJsonActionRequestMessage = (reader: BufferReader) => {
        const { JsonActionRequestMessage } = require("./types/jsonActionRequestMessage");
        return new JsonActionRequestMessage(
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            BinaryDecoders.decodeConfigurationVersionDataType(reader),
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readString(),
            reader.readUInt16(),
            reader.readUInt32() as ActionStateEnum,
            reader.readExtensionObject()
        );
    };

    static decodeJsonActionResponseMessage = (reader: BufferReader) => {
        const { JsonActionResponseMessage } = require("./types/jsonActionResponseMessage");
        return new JsonActionResponseMessage(
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            BinaryDecoders.decodeConfigurationVersionDataType(reader),
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readStatusCode(),
            reader.readString(),
            reader.readUInt16(),
            reader.readUInt32() as ActionStateEnum,
            reader.readExtensionObject()
        );
    };

    static decodeAliasNameDataType = (reader: BufferReader) => {
        const { AliasNameDataType } = require("./types/aliasNameDataType");
        return new AliasNameDataType(
            reader.readQualifiedName(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExpandedNodeId(); } return arr; })()
        );
    };

    static decodeUserManagementDataType = (reader: BufferReader) => {
        const { UserManagementDataType } = require("./types/userManagementDataType");
        return new UserManagementDataType(
            reader.readString(),
            reader.readUInt32() as UserConfigurationMaskEnum,
            reader.readString()
        );
    };

    static decodePriorityMappingEntryType = (reader: BufferReader) => {
        const { PriorityMappingEntryType } = require("./types/priorityMappingEntryType");
        return new PriorityMappingEntryType(
            reader.readString(),
            reader.readString(),
            reader.readUInt8(),
            reader.readUInt32()
        );
    };

    static decodeLldpManagementAddressTxPortType = (reader: BufferReader) => {
        const { LldpManagementAddressTxPortType } = require("./types/lldpManagementAddressTxPortType");
        return new LldpManagementAddressTxPortType(
            reader.readUInt32(),
            reader.readString(),
            reader.readBoolean(),
            reader.readUInt32(),
            reader.readUInt32() as ManAddrIfSubtypeEnum,
            reader.readUInt32()
        );
    };

    static decodeLldpManagementAddressType = (reader: BufferReader) => {
        const { LldpManagementAddressType } = require("./types/lldpManagementAddressType");
        return new LldpManagementAddressType(
            reader.readUInt32(),
            reader.readString(),
            reader.readUInt32() as ManAddrIfSubtypeEnum,
            reader.readUInt32()
        );
    };

    static decodeLldpTlvType = (reader: BufferReader) => {
        const { LldpTlvType } = require("./types/lldpTlvType");
        return new LldpTlvType(
            reader.readUInt32(),
            reader.readByteString()
        );
    };

    static decodeReferenceDescriptionDataType = (reader: BufferReader) => {
        const { ReferenceDescriptionDataType } = require("./types/referenceDescriptionDataType");
        return new ReferenceDescriptionDataType(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId()
        );
    };

    static decodeReferenceListEntryDataType = (reader: BufferReader) => {
        const { ReferenceListEntryDataType } = require("./types/referenceListEntryDataType");
        return new ReferenceListEntryDataType(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId()
        );
    };

    static decodeLogRecord = (reader: BufferReader) => {
        const { LogRecord } = require("./types/logRecord");
        return new LogRecord(
            reader.readDateTime(),
            reader.readUInt16(),
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readString(),
            reader.readLocalizedText(),
            BinaryDecoders.decodeTraceContextDataType(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeNameValuePair(reader); } return arr; })()
        );
    };

    static decodeLogRecordsDataType = (reader: BufferReader) => {
        const { LogRecordsDataType } = require("./types/logRecordsDataType");
        return new LogRecordsDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeLogRecord(reader); } return arr; })()
        );
    };

    static decodeSpanContextDataType = (reader: BufferReader) => {
        const { SpanContextDataType } = require("./types/spanContextDataType");
        return new SpanContextDataType(
            reader.readGuid(),
            reader.readUInt64()
        );
    };

    static decodeTraceContextDataType = (reader: BufferReader) => {
        const { TraceContextDataType } = require("./types/traceContextDataType");
        return new TraceContextDataType(
            reader.readUInt64(),
            reader.readString()
        );
    };

    static decodeNameValuePair = (reader: BufferReader) => {
        const { NameValuePair } = require("./types/nameValuePair");
        return new NameValuePair(
            reader.readString(),
            reader.readVariant()
        );
    };

    static decodeRolePermissionType = (reader: BufferReader) => {
        const { RolePermissionType } = require("./types/rolePermissionType");
        return new RolePermissionType(
            reader.readNodeId(),
            reader.readUInt32() as PermissionTypeEnum
        );
    };

    static decodeDataTypeDefinition = (reader: BufferReader) => {
        const { DataTypeDefinition } = require("./types/dataTypeDefinition");
        return new DataTypeDefinition();
    };

    static decodeStructureField = (reader: BufferReader) => {
        const { StructureField } = require("./types/structureField");
        return new StructureField(
            reader.readString(),
            reader.readLocalizedText(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readUInt32(),
            reader.readBoolean()
        );
    };

    static decodeStructureDefinition = (reader: BufferReader) => {
        const { StructureDefinition } = require("./types/structureDefinition");
        return new StructureDefinition(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readUInt32() as StructureTypeEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeStructureField(reader); } return arr; })()
        );
    };

    static decodeEnumDefinition = (reader: BufferReader) => {
        const { EnumDefinition } = require("./types/enumDefinition");
        return new EnumDefinition(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEnumField(reader); } return arr; })()
        );
    };

    static decodeNode = (reader: BufferReader) => {
        const { Node } = require("./types/node");
        return new Node(
            reader.readNodeId(),
            reader.readUInt32() as NodeClassEnum,
            reader.readQualifiedName(),
            reader.readLocalizedText(),
            reader.readLocalizedText(),
            reader.readUInt32(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeRolePermissionType(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeRolePermissionType(reader); } return arr; })(),
            reader.readUInt16(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeReferenceNode(reader); } return arr; })()
        );
    };

    static decodeObjectNode = (reader: BufferReader) => {
        const { ObjectNode } = require("./types/objectNode");
        return new ObjectNode(
            reader.readUInt8()
        );
    };

    static decodeObjectTypeNode = (reader: BufferReader) => {
        const { ObjectTypeNode } = require("./types/objectTypeNode");
        return new ObjectTypeNode(
            reader.readBoolean()
        );
    };

    static decodeVariableNode = (reader: BufferReader) => {
        const { VariableNode } = require("./types/variableNode");
        return new VariableNode(
            reader.readVariant(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readUInt8(),
            reader.readUInt8(),
            reader.readFloat64(),
            reader.readBoolean(),
            reader.readUInt32()
        );
    };

    static decodeVariableTypeNode = (reader: BufferReader) => {
        const { VariableTypeNode } = require("./types/variableTypeNode");
        return new VariableTypeNode(
            reader.readVariant(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readBoolean()
        );
    };

    static decodeReferenceTypeNode = (reader: BufferReader) => {
        const { ReferenceTypeNode } = require("./types/referenceTypeNode");
        return new ReferenceTypeNode(
            reader.readBoolean(),
            reader.readBoolean(),
            reader.readLocalizedText()
        );
    };

    static decodeMethodNode = (reader: BufferReader) => {
        const { MethodNode } = require("./types/methodNode");
        return new MethodNode(
            reader.readBoolean(),
            reader.readBoolean()
        );
    };

    static decodeViewNode = (reader: BufferReader) => {
        const { ViewNode } = require("./types/viewNode");
        return new ViewNode(
            reader.readBoolean(),
            reader.readUInt8()
        );
    };

    static decodeDataTypeNode = (reader: BufferReader) => {
        const { DataTypeNode } = require("./types/dataTypeNode");
        return new DataTypeNode(
            reader.readBoolean(),
            reader.readExtensionObject()
        );
    };

    static decodeReferenceNode = (reader: BufferReader) => {
        const { ReferenceNode } = require("./types/referenceNode");
        return new ReferenceNode(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId()
        );
    };

    static decodeArgument = (reader: BufferReader) => {
        const { Argument } = require("./types/argument");
        return new Argument(
            reader.readString(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readLocalizedText()
        );
    };

    static decodeEnumValueType = (reader: BufferReader) => {
        const { EnumValueType } = require("./types/enumValueType");
        return new EnumValueType(
            reader.readInt64(),
            reader.readLocalizedText(),
            reader.readLocalizedText()
        );
    };

    static decodeEnumField = (reader: BufferReader) => {
        const { EnumField } = require("./types/enumField");
        return new EnumField(
            reader.readString()
        );
    };

    static decodeOptionSet = (reader: BufferReader) => {
        const { OptionSet } = require("./types/optionSet");
        return new OptionSet(
            reader.readByteString(),
            reader.readByteString()
        );
    };

    static decodeTimeZoneDataType = (reader: BufferReader) => {
        const { TimeZoneDataType } = require("./types/timeZoneDataType");
        return new TimeZoneDataType(
            reader.readInt16(),
            reader.readBoolean()
        );
    };

    static decodeApplicationDescription = (reader: BufferReader) => {
        const { ApplicationDescription } = require("./types/applicationDescription");
        return new ApplicationDescription(
            reader.readString(),
            reader.readString(),
            reader.readLocalizedText(),
            reader.readUInt32() as ApplicationTypeEnum,
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeRequestHeader = (reader: BufferReader) => {
        const { RequestHeader } = require("./types/requestHeader");
        return new RequestHeader(
            reader.readNodeId(),
            reader.readDateTime(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readString(),
            reader.readUInt32(),
            reader.readExtensionObject()
        );
    };

    static decodeResponseHeader = (reader: BufferReader) => {
        const { ResponseHeader } = require("./types/responseHeader");
        return new ResponseHeader(
            reader.readDateTime(),
            reader.readUInt32(),
            reader.readStatusCode(),
            reader.readDiagnosticInfo(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readExtensionObject()
        );
    };

    static decodeServiceFault = (reader: BufferReader) => {
        const { ServiceFault } = require("./types/serviceFault");
        return new ServiceFault(
            BinaryDecoders.decodeResponseHeader(reader)
        );
    };

    static decodeSessionlessInvokeRequestType = (reader: BufferReader) => {
        const { SessionlessInvokeRequestType } = require("./types/sessionlessInvokeRequestType");
        return new SessionlessInvokeRequestType(
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readUInt32()
        );
    };

    static decodeSessionlessInvokeResponseType = (reader: BufferReader) => {
        const { SessionlessInvokeResponseType } = require("./types/sessionlessInvokeResponseType");
        return new SessionlessInvokeResponseType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readUInt32()
        );
    };

    static decodeFindServersRequest = (reader: BufferReader) => {
        const { FindServersRequest } = require("./types/findServersRequest");
        return new FindServersRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeFindServersResponse = (reader: BufferReader) => {
        const { FindServersResponse } = require("./types/findServersResponse");
        return new FindServersResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeApplicationDescription(reader); } return arr; })()
        );
    };

    static decodeServerOnNetwork = (reader: BufferReader) => {
        const { ServerOnNetwork } = require("./types/serverOnNetwork");
        return new ServerOnNetwork(
            reader.readUInt32(),
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeFindServersOnNetworkRequest = (reader: BufferReader) => {
        const { FindServersOnNetworkRequest } = require("./types/findServersOnNetworkRequest");
        return new FindServersOnNetworkRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeFindServersOnNetworkResponse = (reader: BufferReader) => {
        const { FindServersOnNetworkResponse } = require("./types/findServersOnNetworkResponse");
        return new FindServersOnNetworkResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readDateTime(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeServerOnNetwork(reader); } return arr; })()
        );
    };

    static decodeUserTokenPolicy = (reader: BufferReader) => {
        const { UserTokenPolicy } = require("./types/userTokenPolicy");
        return new UserTokenPolicy(
            reader.readString(),
            reader.readUInt32() as UserTokenTypeEnum,
            reader.readString(),
            reader.readString(),
            reader.readString()
        );
    };

    static decodeEndpointDescription = (reader: BufferReader) => {
        const { EndpointDescription } = require("./types/endpointDescription");
        return new EndpointDescription(
            reader.readString(),
            BinaryDecoders.decodeApplicationDescription(reader),
            reader.readByteString(),
            reader.readUInt32() as MessageSecurityModeEnum,
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeUserTokenPolicy(reader); } return arr; })(),
            reader.readString(),
            reader.readUInt8()
        );
    };

    static decodeGetEndpointsRequest = (reader: BufferReader) => {
        const { GetEndpointsRequest } = require("./types/getEndpointsRequest");
        return new GetEndpointsRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeGetEndpointsResponse = (reader: BufferReader) => {
        const { GetEndpointsResponse } = require("./types/getEndpointsResponse");
        return new GetEndpointsResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointDescription(reader); } return arr; })()
        );
    };

    static decodeRegisteredServer = (reader: BufferReader) => {
        const { RegisteredServer } = require("./types/registeredServer");
        return new RegisteredServer(
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readLocalizedText(); } return arr; })(),
            reader.readUInt32() as ApplicationTypeEnum,
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readBoolean()
        );
    };

    static decodeRegisterServerRequest = (reader: BufferReader) => {
        const { RegisterServerRequest } = require("./types/registerServerRequest");
        return new RegisterServerRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            BinaryDecoders.decodeRegisteredServer(reader)
        );
    };

    static decodeRegisterServerResponse = (reader: BufferReader) => {
        const { RegisterServerResponse } = require("./types/registerServerResponse");
        return new RegisterServerResponse(
            BinaryDecoders.decodeResponseHeader(reader)
        );
    };

    static decodeMdnsDiscoveryConfiguration = (reader: BufferReader) => {
        const { MdnsDiscoveryConfiguration } = require("./types/mdnsDiscoveryConfiguration");
        return new MdnsDiscoveryConfiguration(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeRegisterServer2Request = (reader: BufferReader) => {
        const { RegisterServer2Request } = require("./types/registerServer2Request");
        return new RegisterServer2Request(
            BinaryDecoders.decodeRequestHeader(reader),
            BinaryDecoders.decodeRegisteredServer(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
    };

    static decodeRegisterServer2Response = (reader: BufferReader) => {
        const { RegisterServer2Response } = require("./types/registerServer2Response");
        return new RegisterServer2Response(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeChannelSecurityToken = (reader: BufferReader) => {
        const { ChannelSecurityToken } = require("./types/channelSecurityToken");
        return new ChannelSecurityToken(
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readUInt32()
        );
    };

    static decodeOpenSecureChannelRequest = (reader: BufferReader) => {
        const { OpenSecureChannelRequest } = require("./types/openSecureChannelRequest");
        return new OpenSecureChannelRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32() as SecurityTokenRequestTypeEnum,
            reader.readUInt32() as MessageSecurityModeEnum,
            reader.readByteString(),
            reader.readUInt32()
        );
    };

    static decodeOpenSecureChannelResponse = (reader: BufferReader) => {
        const { OpenSecureChannelResponse } = require("./types/openSecureChannelResponse");
        return new OpenSecureChannelResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readUInt32(),
            BinaryDecoders.decodeChannelSecurityToken(reader),
            reader.readByteString()
        );
    };

    static decodeCloseSecureChannelRequest = (reader: BufferReader) => {
        const { CloseSecureChannelRequest } = require("./types/closeSecureChannelRequest");
        return new CloseSecureChannelRequest(
            BinaryDecoders.decodeRequestHeader(reader)
        );
    };

    static decodeCloseSecureChannelResponse = (reader: BufferReader) => {
        const { CloseSecureChannelResponse } = require("./types/closeSecureChannelResponse");
        return new CloseSecureChannelResponse(
            BinaryDecoders.decodeResponseHeader(reader)
        );
    };

    static decodeSignedSoftwareCertificate = (reader: BufferReader) => {
        const { SignedSoftwareCertificate } = require("./types/signedSoftwareCertificate");
        return new SignedSoftwareCertificate(
            reader.readByteString(),
            reader.readByteString()
        );
    };

    static decodeSignatureData = (reader: BufferReader) => {
        const { SignatureData } = require("./types/signatureData");
        return new SignatureData(
            reader.readString(),
            reader.readByteString()
        );
    };

    static decodeCreateSessionRequest = (reader: BufferReader) => {
        const { CreateSessionRequest } = require("./types/createSessionRequest");
        return new CreateSessionRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            BinaryDecoders.decodeApplicationDescription(reader),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readByteString(),
            reader.readByteString(),
            reader.readFloat64(),
            reader.readUInt32()
        );
    };

    static decodeCreateSessionResponse = (reader: BufferReader) => {
        const { CreateSessionResponse } = require("./types/createSessionResponse");
        return new CreateSessionResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readFloat64(),
            reader.readByteString(),
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointDescription(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSignedSoftwareCertificate(reader); } return arr; })(),
            BinaryDecoders.decodeSignatureData(reader),
            reader.readUInt32()
        );
    };

    static decodeUserIdentityToken = (reader: BufferReader) => {
        const { UserIdentityToken } = require("./types/userIdentityToken");
        return new UserIdentityToken(
            reader.readString()
        );
    };

    static decodeUserNameIdentityToken = (reader: BufferReader) => {
        const { UserNameIdentityToken } = require("./types/userNameIdentityToken");
        return new UserNameIdentityToken(
            reader.readString(),
            reader.readByteString(),
            reader.readString()
        );
    };

    static decodeX509IdentityToken = (reader: BufferReader) => {
        const { X509IdentityToken } = require("./types/x509IdentityToken");
        return new X509IdentityToken(
            reader.readByteString()
        );
    };

    static decodeIssuedIdentityToken = (reader: BufferReader) => {
        const { IssuedIdentityToken } = require("./types/issuedIdentityToken");
        return new IssuedIdentityToken(
            reader.readByteString(),
            reader.readString()
        );
    };

    static decodeActivateSessionRequest = (reader: BufferReader) => {
        const { ActivateSessionRequest } = require("./types/activateSessionRequest");
        return new ActivateSessionRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            BinaryDecoders.decodeSignatureData(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSignedSoftwareCertificate(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readExtensionObject(),
            BinaryDecoders.decodeSignatureData(reader)
        );
    };

    static decodeActivateSessionResponse = (reader: BufferReader) => {
        const { ActivateSessionResponse } = require("./types/activateSessionResponse");
        return new ActivateSessionResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeCloseSessionRequest = (reader: BufferReader) => {
        const { CloseSessionRequest } = require("./types/closeSessionRequest");
        return new CloseSessionRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readBoolean()
        );
    };

    static decodeCloseSessionResponse = (reader: BufferReader) => {
        const { CloseSessionResponse } = require("./types/closeSessionResponse");
        return new CloseSessionResponse(
            BinaryDecoders.decodeResponseHeader(reader)
        );
    };

    static decodeCancelRequest = (reader: BufferReader) => {
        const { CancelRequest } = require("./types/cancelRequest");
        return new CancelRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32()
        );
    };

    static decodeCancelResponse = (reader: BufferReader) => {
        const { CancelResponse } = require("./types/cancelResponse");
        return new CancelResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readUInt32()
        );
    };

    static decodeNodeAttributes = (reader: BufferReader) => {
        const { NodeAttributes } = require("./types/nodeAttributes");
        return new NodeAttributes(
            reader.readUInt32(),
            reader.readLocalizedText(),
            reader.readLocalizedText(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeObjectAttributes = (reader: BufferReader) => {
        const { ObjectAttributes } = require("./types/objectAttributes");
        return new ObjectAttributes(
            reader.readUInt8()
        );
    };

    static decodeVariableAttributes = (reader: BufferReader) => {
        const { VariableAttributes } = require("./types/variableAttributes");
        return new VariableAttributes(
            reader.readVariant(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readUInt8(),
            reader.readUInt8(),
            reader.readFloat64(),
            reader.readBoolean()
        );
    };

    static decodeMethodAttributes = (reader: BufferReader) => {
        const { MethodAttributes } = require("./types/methodAttributes");
        return new MethodAttributes(
            reader.readBoolean(),
            reader.readBoolean()
        );
    };

    static decodeObjectTypeAttributes = (reader: BufferReader) => {
        const { ObjectTypeAttributes } = require("./types/objectTypeAttributes");
        return new ObjectTypeAttributes(
            reader.readBoolean()
        );
    };

    static decodeVariableTypeAttributes = (reader: BufferReader) => {
        const { VariableTypeAttributes } = require("./types/variableTypeAttributes");
        return new VariableTypeAttributes(
            reader.readVariant(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readBoolean()
        );
    };

    static decodeReferenceTypeAttributes = (reader: BufferReader) => {
        const { ReferenceTypeAttributes } = require("./types/referenceTypeAttributes");
        return new ReferenceTypeAttributes(
            reader.readBoolean(),
            reader.readBoolean(),
            reader.readLocalizedText()
        );
    };

    static decodeDataTypeAttributes = (reader: BufferReader) => {
        const { DataTypeAttributes } = require("./types/dataTypeAttributes");
        return new DataTypeAttributes(
            reader.readBoolean()
        );
    };

    static decodeViewAttributes = (reader: BufferReader) => {
        const { ViewAttributes } = require("./types/viewAttributes");
        return new ViewAttributes(
            reader.readBoolean(),
            reader.readUInt8()
        );
    };

    static decodeGenericAttributeValue = (reader: BufferReader) => {
        const { GenericAttributeValue } = require("./types/genericAttributeValue");
        return new GenericAttributeValue(
            reader.readUInt32(),
            reader.readVariant()
        );
    };

    static decodeGenericAttributes = (reader: BufferReader) => {
        const { GenericAttributes } = require("./types/genericAttributes");
        return new GenericAttributes(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeGenericAttributeValue(reader); } return arr; })()
        );
    };

    static decodeAddNodesItem = (reader: BufferReader) => {
        const { AddNodesItem } = require("./types/addNodesItem");
        return new AddNodesItem(
            reader.readExpandedNodeId(),
            reader.readNodeId(),
            reader.readExpandedNodeId(),
            reader.readQualifiedName(),
            reader.readUInt32() as NodeClassEnum,
            reader.readExtensionObject(),
            reader.readExpandedNodeId()
        );
    };

    static decodeAddNodesResult = (reader: BufferReader) => {
        const { AddNodesResult } = require("./types/addNodesResult");
        return new AddNodesResult(
            reader.readStatusCode(),
            reader.readNodeId()
        );
    };

    static decodeAddNodesRequest = (reader: BufferReader) => {
        const { AddNodesRequest } = require("./types/addNodesRequest");
        return new AddNodesRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeAddNodesItem(reader); } return arr; })()
        );
    };

    static decodeAddNodesResponse = (reader: BufferReader) => {
        const { AddNodesResponse } = require("./types/addNodesResponse");
        return new AddNodesResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeAddNodesResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeAddReferencesItem = (reader: BufferReader) => {
        const { AddReferencesItem } = require("./types/addReferencesItem");
        return new AddReferencesItem(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readString(),
            reader.readExpandedNodeId(),
            reader.readUInt32() as NodeClassEnum
        );
    };

    static decodeAddReferencesRequest = (reader: BufferReader) => {
        const { AddReferencesRequest } = require("./types/addReferencesRequest");
        return new AddReferencesRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeAddReferencesItem(reader); } return arr; })()
        );
    };

    static decodeAddReferencesResponse = (reader: BufferReader) => {
        const { AddReferencesResponse } = require("./types/addReferencesResponse");
        return new AddReferencesResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeDeleteNodesItem = (reader: BufferReader) => {
        const { DeleteNodesItem } = require("./types/deleteNodesItem");
        return new DeleteNodesItem(
            reader.readNodeId(),
            reader.readBoolean()
        );
    };

    static decodeDeleteNodesRequest = (reader: BufferReader) => {
        const { DeleteNodesRequest } = require("./types/deleteNodesRequest");
        return new DeleteNodesRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeDeleteNodesItem(reader); } return arr; })()
        );
    };

    static decodeDeleteNodesResponse = (reader: BufferReader) => {
        const { DeleteNodesResponse } = require("./types/deleteNodesResponse");
        return new DeleteNodesResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeDeleteReferencesItem = (reader: BufferReader) => {
        const { DeleteReferencesItem } = require("./types/deleteReferencesItem");
        return new DeleteReferencesItem(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId(),
            reader.readBoolean()
        );
    };

    static decodeDeleteReferencesRequest = (reader: BufferReader) => {
        const { DeleteReferencesRequest } = require("./types/deleteReferencesRequest");
        return new DeleteReferencesRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeDeleteReferencesItem(reader); } return arr; })()
        );
    };

    static decodeDeleteReferencesResponse = (reader: BufferReader) => {
        const { DeleteReferencesResponse } = require("./types/deleteReferencesResponse");
        return new DeleteReferencesResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeViewDescription = (reader: BufferReader) => {
        const { ViewDescription } = require("./types/viewDescription");
        return new ViewDescription(
            reader.readNodeId(),
            reader.readDateTime(),
            reader.readUInt32()
        );
    };

    static decodeBrowseDescription = (reader: BufferReader) => {
        const { BrowseDescription } = require("./types/browseDescription");
        return new BrowseDescription(
            reader.readNodeId(),
            reader.readUInt32() as BrowseDirectionEnum,
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeReferenceDescription = (reader: BufferReader) => {
        const { ReferenceDescription } = require("./types/referenceDescription");
        return new ReferenceDescription(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId(),
            reader.readQualifiedName(),
            reader.readLocalizedText(),
            reader.readUInt32() as NodeClassEnum,
            reader.readExpandedNodeId()
        );
    };

    static decodeBrowseResult = (reader: BufferReader) => {
        const { BrowseResult } = require("./types/browseResult");
        return new BrowseResult(
            reader.readStatusCode(),
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeReferenceDescription(reader); } return arr; })()
        );
    };

    static decodeBrowseRequest = (reader: BufferReader) => {
        const { BrowseRequest } = require("./types/browseRequest");
        return new BrowseRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            BinaryDecoders.decodeViewDescription(reader),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeBrowseDescription(reader); } return arr; })()
        );
    };

    static decodeBrowseResponse = (reader: BufferReader) => {
        const { BrowseResponse } = require("./types/browseResponse");
        return new BrowseResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeBrowseResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeBrowseNextRequest = (reader: BufferReader) => {
        const { BrowseNextRequest } = require("./types/browseNextRequest");
        return new BrowseNextRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })()
        );
    };

    static decodeBrowseNextResponse = (reader: BufferReader) => {
        const { BrowseNextResponse } = require("./types/browseNextResponse");
        return new BrowseNextResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeBrowseResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeRelativePathElement = (reader: BufferReader) => {
        const { RelativePathElement } = require("./types/relativePathElement");
        return new RelativePathElement(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readBoolean(),
            reader.readQualifiedName()
        );
    };

    static decodeRelativePath = (reader: BufferReader) => {
        const { RelativePath } = require("./types/relativePath");
        return new RelativePath(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeRelativePathElement(reader); } return arr; })()
        );
    };

    static decodeBrowsePath = (reader: BufferReader) => {
        const { BrowsePath } = require("./types/browsePath");
        return new BrowsePath(
            reader.readNodeId(),
            BinaryDecoders.decodeRelativePath(reader)
        );
    };

    static decodeBrowsePathTarget = (reader: BufferReader) => {
        const { BrowsePathTarget } = require("./types/browsePathTarget");
        return new BrowsePathTarget(
            reader.readExpandedNodeId(),
            reader.readUInt32()
        );
    };

    static decodeBrowsePathResult = (reader: BufferReader) => {
        const { BrowsePathResult } = require("./types/browsePathResult");
        return new BrowsePathResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeBrowsePathTarget(reader); } return arr; })()
        );
    };

    static decodeTranslateBrowsePathsToNodeIdsRequest = (reader: BufferReader) => {
        const { TranslateBrowsePathsToNodeIdsRequest } = require("./types/translateBrowsePathsToNodeIdsRequest");
        return new TranslateBrowsePathsToNodeIdsRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeBrowsePath(reader); } return arr; })()
        );
    };

    static decodeTranslateBrowsePathsToNodeIdsResponse = (reader: BufferReader) => {
        const { TranslateBrowsePathsToNodeIdsResponse } = require("./types/translateBrowsePathsToNodeIdsResponse");
        return new TranslateBrowsePathsToNodeIdsResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeBrowsePathResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeRegisterNodesRequest = (reader: BufferReader) => {
        const { RegisterNodesRequest } = require("./types/registerNodesRequest");
        return new RegisterNodesRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })()
        );
    };

    static decodeRegisterNodesResponse = (reader: BufferReader) => {
        const { RegisterNodesResponse } = require("./types/registerNodesResponse");
        return new RegisterNodesResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })()
        );
    };

    static decodeUnregisterNodesRequest = (reader: BufferReader) => {
        const { UnregisterNodesRequest } = require("./types/unregisterNodesRequest");
        return new UnregisterNodesRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })()
        );
    };

    static decodeUnregisterNodesResponse = (reader: BufferReader) => {
        const { UnregisterNodesResponse } = require("./types/unregisterNodesResponse");
        return new UnregisterNodesResponse(
            BinaryDecoders.decodeResponseHeader(reader)
        );
    };

    static decodeEndpointConfiguration = (reader: BufferReader) => {
        const { EndpointConfiguration } = require("./types/endpointConfiguration");
        return new EndpointConfiguration(
            reader.readInt32(),
            reader.readBoolean(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32(),
            reader.readInt32()
        );
    };

    static decodeQueryDataDescription = (reader: BufferReader) => {
        const { QueryDataDescription } = require("./types/queryDataDescription");
        return new QueryDataDescription(
            BinaryDecoders.decodeRelativePath(reader),
            reader.readUInt32(),
            reader.readString()
        );
    };

    static decodeNodeTypeDescription = (reader: BufferReader) => {
        const { NodeTypeDescription } = require("./types/nodeTypeDescription");
        return new NodeTypeDescription(
            reader.readExpandedNodeId(),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeQueryDataDescription(reader); } return arr; })()
        );
    };

    static decodeQueryDataSet = (reader: BufferReader) => {
        const { QueryDataSet } = require("./types/queryDataSet");
        return new QueryDataSet(
            reader.readExpandedNodeId(),
            reader.readExpandedNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
    };

    static decodeNodeReference = (reader: BufferReader) => {
        const { NodeReference } = require("./types/nodeReference");
        return new NodeReference(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })()
        );
    };

    static decodeContentFilterElement = (reader: BufferReader) => {
        const { ContentFilterElement } = require("./types/contentFilterElement");
        return new ContentFilterElement(
            reader.readUInt32() as FilterOperatorEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
    };

    static decodeContentFilter = (reader: BufferReader) => {
        const { ContentFilter } = require("./types/contentFilter");
        return new ContentFilter(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeContentFilterElement(reader); } return arr; })()
        );
    };

    static decodeFilterOperand = (reader: BufferReader) => {
        const { FilterOperand } = require("./types/filterOperand");
        return new FilterOperand();
    };

    static decodeElementOperand = (reader: BufferReader) => {
        const { ElementOperand } = require("./types/elementOperand");
        return new ElementOperand(
            reader.readUInt32()
        );
    };

    static decodeLiteralOperand = (reader: BufferReader) => {
        const { LiteralOperand } = require("./types/literalOperand");
        return new LiteralOperand(
            reader.readVariant()
        );
    };

    static decodeAttributeOperand = (reader: BufferReader) => {
        const { AttributeOperand } = require("./types/attributeOperand");
        return new AttributeOperand(
            reader.readNodeId(),
            reader.readString(),
            BinaryDecoders.decodeRelativePath(reader),
            reader.readUInt32(),
            reader.readString()
        );
    };

    static decodeSimpleAttributeOperand = (reader: BufferReader) => {
        const { SimpleAttributeOperand } = require("./types/simpleAttributeOperand");
        return new SimpleAttributeOperand(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readQualifiedName(); } return arr; })(),
            reader.readUInt32(),
            reader.readString()
        );
    };

    static decodeContentFilterElementResult = (reader: BufferReader) => {
        const { ContentFilterElementResult } = require("./types/contentFilterElementResult");
        return new ContentFilterElementResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeContentFilterResult = (reader: BufferReader) => {
        const { ContentFilterResult } = require("./types/contentFilterResult");
        return new ContentFilterResult(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeContentFilterElementResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeParsingResult = (reader: BufferReader) => {
        const { ParsingResult } = require("./types/parsingResult");
        return new ParsingResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeQueryFirstRequest = (reader: BufferReader) => {
        const { QueryFirstRequest } = require("./types/queryFirstRequest");
        return new QueryFirstRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            BinaryDecoders.decodeViewDescription(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeNodeTypeDescription(reader); } return arr; })(),
            BinaryDecoders.decodeContentFilter(reader),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeQueryFirstResponse = (reader: BufferReader) => {
        const { QueryFirstResponse } = require("./types/queryFirstResponse");
        return new QueryFirstResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeQueryDataSet(reader); } return arr; })(),
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeParsingResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })(),
            BinaryDecoders.decodeContentFilterResult(reader)
        );
    };

    static decodeQueryNextRequest = (reader: BufferReader) => {
        const { QueryNextRequest } = require("./types/queryNextRequest");
        return new QueryNextRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readBoolean(),
            reader.readByteString()
        );
    };

    static decodeQueryNextResponse = (reader: BufferReader) => {
        const { QueryNextResponse } = require("./types/queryNextResponse");
        return new QueryNextResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeQueryDataSet(reader); } return arr; })(),
            reader.readByteString()
        );
    };

    static decodeReadValueId = (reader: BufferReader) => {
        const { ReadValueId } = require("./types/readValueId");
        return new ReadValueId(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readString(),
            reader.readQualifiedName()
        );
    };

    static decodeReadRequest = (reader: BufferReader) => {
        const { ReadRequest } = require("./types/readRequest");
        return new ReadRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readFloat64(),
            reader.readUInt32() as TimestampsToReturnEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeReadValueId(reader); } return arr; })()
        );
    };

    static decodeReadResponse = (reader: BufferReader) => {
        const { ReadResponse } = require("./types/readResponse");
        return new ReadResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDataValue(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeHistoryReadValueId = (reader: BufferReader) => {
        const { HistoryReadValueId } = require("./types/historyReadValueId");
        return new HistoryReadValueId(
            reader.readNodeId(),
            reader.readString(),
            reader.readQualifiedName(),
            reader.readByteString()
        );
    };

    static decodeHistoryReadResult = (reader: BufferReader) => {
        const { HistoryReadResult } = require("./types/historyReadResult");
        return new HistoryReadResult(
            reader.readStatusCode(),
            reader.readByteString(),
            reader.readExtensionObject()
        );
    };

    static decodeHistoryReadDetails = (reader: BufferReader) => {
        const { HistoryReadDetails } = require("./types/historyReadDetails");
        return new HistoryReadDetails();
    };

    static decodeReadEventDetails = (reader: BufferReader) => {
        const { ReadEventDetails } = require("./types/readEventDetails");
        return new ReadEventDetails(
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readDateTime(),
            BinaryDecoders.decodeEventFilter(reader)
        );
    };

    static decodeReadEventDetails2 = (reader: BufferReader) => {
        const { ReadEventDetails2 } = require("./types/readEventDetails2");
        return new ReadEventDetails2(
            reader.readBoolean()
        );
    };

    static decodeSortRuleElement = (reader: BufferReader) => {
        const { SortRuleElement } = require("./types/sortRuleElement");
        return new SortRuleElement(
            reader.readUInt32() as SortOrderTypeEnum,
            BinaryDecoders.decodeSimpleAttributeOperand(reader)
        );
    };

    static decodeReadEventDetailsSorted = (reader: BufferReader) => {
        const { ReadEventDetailsSorted } = require("./types/readEventDetailsSorted");
        return new ReadEventDetailsSorted(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSortRuleElement(reader); } return arr; })()
        );
    };

    static decodeReadRawModifiedDetails = (reader: BufferReader) => {
        const { ReadRawModifiedDetails } = require("./types/readRawModifiedDetails");
        return new ReadRawModifiedDetails(
            reader.readBoolean(),
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readUInt32(),
            reader.readBoolean()
        );
    };

    static decodeReadProcessedDetails = (reader: BufferReader) => {
        const { ReadProcessedDetails } = require("./types/readProcessedDetails");
        return new ReadProcessedDetails(
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readFloat64(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })(),
            BinaryDecoders.decodeAggregateConfiguration(reader)
        );
    };

    static decodeReadAtTimeDetails = (reader: BufferReader) => {
        const { ReadAtTimeDetails } = require("./types/readAtTimeDetails");
        return new ReadAtTimeDetails(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDateTime(); } return arr; })(),
            reader.readBoolean()
        );
    };

    static decodeReadAnnotationDataDetails = (reader: BufferReader) => {
        const { ReadAnnotationDataDetails } = require("./types/readAnnotationDataDetails");
        return new ReadAnnotationDataDetails(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDateTime(); } return arr; })()
        );
    };

    static decodeHistoryData = (reader: BufferReader) => {
        const { HistoryData } = require("./types/historyData");
        return new HistoryData(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDataValue(); } return arr; })()
        );
    };

    static decodeModificationInfo = (reader: BufferReader) => {
        const { ModificationInfo } = require("./types/modificationInfo");
        return new ModificationInfo(
            reader.readDateTime(),
            reader.readUInt32() as HistoryUpdateTypeEnum,
            reader.readString()
        );
    };

    static decodeHistoryModifiedData = (reader: BufferReader) => {
        const { HistoryModifiedData } = require("./types/historyModifiedData");
        return new HistoryModifiedData(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeModificationInfo(reader); } return arr; })()
        );
    };

    static decodeHistoryEvent = (reader: BufferReader) => {
        const { HistoryEvent } = require("./types/historyEvent");
        return new HistoryEvent(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeHistoryEventFieldList(reader); } return arr; })()
        );
    };

    static decodeHistoryModifiedEvent = (reader: BufferReader) => {
        const { HistoryModifiedEvent } = require("./types/historyModifiedEvent");
        return new HistoryModifiedEvent(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeModificationInfo(reader); } return arr; })()
        );
    };

    static decodeHistoryReadRequest = (reader: BufferReader) => {
        const { HistoryReadRequest } = require("./types/historyReadRequest");
        return new HistoryReadRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readExtensionObject(),
            reader.readUInt32() as TimestampsToReturnEnum,
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeHistoryReadValueId(reader); } return arr; })()
        );
    };

    static decodeHistoryReadResponse = (reader: BufferReader) => {
        const { HistoryReadResponse } = require("./types/historyReadResponse");
        return new HistoryReadResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeHistoryReadResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeWriteValue = (reader: BufferReader) => {
        const { WriteValue } = require("./types/writeValue");
        return new WriteValue(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readString(),
            reader.readDataValue()
        );
    };

    static decodeWriteRequest = (reader: BufferReader) => {
        const { WriteRequest } = require("./types/writeRequest");
        return new WriteRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeWriteValue(reader); } return arr; })()
        );
    };

    static decodeWriteResponse = (reader: BufferReader) => {
        const { WriteResponse } = require("./types/writeResponse");
        return new WriteResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeHistoryUpdateDetails = (reader: BufferReader) => {
        const { HistoryUpdateDetails } = require("./types/historyUpdateDetails");
        return new HistoryUpdateDetails();
    };

    static decodeUpdateDataDetails = (reader: BufferReader) => {
        const { UpdateDataDetails } = require("./types/updateDataDetails");
        return new UpdateDataDetails(
            reader.readNodeId(),
            reader.readUInt32() as PerformUpdateTypeEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDataValue(); } return arr; })()
        );
    };

    static decodeUpdateStructureDataDetails = (reader: BufferReader) => {
        const { UpdateStructureDataDetails } = require("./types/updateStructureDataDetails");
        return new UpdateStructureDataDetails(
            reader.readNodeId(),
            reader.readUInt32() as PerformUpdateTypeEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDataValue(); } return arr; })()
        );
    };

    static decodeUpdateEventDetails = (reader: BufferReader) => {
        const { UpdateEventDetails } = require("./types/updateEventDetails");
        return new UpdateEventDetails(
            reader.readNodeId(),
            reader.readUInt32() as PerformUpdateTypeEnum,
            BinaryDecoders.decodeEventFilter(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeHistoryEventFieldList(reader); } return arr; })()
        );
    };

    static decodeDeleteRawModifiedDetails = (reader: BufferReader) => {
        const { DeleteRawModifiedDetails } = require("./types/deleteRawModifiedDetails");
        return new DeleteRawModifiedDetails(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readDateTime(),
            reader.readDateTime()
        );
    };

    static decodeDeleteAtTimeDetails = (reader: BufferReader) => {
        const { DeleteAtTimeDetails } = require("./types/deleteAtTimeDetails");
        return new DeleteAtTimeDetails(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDateTime(); } return arr; })()
        );
    };

    static decodeDeleteEventDetails = (reader: BufferReader) => {
        const { DeleteEventDetails } = require("./types/deleteEventDetails");
        return new DeleteEventDetails(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })()
        );
    };

    static decodeHistoryUpdateResult = (reader: BufferReader) => {
        const { HistoryUpdateResult } = require("./types/historyUpdateResult");
        return new HistoryUpdateResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeHistoryUpdateRequest = (reader: BufferReader) => {
        const { HistoryUpdateRequest } = require("./types/historyUpdateRequest");
        return new HistoryUpdateRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
    };

    static decodeHistoryUpdateResponse = (reader: BufferReader) => {
        const { HistoryUpdateResponse } = require("./types/historyUpdateResponse");
        return new HistoryUpdateResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeHistoryUpdateResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeCallMethodRequest = (reader: BufferReader) => {
        const { CallMethodRequest } = require("./types/callMethodRequest");
        return new CallMethodRequest(
            reader.readNodeId(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
    };

    static decodeCallMethodResult = (reader: BufferReader) => {
        const { CallMethodResult } = require("./types/callMethodResult");
        return new CallMethodResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
    };

    static decodeCallRequest = (reader: BufferReader) => {
        const { CallRequest } = require("./types/callRequest");
        return new CallRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeCallMethodRequest(reader); } return arr; })()
        );
    };

    static decodeCallResponse = (reader: BufferReader) => {
        const { CallResponse } = require("./types/callResponse");
        return new CallResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeCallMethodResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeDataChangeFilter = (reader: BufferReader) => {
        const { DataChangeFilter } = require("./types/dataChangeFilter");
        return new DataChangeFilter(
            reader.readUInt32() as DataChangeTriggerEnum,
            reader.readUInt32(),
            reader.readFloat64()
        );
    };

    static decodeEventFilter = (reader: BufferReader) => {
        const { EventFilter } = require("./types/eventFilter");
        return new EventFilter(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSimpleAttributeOperand(reader); } return arr; })(),
            BinaryDecoders.decodeContentFilter(reader)
        );
    };

    static decodeAggregateConfiguration = (reader: BufferReader) => {
        const { AggregateConfiguration } = require("./types/aggregateConfiguration");
        return new AggregateConfiguration(
            reader.readBoolean(),
            reader.readBoolean(),
            reader.readUInt8(),
            reader.readUInt8(),
            reader.readBoolean()
        );
    };

    static decodeAggregateFilter = (reader: BufferReader) => {
        const { AggregateFilter } = require("./types/aggregateFilter");
        return new AggregateFilter(
            reader.readDateTime(),
            reader.readNodeId(),
            reader.readFloat64(),
            BinaryDecoders.decodeAggregateConfiguration(reader)
        );
    };

    static decodeEventFilterResult = (reader: BufferReader) => {
        const { EventFilterResult } = require("./types/eventFilterResult");
        return new EventFilterResult(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })(),
            BinaryDecoders.decodeContentFilterResult(reader)
        );
    };

    static decodeAggregateFilterResult = (reader: BufferReader) => {
        const { AggregateFilterResult } = require("./types/aggregateFilterResult");
        return new AggregateFilterResult(
            reader.readDateTime(),
            reader.readFloat64(),
            BinaryDecoders.decodeAggregateConfiguration(reader)
        );
    };

    static decodeMonitoringParameters = (reader: BufferReader) => {
        const { MonitoringParameters } = require("./types/monitoringParameters");
        return new MonitoringParameters(
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readExtensionObject(),
            reader.readUInt32(),
            reader.readBoolean()
        );
    };

    static decodeMonitoredItemCreateRequest = (reader: BufferReader) => {
        const { MonitoredItemCreateRequest } = require("./types/monitoredItemCreateRequest");
        return new MonitoredItemCreateRequest(
            BinaryDecoders.decodeReadValueId(reader),
            reader.readUInt32() as MonitoringModeEnum,
            BinaryDecoders.decodeMonitoringParameters(reader)
        );
    };

    static decodeMonitoredItemCreateResult = (reader: BufferReader) => {
        const { MonitoredItemCreateResult } = require("./types/monitoredItemCreateResult");
        return new MonitoredItemCreateResult(
            reader.readStatusCode(),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readExtensionObject()
        );
    };

    static decodeCreateMonitoredItemsRequest = (reader: BufferReader) => {
        const { CreateMonitoredItemsRequest } = require("./types/createMonitoredItemsRequest");
        return new CreateMonitoredItemsRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32() as TimestampsToReturnEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeMonitoredItemCreateRequest(reader); } return arr; })()
        );
    };

    static decodeCreateMonitoredItemsResponse = (reader: BufferReader) => {
        const { CreateMonitoredItemsResponse } = require("./types/createMonitoredItemsResponse");
        return new CreateMonitoredItemsResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeMonitoredItemCreateResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeMonitoredItemModifyRequest = (reader: BufferReader) => {
        const { MonitoredItemModifyRequest } = require("./types/monitoredItemModifyRequest");
        return new MonitoredItemModifyRequest(
            reader.readUInt32(),
            BinaryDecoders.decodeMonitoringParameters(reader)
        );
    };

    static decodeMonitoredItemModifyResult = (reader: BufferReader) => {
        const { MonitoredItemModifyResult } = require("./types/monitoredItemModifyResult");
        return new MonitoredItemModifyResult(
            reader.readStatusCode(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readExtensionObject()
        );
    };

    static decodeModifyMonitoredItemsRequest = (reader: BufferReader) => {
        const { ModifyMonitoredItemsRequest } = require("./types/modifyMonitoredItemsRequest");
        return new ModifyMonitoredItemsRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32() as TimestampsToReturnEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeMonitoredItemModifyRequest(reader); } return arr; })()
        );
    };

    static decodeModifyMonitoredItemsResponse = (reader: BufferReader) => {
        const { ModifyMonitoredItemsResponse } = require("./types/modifyMonitoredItemsResponse");
        return new ModifyMonitoredItemsResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeMonitoredItemModifyResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeSetMonitoringModeRequest = (reader: BufferReader) => {
        const { SetMonitoringModeRequest } = require("./types/setMonitoringModeRequest");
        return new SetMonitoringModeRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32() as MonitoringModeEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
    };

    static decodeSetMonitoringModeResponse = (reader: BufferReader) => {
        const { SetMonitoringModeResponse } = require("./types/setMonitoringModeResponse");
        return new SetMonitoringModeResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeSetTriggeringRequest = (reader: BufferReader) => {
        const { SetTriggeringRequest } = require("./types/setTriggeringRequest");
        return new SetTriggeringRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
    };

    static decodeSetTriggeringResponse = (reader: BufferReader) => {
        const { SetTriggeringResponse } = require("./types/setTriggeringResponse");
        return new SetTriggeringResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeDeleteMonitoredItemsRequest = (reader: BufferReader) => {
        const { DeleteMonitoredItemsRequest } = require("./types/deleteMonitoredItemsRequest");
        return new DeleteMonitoredItemsRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
    };

    static decodeDeleteMonitoredItemsResponse = (reader: BufferReader) => {
        const { DeleteMonitoredItemsResponse } = require("./types/deleteMonitoredItemsResponse");
        return new DeleteMonitoredItemsResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeCreateSubscriptionRequest = (reader: BufferReader) => {
        const { CreateSubscriptionRequest } = require("./types/createSubscriptionRequest");
        return new CreateSubscriptionRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readBoolean(),
            reader.readUInt8()
        );
    };

    static decodeCreateSubscriptionResponse = (reader: BufferReader) => {
        const { CreateSubscriptionResponse } = require("./types/createSubscriptionResponse");
        return new CreateSubscriptionResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeModifySubscriptionRequest = (reader: BufferReader) => {
        const { ModifySubscriptionRequest } = require("./types/modifySubscriptionRequest");
        return new ModifySubscriptionRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt8()
        );
    };

    static decodeModifySubscriptionResponse = (reader: BufferReader) => {
        const { ModifySubscriptionResponse } = require("./types/modifySubscriptionResponse");
        return new ModifySubscriptionResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeSetPublishingModeRequest = (reader: BufferReader) => {
        const { SetPublishingModeRequest } = require("./types/setPublishingModeRequest");
        return new SetPublishingModeRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
    };

    static decodeSetPublishingModeResponse = (reader: BufferReader) => {
        const { SetPublishingModeResponse } = require("./types/setPublishingModeResponse");
        return new SetPublishingModeResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeNotificationMessage = (reader: BufferReader) => {
        const { NotificationMessage } = require("./types/notificationMessage");
        return new NotificationMessage(
            reader.readUInt32(),
            reader.readDateTime(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
    };

    static decodeDataChangeNotification = (reader: BufferReader) => {
        const { DataChangeNotification } = require("./types/dataChangeNotification");
        return new DataChangeNotification(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeMonitoredItemNotification(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeMonitoredItemNotification = (reader: BufferReader) => {
        const { MonitoredItemNotification } = require("./types/monitoredItemNotification");
        return new MonitoredItemNotification(
            reader.readUInt32(),
            reader.readDataValue()
        );
    };

    static decodeEventNotificationList = (reader: BufferReader) => {
        const { EventNotificationList } = require("./types/eventNotificationList");
        return new EventNotificationList(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEventFieldList(reader); } return arr; })()
        );
    };

    static decodeEventFieldList = (reader: BufferReader) => {
        const { EventFieldList } = require("./types/eventFieldList");
        return new EventFieldList(
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
    };

    static decodeHistoryEventFieldList = (reader: BufferReader) => {
        const { HistoryEventFieldList } = require("./types/historyEventFieldList");
        return new HistoryEventFieldList(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
    };

    static decodeStatusChangeNotification = (reader: BufferReader) => {
        const { StatusChangeNotification } = require("./types/statusChangeNotification");
        return new StatusChangeNotification(
            reader.readStatusCode(),
            reader.readDiagnosticInfo()
        );
    };

    static decodeSubscriptionAcknowledgement = (reader: BufferReader) => {
        const { SubscriptionAcknowledgement } = require("./types/subscriptionAcknowledgement");
        return new SubscriptionAcknowledgement(
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodePublishRequest = (reader: BufferReader) => {
        const { PublishRequest } = require("./types/publishRequest");
        return new PublishRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeSubscriptionAcknowledgement(reader); } return arr; })()
        );
    };

    static decodePublishResponse = (reader: BufferReader) => {
        const { PublishResponse } = require("./types/publishResponse");
        return new PublishResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readBoolean(),
            BinaryDecoders.decodeNotificationMessage(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeRepublishRequest = (reader: BufferReader) => {
        const { RepublishRequest } = require("./types/republishRequest");
        return new RepublishRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeRepublishResponse = (reader: BufferReader) => {
        const { RepublishResponse } = require("./types/republishResponse");
        return new RepublishResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            BinaryDecoders.decodeNotificationMessage(reader)
        );
    };

    static decodeTransferResult = (reader: BufferReader) => {
        const { TransferResult } = require("./types/transferResult");
        return new TransferResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
    };

    static decodeTransferSubscriptionsRequest = (reader: BufferReader) => {
        const { TransferSubscriptionsRequest } = require("./types/transferSubscriptionsRequest");
        return new TransferSubscriptionsRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readBoolean()
        );
    };

    static decodeTransferSubscriptionsResponse = (reader: BufferReader) => {
        const { TransferSubscriptionsResponse } = require("./types/transferSubscriptionsResponse");
        return new TransferSubscriptionsResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeTransferResult(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeDeleteSubscriptionsRequest = (reader: BufferReader) => {
        const { DeleteSubscriptionsRequest } = require("./types/deleteSubscriptionsRequest");
        return new DeleteSubscriptionsRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })()
        );
    };

    static decodeDeleteSubscriptionsResponse = (reader: BufferReader) => {
        const { DeleteSubscriptionsResponse } = require("./types/deleteSubscriptionsResponse");
        return new DeleteSubscriptionsResponse(
            BinaryDecoders.decodeResponseHeader(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readStatusCode(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })()
        );
    };

    static decodeBuildInfo = (reader: BufferReader) => {
        const { BuildInfo } = require("./types/buildInfo");
        return new BuildInfo(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime()
        );
    };

    static decodeRedundantServerDataType = (reader: BufferReader) => {
        const { RedundantServerDataType } = require("./types/redundantServerDataType");
        return new RedundantServerDataType(
            reader.readString(),
            reader.readUInt8(),
            reader.readUInt32() as ServerStateEnum
        );
    };

    static decodeEndpointUrlListDataType = (reader: BufferReader) => {
        const { EndpointUrlListDataType } = require("./types/endpointUrlListDataType");
        return new EndpointUrlListDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
    };

    static decodeNetworkGroupDataType = (reader: BufferReader) => {
        const { NetworkGroupDataType } = require("./types/networkGroupDataType");
        return new NetworkGroupDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeEndpointUrlListDataType(reader); } return arr; })()
        );
    };

    static decodeSamplingIntervalDiagnosticsDataType = (reader: BufferReader) => {
        const { SamplingIntervalDiagnosticsDataType } = require("./types/samplingIntervalDiagnosticsDataType");
        return new SamplingIntervalDiagnosticsDataType(
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeServerDiagnosticsSummaryDataType = (reader: BufferReader) => {
        const { ServerDiagnosticsSummaryDataType } = require("./types/serverDiagnosticsSummaryDataType");
        return new ServerDiagnosticsSummaryDataType(
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeServerStatusDataType = (reader: BufferReader) => {
        const { ServerStatusDataType } = require("./types/serverStatusDataType");
        return new ServerStatusDataType(
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readUInt32() as ServerStateEnum,
            BinaryDecoders.decodeBuildInfo(reader),
            reader.readUInt32(),
            reader.readLocalizedText()
        );
    };

    static decodeSessionDiagnosticsDataType = (reader: BufferReader) => {
        const { SessionDiagnosticsDataType } = require("./types/sessionDiagnosticsDataType");
        return new SessionDiagnosticsDataType(
            reader.readNodeId(),
            reader.readString(),
            BinaryDecoders.decodeApplicationDescription(reader),
            reader.readString(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            reader.readUInt32(),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader),
            BinaryDecoders.decodeServiceCounterDataType(reader)
        );
    };

    static decodeSessionSecurityDiagnosticsDataType = (reader: BufferReader) => {
        const { SessionSecurityDiagnosticsDataType } = require("./types/sessionSecurityDiagnosticsDataType");
        return new SessionSecurityDiagnosticsDataType(
            reader.readNodeId(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt32() as MessageSecurityModeEnum,
            reader.readString(),
            reader.readByteString()
        );
    };

    static decodeServiceCounterDataType = (reader: BufferReader) => {
        const { ServiceCounterDataType } = require("./types/serviceCounterDataType");
        return new ServiceCounterDataType(
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeStatusResult = (reader: BufferReader) => {
        const { StatusResult } = require("./types/statusResult");
        return new StatusResult(
            reader.readStatusCode(),
            reader.readDiagnosticInfo()
        );
    };

    static decodeSubscriptionDiagnosticsDataType = (reader: BufferReader) => {
        const { SubscriptionDiagnosticsDataType } = require("./types/subscriptionDiagnosticsDataType");
        return new SubscriptionDiagnosticsDataType(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readUInt8(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readBoolean(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32()
        );
    };

    static decodeModelChangeStructureDataType = (reader: BufferReader) => {
        const { ModelChangeStructureDataType } = require("./types/modelChangeStructureDataType");
        return new ModelChangeStructureDataType(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readUInt8()
        );
    };

    static decodeSemanticChangeStructureDataType = (reader: BufferReader) => {
        const { SemanticChangeStructureDataType } = require("./types/semanticChangeStructureDataType");
        return new SemanticChangeStructureDataType(
            reader.readNodeId(),
            reader.readNodeId()
        );
    };

    static decodeRange = (reader: BufferReader) => {
        const { Range } = require("./types/range");
        return new Range(
            reader.readFloat64(),
            reader.readFloat64()
        );
    };

    static decodeEUInformation = (reader: BufferReader) => {
        const { EUInformation } = require("./types/eUInformation");
        return new EUInformation(
            reader.readString(),
            reader.readInt32(),
            reader.readLocalizedText(),
            reader.readLocalizedText()
        );
    };

    static decodeComplexNumberType = (reader: BufferReader) => {
        const { ComplexNumberType } = require("./types/complexNumberType");
        return new ComplexNumberType(
            reader.readFloat32(),
            reader.readFloat32()
        );
    };

    static decodeDoubleComplexNumberType = (reader: BufferReader) => {
        const { DoubleComplexNumberType } = require("./types/doubleComplexNumberType");
        return new DoubleComplexNumberType(
            reader.readFloat64(),
            reader.readFloat64()
        );
    };

    static decodeAxisInformation = (reader: BufferReader) => {
        const { AxisInformation } = require("./types/axisInformation");
        return new AxisInformation(
            BinaryDecoders.decodeEUInformation(reader),
            BinaryDecoders.decodeRange(reader),
            reader.readLocalizedText(),
            reader.readUInt32() as AxisScaleEnumerationEnum,
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readFloat64(); } return arr; })()
        );
    };

    static decodeXVType = (reader: BufferReader) => {
        const { XVType } = require("./types/xVType");
        return new XVType(
            reader.readFloat64(),
            reader.readFloat32()
        );
    };

    static decodeProgramDiagnosticDataType = (reader: BufferReader) => {
        const { ProgramDiagnosticDataType } = require("./types/programDiagnosticDataType");
        return new ProgramDiagnosticDataType(
            reader.readNodeId(),
            reader.readString(),
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readString(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeArgument(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeArgument(reader); } return arr; })(),
            reader.readDateTime(),
            BinaryDecoders.decodeStatusResult(reader)
        );
    };

    static decodeProgramDiagnostic2DataType = (reader: BufferReader) => {
        const { ProgramDiagnostic2DataType } = require("./types/programDiagnostic2DataType");
        return new ProgramDiagnostic2DataType(
            reader.readNodeId(),
            reader.readString(),
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readString(),
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeArgument(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BinaryDecoders.decodeArgument(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })(),
            reader.readDateTime(),
            reader.readStatusCode()
        );
    };

    static decodeAnnotation = (reader: BufferReader) => {
        const { Annotation } = require("./types/annotation");
        return new Annotation(
            reader.readString(),
            reader.readString(),
            reader.readDateTime()
        );
    };

}