// AUTO-GENERATED – DO NOT EDIT
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IIdentifiable } from "../codecs/iIdentifiable";
import { NodeId } from "../types/nodeId";

export class BinaryEncoders {
    static encodeEnumeration = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeUnion = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeKeyValuePair = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Key.encode(writer);
        obj.Value.encode(writer);
    };

    static encodeAdditionalParametersType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.Parameters;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
    };

    static encodeEphemeralKeyType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeByteString(obj.PublicKey);
        writer.writeByteString(obj.Signature);
    };

    static encodeEndpointType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.EndpointUrl);
        writer.writeUInt32(obj.SecurityMode);
        writer.writeString(obj.SecurityPolicyUri);
        writer.writeString(obj.TransportProfileUri);
    };

    static encodeBitFieldDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        obj.Description.encode(writer);
        writer.writeBoolean(obj.Reserved);
        writer.writeUInt32(obj.StartingBitPosition);
        writer.writeUInt32(obj.EndingBitPosition);
    };

    static encodeRationalNumber = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeInt32(obj.Numerator);
        writer.writeUInt32(obj.Denominator);
    };

    static encodeVector = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeThreeDVector = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat64(obj.X);
        writer.writeFloat64(obj.Y);
        writer.writeFloat64(obj.Z);
    };

    static encodeCartesianCoordinates = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeThreeDCartesianCoordinates = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat64(obj.X);
        writer.writeFloat64(obj.Y);
        writer.writeFloat64(obj.Z);
    };

    static encodeOrientation = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeThreeDOrientation = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat64(obj.A);
        writer.writeFloat64(obj.B);
        writer.writeFloat64(obj.C);
    };

    static encodeFrame = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeThreeDFrame = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeThreeDCartesianCoordinates(writer, obj.CartesianCoordinates);
        BinaryEncoders.encodeThreeDOrientation(writer, obj.Orientation);
    };

    static encodeIdentityMappingRuleType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.CriteriaType);
        writer.writeString(obj.Criteria);
    };

    static encodeCurrencyUnitType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeInt16(obj.NumericCode);
        writer.writeInt8(obj.Exponent);
        writer.writeString(obj.AlphabeticCode);
        obj.Currency.encode(writer);
    };

    static encodeAnnotationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Annotation);
        writer.writeString(obj.Discipline);
        writer.writeString(obj.Uri);
    };

    static encodeLinearConversionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat32(obj.InitialAddend);
        writer.writeFloat32(obj.Multiplicand);
        writer.writeFloat32(obj.Divisor);
        writer.writeFloat32(obj.FinalAddend);
    };

    static encodeQuantityDimension = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeInt8(obj.MassExponent);
        writer.writeInt8(obj.LengthExponent);
        writer.writeInt8(obj.TimeExponent);
        writer.writeInt8(obj.ElectricCurrentExponent);
        writer.writeInt8(obj.AmountOfSubstanceExponent);
        writer.writeInt8(obj.LuminousIntensityExponent);
        writer.writeInt8(obj.AbsoluteTemperatureExponent);
        writer.writeInt8(obj.DimensionlessExponent);
    };

    static encodeTrustListDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.SpecifiedLists);
        {
            const arr = obj.TrustedCertificates;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeByteString(v);
                }
            }
        };
        {
            const arr = obj.TrustedCrls;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeByteString(v);
                }
            }
        };
        {
            const arr = obj.IssuerCertificates;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeByteString(v);
                }
            }
        };
        {
            const arr = obj.IssuerCrls;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeByteString(v);
                }
            }
        };
    };

    static encodeBaseConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.ConfigurationVersion);
        {
            const arr = obj.ConfigurationProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
    };

    static encodeBaseConfigurationRecordDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        {
            const arr = obj.RecordProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
    };

    static encodeCertificateGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Purpose.encode(writer);
        {
            const arr = obj.CertificateTypes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        {
            const arr = obj.IsCertificateAssigned;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeBoolean(v);
                }
            }
        };
        writer.writeUInt32(obj.ValidationOptions);
    };

    static encodeConfigurationUpdateTargetType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Path);
        writer.writeUInt32(obj.UpdateType);
    };

    static encodeTransactionErrorType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.TargetId.encode(writer);
        writer.writeStatusCode(obj.Error);
        obj.Message.encode(writer);
    };

    static encodeApplicationConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeApplicationIdentityDataType(writer, obj.ApplicationIdentity);
        {
            const arr = obj.CertificateGroups;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeCertificateGroupDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.ServerEndpoints;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeServerEndpointDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.ClientEndpoints;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.SecuritySettings;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSecuritySettingsDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.UserTokenSettings;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeUserTokenSettingsDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.AuthorizationServices;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeAuthorizationServiceConfigurationDataType(writer, v);
                }
            }
        };
    };

    static encodeApplicationIdentityDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ApplicationUri);
        {
            const arr = obj.ApplicationNames;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        {
            const arr = obj.AdditionalServers;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeApplicationDescription(writer, v);
                }
            }
        };
    };

    static encodeEndpointDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.DiscoveryUrls;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeString(obj.NetworkName);
        writer.writeUInt16(obj.Port);
    };

    static encodeServerEndpointDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.EndpointUrls;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.SecuritySettingNames;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeString(obj.TransportProfileUri);
        {
            const arr = obj.UserTokenSettingNames;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.ReverseConnectUrls;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeSecuritySettingsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.SecurityModes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        {
            const arr = obj.SecurityPolicyUris;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeString(obj.CertificateGroupName);
    };

    static encodeUserTokenSettingsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.TokenType);
        writer.writeString(obj.IssuedTokenType);
        writer.writeString(obj.IssuerEndpointUrl);
        writer.writeString(obj.SecurityPolicyUri);
        writer.writeString(obj.CertificateGroupName);
        writer.writeString(obj.AuthorizationServiceName);
    };

    static encodeServiceCertificateDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeByteString(obj.Certificate);
        {
            const arr = obj.Issuers;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeByteString(v);
                }
            }
        };
        writer.writeDateTime(obj.ValidFrom);
        writer.writeDateTime(obj.ValidTo);
    };

    static encodeAuthorizationServiceConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ServiceUri);
        {
            const arr = obj.ServiceCertificates;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeServiceCertificateDataType(writer, v);
                }
            }
        };
        writer.writeString(obj.IssuerEndpointSettings);
    };

    static encodeDecimalDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeInt16(obj.Scale);
        writer.writeByteString(obj.Value);
    };

    static encodeDataTypeSchemaHeader = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.Namespaces;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.StructureDataTypes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeStructureDescription(writer, v);
                }
            }
        };
        {
            const arr = obj.EnumDataTypes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEnumDescription(writer, v);
                }
            }
        };
        {
            const arr = obj.SimpleDataTypes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSimpleTypeDescription(writer, v);
                }
            }
        };
    };

    static encodeDataTypeDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.DataTypeId.encode(writer);
        obj.Name.encode(writer);
    };

    static encodeStructureDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeStructureDefinition(writer, obj.StructureDefinition);
    };

    static encodeEnumDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeEnumDefinition(writer, obj.EnumDefinition);
        writer.writeUint8(obj.BuiltInType);
    };

    static encodeSimpleTypeDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.BaseDataType.encode(writer);
        writer.writeUint8(obj.BuiltInType);
    };

    static encodeUABinaryFileDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.SchemaLocation);
        {
            const arr = obj.FileHeader;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
        obj.Body.encode(writer);
    };

    static encodePortableQualifiedName = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.NamespaceUri);
        writer.writeString(obj.Name);
    };

    static encodePortableNodeId = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.NamespaceUri);
        obj.Identifier.encode(writer);
    };

    static encodeUnsignedRationalNumber = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.Numerator);
        writer.writeUInt32(obj.Denominator);
    };

    static encodeDataSetMetaDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        obj.Description.encode(writer);
        {
            const arr = obj.Fields;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeFieldMetaData(writer, v);
                }
            }
        };
        writer.writeGuid(obj.DataSetClassId);
        BinaryEncoders.encodeConfigurationVersionDataType(writer, obj.ConfigurationVersion);
    };

    static encodeFieldMetaData = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        obj.Description.encode(writer);
        writer.writeUInt32(obj.FieldFlags);
        writer.writeUint8(obj.BuiltInType);
        obj.DataType.encode(writer);
        writer.writeInt32(obj.ValueRank);
        {
            const arr = obj.ArrayDimensions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeUInt32(obj.MaxStringLength);
        writer.writeGuid(obj.DataSetFieldId);
        {
            const arr = obj.Properties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
    };

    static encodeConfigurationVersionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.MajorVersion);
        writer.writeUInt32(obj.MinorVersion);
    };

    static encodePublishedDataSetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        {
            const arr = obj.DataSetFolder;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        BinaryEncoders.encodeDataSetMetaDataType(writer, obj.DataSetMetaData);
        {
            const arr = obj.ExtensionFields;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
        BinaryEncoders.encodePublishedDataSetSourceDataType(writer, obj.DataSetSource);
    };

    static encodePublishedDataSetSourceDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodePublishedVariableDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.PublishedVariable.encode(writer);
        writer.writeUInt32(obj.AttributeId);
        writer.writeFloat64(obj.SamplingIntervalHint);
        writer.writeUInt32(obj.DeadbandType);
        writer.writeFloat64(obj.DeadbandValue);
        writer.writeString(obj.IndexRange);
        obj.SubstituteValue.encode(writer);
        {
            const arr = obj.MetaDataProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodePublishedDataItemsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.PublishedData;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodePublishedVariableDataType(writer, v);
                }
            }
        };
    };

    static encodePublishedEventsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.EventNotifier.encode(writer);
        {
            const arr = obj.SelectedFields;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSimpleAttributeOperand(writer, v);
                }
            }
        };
        BinaryEncoders.encodeContentFilter(writer, obj.Filter);
    };

    static encodePublishedDataSetCustomSourceDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.CyclicDataSet);
    };

    static encodeActionTargetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt16(obj.ActionTargetId);
        writer.writeString(obj.Name);
        obj.Description.encode(writer);
    };

    static encodePublishedActionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeDataSetMetaDataType(writer, obj.RequestDataSetMetaData);
        {
            const arr = obj.ActionTargets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeActionTargetDataType(writer, v);
                }
            }
        };
    };

    static encodeActionMethodDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ObjectId.encode(writer);
        obj.MethodId.encode(writer);
    };

    static encodePublishedActionMethodDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.ActionMethods;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeActionMethodDataType(writer, v);
                }
            }
        };
    };

    static encodeDataSetWriterDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        writer.writeBoolean(obj.Enabled);
        writer.writeUInt16(obj.DataSetWriterId);
        writer.writeUInt32(obj.DataSetFieldContentMask);
        writer.writeUInt32(obj.KeyFrameCount);
        writer.writeString(obj.DataSetName);
        {
            const arr = obj.DataSetWriterProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
        BinaryEncoders.encodeDataSetWriterTransportDataType(writer, obj.TransportSettings);
        BinaryEncoders.encodeDataSetWriterMessageDataType(writer, obj.MessageSettings);
    };

    static encodeDataSetWriterTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeDataSetWriterMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodePubSubGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        writer.writeBoolean(obj.Enabled);
        writer.writeUInt32(obj.SecurityMode);
        writer.writeString(obj.SecurityGroupId);
        {
            const arr = obj.SecurityKeyServices;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointDescription(writer, v);
                }
            }
        };
        writer.writeUInt32(obj.MaxNetworkMessageSize);
        {
            const arr = obj.GroupProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
    };

    static encodeWriterGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt16(obj.WriterGroupId);
        writer.writeFloat64(obj.PublishingInterval);
        writer.writeFloat64(obj.KeepAliveTime);
        writer.writeUint8(obj.Priority);
        {
            const arr = obj.LocaleIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeString(obj.HeaderLayoutUri);
        BinaryEncoders.encodeWriterGroupTransportDataType(writer, obj.TransportSettings);
        BinaryEncoders.encodeWriterGroupMessageDataType(writer, obj.MessageSettings);
        {
            const arr = obj.DataSetWriters;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeDataSetWriterDataType(writer, v);
                }
            }
        };
    };

    static encodeWriterGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeWriterGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodePubSubConnectionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        writer.writeBoolean(obj.Enabled);
        obj.PublisherId.encode(writer);
        writer.writeString(obj.TransportProfileUri);
        BinaryEncoders.encodeNetworkAddressDataType(writer, obj.Address);
        {
            const arr = obj.ConnectionProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
        BinaryEncoders.encodeConnectionTransportDataType(writer, obj.TransportSettings);
        {
            const arr = obj.WriterGroups;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeWriterGroupDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.ReaderGroups;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeReaderGroupDataType(writer, v);
                }
            }
        };
    };

    static encodeConnectionTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeNetworkAddressDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.NetworkInterface);
    };

    static encodeNetworkAddressUrlDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Url);
    };

    static encodeReaderGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeReaderGroupTransportDataType(writer, obj.TransportSettings);
        BinaryEncoders.encodeReaderGroupMessageDataType(writer, obj.MessageSettings);
        {
            const arr = obj.DataSetReaders;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeDataSetReaderDataType(writer, v);
                }
            }
        };
    };

    static encodeReaderGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeReaderGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeDataSetReaderDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        writer.writeBoolean(obj.Enabled);
        obj.PublisherId.encode(writer);
        writer.writeUInt16(obj.WriterGroupId);
        writer.writeUInt16(obj.DataSetWriterId);
        BinaryEncoders.encodeDataSetMetaDataType(writer, obj.DataSetMetaData);
        writer.writeUInt32(obj.DataSetFieldContentMask);
        writer.writeFloat64(obj.MessageReceiveTimeout);
        writer.writeUInt32(obj.KeyFrameCount);
        writer.writeString(obj.HeaderLayoutUri);
        writer.writeUInt32(obj.SecurityMode);
        writer.writeString(obj.SecurityGroupId);
        {
            const arr = obj.SecurityKeyServices;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointDescription(writer, v);
                }
            }
        };
        {
            const arr = obj.DataSetReaderProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
        BinaryEncoders.encodeDataSetReaderTransportDataType(writer, obj.TransportSettings);
        BinaryEncoders.encodeDataSetReaderMessageDataType(writer, obj.MessageSettings);
        BinaryEncoders.encodeSubscribedDataSetDataType(writer, obj.SubscribedDataSet);
    };

    static encodeDataSetReaderTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeDataSetReaderMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeSubscribedDataSetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeTargetVariablesDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.TargetVariables;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeFieldTargetDataType(writer, v);
                }
            }
        };
    };

    static encodeFieldTargetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeGuid(obj.DataSetFieldId);
        writer.writeString(obj.ReceiverIndexRange);
        obj.TargetNodeId.encode(writer);
        writer.writeUInt32(obj.AttributeId);
        writer.writeString(obj.WriteIndexRange);
        writer.writeUInt32(obj.OverrideValueHandling);
        obj.OverrideValue.encode(writer);
    };

    static encodeSubscribedDataSetMirrorDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ParentNodeName);
        {
            const arr = obj.RolePermissions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeRolePermissionType(writer, v);
                }
            }
        };
    };

    static encodePubSubConfigurationDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.PublishedDataSets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodePublishedDataSetDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.Connections;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodePubSubConnectionDataType(writer, v);
                }
            }
        };
        writer.writeBoolean(obj.Enabled);
    };

    static encodeStandaloneSubscribedDataSetRefDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.DataSetName);
    };

    static encodeStandaloneSubscribedDataSetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        {
            const arr = obj.DataSetFolder;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        BinaryEncoders.encodeDataSetMetaDataType(writer, obj.DataSetMetaData);
        BinaryEncoders.encodeSubscribedDataSetDataType(writer, obj.SubscribedDataSet);
    };

    static encodeSecurityGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        {
            const arr = obj.SecurityGroupFolder;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeFloat64(obj.KeyLifetime);
        writer.writeString(obj.SecurityPolicyUri);
        writer.writeUInt32(obj.MaxFutureKeyCount);
        writer.writeUInt32(obj.MaxPastKeyCount);
        writer.writeString(obj.SecurityGroupId);
        {
            const arr = obj.RolePermissions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeRolePermissionType(writer, v);
                }
            }
        };
        {
            const arr = obj.GroupProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
    };

    static encodePubSubKeyPushTargetDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ApplicationUri);
        {
            const arr = obj.PushTargetFolder;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeString(obj.EndpointUrl);
        writer.writeString(obj.SecurityPolicyUri);
        BinaryEncoders.encodeUserTokenPolicy(writer, obj.UserTokenType);
        writer.writeUInt16(obj.RequestedKeyCount);
        writer.writeFloat64(obj.RetryInterval);
        {
            const arr = obj.PushTargetProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
        {
            const arr = obj.SecurityGroups;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodePubSubConfiguration2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.SubscribedDataSets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeStandaloneSubscribedDataSetDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.DataSetClasses;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeDataSetMetaDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.DefaultSecurityKeyServices;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointDescription(writer, v);
                }
            }
        };
        {
            const arr = obj.SecurityGroups;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSecurityGroupDataType(writer, v);
                }
            }
        };
        {
            const arr = obj.PubSubKeyPushTargets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodePubSubKeyPushTargetDataType(writer, v);
                }
            }
        };
        writer.writeUInt32(obj.ConfigurationVersion);
        {
            const arr = obj.ConfigurationProperties;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeKeyValuePair(writer, v);
                }
            }
        };
    };

    static encodeUadpWriterGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.GroupVersion);
        writer.writeUInt32(obj.DataSetOrdering);
        writer.writeUInt32(obj.NetworkMessageContentMask);
        writer.writeFloat64(obj.SamplingOffset);
        {
            const arr = obj.PublishingOffset;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeFloat64(v);
                }
            }
        };
    };

    static encodeUadpDataSetWriterMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.DataSetMessageContentMask);
        writer.writeUInt16(obj.ConfiguredSize);
        writer.writeUInt16(obj.NetworkMessageNumber);
        writer.writeUInt16(obj.DataSetOffset);
    };

    static encodeUadpDataSetReaderMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.GroupVersion);
        writer.writeUInt16(obj.NetworkMessageNumber);
        writer.writeUInt16(obj.DataSetOffset);
        writer.writeGuid(obj.DataSetClassId);
        writer.writeUInt32(obj.NetworkMessageContentMask);
        writer.writeUInt32(obj.DataSetMessageContentMask);
        writer.writeFloat64(obj.PublishingInterval);
        writer.writeFloat64(obj.ReceiveOffset);
        writer.writeFloat64(obj.ProcessingOffset);
    };

    static encodeJsonWriterGroupMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.NetworkMessageContentMask);
    };

    static encodeJsonDataSetWriterMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.DataSetMessageContentMask);
    };

    static encodeJsonDataSetReaderMessageDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.NetworkMessageContentMask);
        writer.writeUInt32(obj.DataSetMessageContentMask);
    };

    static encodeQosDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeTransmitQosDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeTransmitQosPriorityDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.PriorityLabel);
    };

    static encodeReceiveQosDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeReceiveQosPriorityDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.PriorityLabel);
    };

    static encodeDatagramConnectionTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeNetworkAddressDataType(writer, obj.DiscoveryAddress);
    };

    static encodeDatagramConnectionTransport2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.DiscoveryAnnounceRate);
        writer.writeUInt32(obj.DiscoveryMaxMessageSize);
        writer.writeString(obj.QosCategory);
        {
            const arr = obj.DatagramQos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeQosDataType(writer, v);
                }
            }
        };
    };

    static encodeDatagramWriterGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUint8(obj.MessageRepeatCount);
        writer.writeFloat64(obj.MessageRepeatDelay);
    };

    static encodeDatagramWriterGroupTransport2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeNetworkAddressDataType(writer, obj.Address);
        writer.writeString(obj.QosCategory);
        {
            const arr = obj.DatagramQos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeTransmitQosDataType(writer, v);
                }
            }
        };
        writer.writeUInt32(obj.DiscoveryAnnounceRate);
        writer.writeString(obj.Topic);
    };

    static encodeDatagramDataSetReaderTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeNetworkAddressDataType(writer, obj.Address);
        writer.writeString(obj.QosCategory);
        {
            const arr = obj.DatagramQos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeReceiveQosDataType(writer, v);
                }
            }
        };
        writer.writeString(obj.Topic);
    };

    static encodeDtlsPubSubConnectionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ClientCipherSuite);
        {
            const arr = obj.ServerCipherSuites;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeBoolean(obj.ZeroRTT);
        obj.CertificateGroupId.encode(writer);
        writer.writeBoolean(obj.VerifyClientCertificate);
    };

    static encodeBrokerConnectionTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ResourceUri);
        writer.writeString(obj.AuthenticationProfileUri);
    };

    static encodeBrokerWriterGroupTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.QueueName);
        writer.writeString(obj.ResourceUri);
        writer.writeString(obj.AuthenticationProfileUri);
        writer.writeUInt32(obj.RequestedDeliveryGuarantee);
    };

    static encodeBrokerDataSetWriterTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.QueueName);
        writer.writeString(obj.ResourceUri);
        writer.writeString(obj.AuthenticationProfileUri);
        writer.writeUInt32(obj.RequestedDeliveryGuarantee);
        writer.writeString(obj.MetaDataQueueName);
        writer.writeFloat64(obj.MetaDataUpdateTime);
    };

    static encodeBrokerDataSetReaderTransportDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.QueueName);
        writer.writeString(obj.ResourceUri);
        writer.writeString(obj.AuthenticationProfileUri);
        writer.writeUInt32(obj.RequestedDeliveryGuarantee);
        writer.writeString(obj.MetaDataQueueName);
    };

    static encodePubSubConfigurationRefDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.ConfigurationMask);
        writer.writeUInt16(obj.ElementIndex);
        writer.writeUInt16(obj.ConnectionIndex);
        writer.writeUInt16(obj.GroupIndex);
    };

    static encodePubSubConfigurationValueDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodePubSubConfigurationRefDataType(writer, obj.ConfigurationElement);
        writer.writeString(obj.Name);
        obj.Identifier.encode(writer);
    };

    static encodeJsonNetworkMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeString(obj.WriterGroupName);
        writer.writeString(obj.DataSetClassId);
        obj.Messages.encode(writer);
    };

    static encodeJsonDataSetMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt16(obj.DataSetWriterId);
        writer.writeString(obj.DataSetWriterName);
        writer.writeString(obj.PublisherId);
        writer.writeString(obj.WriterGroupName);
        writer.writeUInt32(obj.SequenceNumber);
        BinaryEncoders.encodeConfigurationVersionDataType(writer, obj.MetaDataVersion);
        writer.writeUInt32(obj.MinorVersion);
        writer.writeDateTime(obj.Timestamp);
        writer.writeStatusCode(obj.Status);
        writer.writeString(obj.MessageType);
        obj.Payload.encode(writer);
    };

    static encodeJsonDataSetMetaDataMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeUInt16(obj.DataSetWriterId);
        writer.writeString(obj.WriterGroupName);
        writer.writeString(obj.DataSetWriterName);
        writer.writeDateTime(obj.Timestamp);
        BinaryEncoders.encodeDataSetMetaDataType(writer, obj.MetaData);
    };

    static encodeJsonApplicationDescriptionMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeDateTime(obj.Timestamp);
        BinaryEncoders.encodeApplicationDescription(writer, obj.Description);
        {
            const arr = obj.ServerCapabilities;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeJsonServerEndpointsMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeDateTime(obj.Timestamp);
        BinaryEncoders.encodeApplicationDescription(writer, obj.Description);
        {
            const arr = obj.Endpoints;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointDescription(writer, v);
                }
            }
        };
    };

    static encodeJsonStatusMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeDateTime(obj.Timestamp);
        writer.writeBoolean(obj.IsCyclic);
        writer.writeUInt32(obj.Status);
        writer.writeDateTime(obj.NextReportTime);
    };

    static encodeJsonPubSubConnectionMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeDateTime(obj.Timestamp);
        BinaryEncoders.encodePubSubConnectionDataType(writer, obj.Connection);
    };

    static encodeJsonActionMetaDataMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeUInt16(obj.DataSetWriterId);
        writer.writeString(obj.DataSetWriterName);
        writer.writeDateTime(obj.Timestamp);
        {
            const arr = obj.ActionTargets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeActionTargetDataType(writer, v);
                }
            }
        };
        BinaryEncoders.encodeDataSetMetaDataType(writer, obj.Request);
        BinaryEncoders.encodeDataSetMetaDataType(writer, obj.Response);
        {
            const arr = obj.ActionMethods;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeActionMethodDataType(writer, v);
                }
            }
        };
    };

    static encodeJsonActionResponderMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeDateTime(obj.Timestamp);
        BinaryEncoders.encodePubSubConnectionDataType(writer, obj.Connection);
    };

    static encodeJsonActionNetworkMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MessageId);
        writer.writeString(obj.MessageType);
        writer.writeString(obj.PublisherId);
        writer.writeDateTime(obj.Timestamp);
        writer.writeString(obj.ResponseAddress);
        writer.writeByteString(obj.CorrelationData);
        writer.writeString(obj.RequestorId);
        writer.writeFloat64(obj.TimeoutHint);
        {
            const arr = obj.Messages;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeJsonActionRequestMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt16(obj.DataSetWriterId);
        writer.writeUInt16(obj.ActionTargetId);
        writer.writeString(obj.DataSetWriterName);
        writer.writeString(obj.WriterGroupName);
        BinaryEncoders.encodeConfigurationVersionDataType(writer, obj.MetaDataVersion);
        writer.writeUInt32(obj.MinorVersion);
        writer.writeDateTime(obj.Timestamp);
        writer.writeString(obj.MessageType);
        writer.writeUInt16(obj.RequestId);
        writer.writeUInt32(obj.ActionState);
        obj.Payload.encode(writer);
    };

    static encodeJsonActionResponseMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt16(obj.DataSetWriterId);
        writer.writeUInt16(obj.ActionTargetId);
        writer.writeString(obj.DataSetWriterName);
        writer.writeString(obj.WriterGroupName);
        BinaryEncoders.encodeConfigurationVersionDataType(writer, obj.MetaDataVersion);
        writer.writeUInt32(obj.MinorVersion);
        writer.writeDateTime(obj.Timestamp);
        writer.writeStatusCode(obj.Status);
        writer.writeString(obj.MessageType);
        writer.writeUInt16(obj.RequestId);
        writer.writeUInt32(obj.ActionState);
        obj.Payload.encode(writer);
    };

    static encodeAliasNameDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.AliasName.encode(writer);
        {
            const arr = obj.ReferencedNodes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeUserManagementDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.UserName);
        writer.writeUInt32(obj.UserConfiguration);
        writer.writeString(obj.Description);
    };

    static encodePriorityMappingEntryType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MappingUri);
        writer.writeString(obj.PriorityLabel);
        writer.writeUint8(obj.PriorityValue_PCP);
        writer.writeUInt32(obj.PriorityValue_DSCP);
    };

    static encodeLldpManagementAddressTxPortType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.AddressSubtype);
        writer.writeString(obj.ManAddress);
        writer.writeBoolean(obj.TxEnable);
        writer.writeUInt32(obj.AddrLen);
        writer.writeUInt32(obj.IfSubtype);
        writer.writeUInt32(obj.IfId);
    };

    static encodeLldpManagementAddressType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.AddressSubtype);
        writer.writeString(obj.Address);
        writer.writeUInt32(obj.IfSubtype);
        writer.writeUInt32(obj.IfId);
    };

    static encodeLldpTlvType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.TlvType);
        writer.writeByteString(obj.TlvInfo);
    };

    static encodeReferenceDescriptionDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.SourceNode.encode(writer);
        obj.ReferenceType.encode(writer);
        writer.writeBoolean(obj.IsForward);
        obj.TargetNode.encode(writer);
    };

    static encodeReferenceListEntryDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ReferenceType.encode(writer);
        writer.writeBoolean(obj.IsForward);
        obj.TargetNode.encode(writer);
    };

    static encodeLogRecord = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeDateTime(obj.Time);
        writer.writeUInt16(obj.Severity);
        (obj.EventType ?? NodeId.NewTwoByte(0)).encode(writer);
        (obj.SourceNode ?? NodeId.NewTwoByte(0)).encode(writer);
        writer.writeString((obj.SourceName ?? undefined));
        obj.Message.encode(writer);
        BinaryEncoders.encodeTraceContextDataType(writer, obj.TraceContext);
        {
            const arr = (obj.AdditionalData ?? []);
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeNameValuePair(writer, v);
                }
            }
        };
    };

    static encodeLogRecordsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.LogRecordArray;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeLogRecord(writer, v);
                }
            }
        };
    };

    static encodeSpanContextDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeGuid(obj.TraceId);
        writer.writeUInt64(obj.SpanId);
    };

    static encodeTraceContextDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt64(obj.ParentSpanId);
        writer.writeString(obj.ParentIdentifier);
    };

    static encodeNameValuePair = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        obj.Value.encode(writer);
    };

    static encodeRolePermissionType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.RoleId.encode(writer);
        writer.writeUInt32(obj.Permissions);
    };

    static encodeDataTypeDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeStructureField = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        obj.Description.encode(writer);
        obj.DataType.encode(writer);
        writer.writeInt32(obj.ValueRank);
        {
            const arr = obj.ArrayDimensions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeUInt32(obj.MaxStringLength);
        writer.writeBoolean(obj.IsOptional);
    };

    static encodeStructureDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.DefaultEncodingId.encode(writer);
        obj.BaseDataType.encode(writer);
        writer.writeUInt32(obj.StructureType);
        {
            const arr = obj.Fields;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeStructureField(writer, v);
                }
            }
        };
    };

    static encodeEnumDefinition = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.Fields;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEnumField(writer, v);
                }
            }
        };
    };

    static encodeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeUInt32(obj.NodeClass);
        obj.BrowseName.encode(writer);
        obj.DisplayName.encode(writer);
        obj.Description.encode(writer);
        writer.writeUInt32(obj.WriteMask);
        writer.writeUInt32(obj.UserWriteMask);
        {
            const arr = obj.RolePermissions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeRolePermissionType(writer, v);
                }
            }
        };
        {
            const arr = obj.UserRolePermissions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeRolePermissionType(writer, v);
                }
            }
        };
        writer.writeUInt16(obj.AccessRestrictions);
        {
            const arr = obj.References;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeReferenceNode(writer, v);
                }
            }
        };
    };

    static encodeObjectNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUint8(obj.EventNotifier);
    };

    static encodeObjectTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.IsAbstract);
    };

    static encodeVariableNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Value.encode(writer);
        obj.DataType.encode(writer);
        writer.writeInt32(obj.ValueRank);
        {
            const arr = obj.ArrayDimensions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeUint8(obj.AccessLevel);
        writer.writeUint8(obj.UserAccessLevel);
        writer.writeFloat64(obj.MinimumSamplingInterval);
        writer.writeBoolean(obj.Historizing);
        writer.writeUInt32(obj.AccessLevelEx);
    };

    static encodeVariableTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Value.encode(writer);
        obj.DataType.encode(writer);
        writer.writeInt32(obj.ValueRank);
        {
            const arr = obj.ArrayDimensions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeBoolean(obj.IsAbstract);
    };

    static encodeReferenceTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.IsAbstract);
        writer.writeBoolean(obj.Symmetric);
        obj.InverseName.encode(writer);
    };

    static encodeMethodNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.Executable);
        writer.writeBoolean(obj.UserExecutable);
    };

    static encodeViewNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.ContainsNoLoops);
        writer.writeUint8(obj.EventNotifier);
    };

    static encodeDataTypeNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.IsAbstract);
        obj.DataTypeDefinition.encode(writer);
    };

    static encodeReferenceNode = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ReferenceTypeId.encode(writer);
        writer.writeBoolean(obj.IsInverse);
        obj.TargetId.encode(writer);
    };

    static encodeArgument = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
        obj.DataType.encode(writer);
        writer.writeInt32(obj.ValueRank);
        {
            const arr = obj.ArrayDimensions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        obj.Description.encode(writer);
    };

    static encodeEnumValueType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeInt64(obj.Value);
        obj.DisplayName.encode(writer);
        obj.Description.encode(writer);
    };

    static encodeEnumField = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Name);
    };

    static encodeOptionSet = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeByteString(obj.Value);
        writer.writeByteString(obj.ValidBits);
    };

    static encodeTimeZoneDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeInt16(obj.Offset);
        writer.writeBoolean(obj.DaylightSavingInOffset);
    };

    static encodeApplicationDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ApplicationUri);
        writer.writeString(obj.ProductUri);
        obj.ApplicationName.encode(writer);
        writer.writeUInt32(obj.ApplicationType);
        writer.writeString(obj.GatewayServerUri);
        writer.writeString(obj.DiscoveryProfileUri);
        {
            const arr = obj.DiscoveryUrls;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeRequestHeader = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.AuthenticationToken.encode(writer);
        writer.writeDateTime(obj.Timestamp);
        writer.writeUInt32(obj.RequestHandle);
        writer.writeUInt32(obj.ReturnDiagnostics);
        writer.writeString(obj.AuditEntryId);
        writer.writeUInt32(obj.TimeoutHint);
        obj.AdditionalHeader.encode(writer);
    };

    static encodeResponseHeader = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeDateTime(obj.Timestamp);
        writer.writeUInt32(obj.RequestHandle);
        writer.writeStatusCode(obj.ServiceResult);
        obj.ServiceDiagnostics.encode(writer);
        {
            const arr = obj.StringTable;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        obj.AdditionalHeader.encode(writer);
    };

    static encodeServiceFault = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
    };

    static encodeSessionlessInvokeRequestType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.UrisVersion);
        {
            const arr = obj.NamespaceUris;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.ServerUris;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.LocaleIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeUInt32(obj.ServiceId);
    };

    static encodeSessionlessInvokeResponseType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.NamespaceUris;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.ServerUris;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeUInt32(obj.ServiceId);
    };

    static encodeFindServersRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeString(obj.EndpointUrl);
        {
            const arr = obj.LocaleIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.ServerUris;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeFindServersResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Servers;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeApplicationDescription(writer, v);
                }
            }
        };
    };

    static encodeServerOnNetwork = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.RecordId);
        writer.writeString(obj.ServerName);
        writer.writeString(obj.DiscoveryUrl);
        {
            const arr = obj.ServerCapabilities;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeFindServersOnNetworkRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.StartingRecordId);
        writer.writeUInt32(obj.MaxRecordsToReturn);
        {
            const arr = obj.ServerCapabilityFilter;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeFindServersOnNetworkResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        writer.writeDateTime(obj.LastCounterResetTime);
        {
            const arr = obj.Servers;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeServerOnNetwork(writer, v);
                }
            }
        };
    };

    static encodeUserTokenPolicy = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.PolicyId);
        writer.writeUInt32(obj.TokenType);
        writer.writeString(obj.IssuedTokenType);
        writer.writeString(obj.IssuerEndpointUrl);
        writer.writeString(obj.SecurityPolicyUri);
    };

    static encodeEndpointDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.EndpointUrl);
        BinaryEncoders.encodeApplicationDescription(writer, obj.Server);
        writer.writeByteString(obj.ServerCertificate);
        writer.writeUInt32(obj.SecurityMode);
        writer.writeString(obj.SecurityPolicyUri);
        {
            const arr = obj.UserIdentityTokens;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeUserTokenPolicy(writer, v);
                }
            }
        };
        writer.writeString(obj.TransportProfileUri);
        writer.writeUint8(obj.SecurityLevel);
    };

    static encodeGetEndpointsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeString(obj.EndpointUrl);
        {
            const arr = obj.LocaleIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        {
            const arr = obj.ProfileUris;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeGetEndpointsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Endpoints;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointDescription(writer, v);
                }
            }
        };
    };

    static encodeRegisteredServer = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ServerUri);
        writer.writeString(obj.ProductUri);
        {
            const arr = obj.ServerNames;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        writer.writeUInt32(obj.ServerType);
        writer.writeString(obj.GatewayServerUri);
        {
            const arr = obj.DiscoveryUrls;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeString(obj.SemaphoreFilePath);
        writer.writeBoolean(obj.IsOnline);
    };

    static encodeRegisterServerRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        BinaryEncoders.encodeRegisteredServer(writer, obj.Server);
    };

    static encodeRegisterServerResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
    };

    static encodeMdnsDiscoveryConfiguration = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.MdnsServerName);
        {
            const arr = obj.ServerCapabilities;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeRegisterServer2Request = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        BinaryEncoders.encodeRegisteredServer(writer, obj.Server);
        {
            const arr = obj.DiscoveryConfiguration;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeRegisterServer2Response = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.ConfigurationResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeChannelSecurityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.ChannelId);
        writer.writeUInt32(obj.TokenId);
        writer.writeDateTime(obj.CreatedAt);
        writer.writeUInt32(obj.RevisedLifetime);
    };

    static encodeOpenSecureChannelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.ClientProtocolVersion);
        writer.writeUInt32(obj.RequestType);
        writer.writeUInt32(obj.SecurityMode);
        writer.writeByteString(obj.ClientNonce);
        writer.writeUInt32(obj.RequestedLifetime);
    };

    static encodeOpenSecureChannelResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        writer.writeUInt32(obj.ServerProtocolVersion);
        BinaryEncoders.encodeChannelSecurityToken(writer, obj.SecurityToken);
        writer.writeByteString(obj.ServerNonce);
    };

    static encodeCloseSecureChannelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
    };

    static encodeCloseSecureChannelResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
    };

    static encodeSignedSoftwareCertificate = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeByteString(obj.CertificateData);
        writer.writeByteString(obj.Signature);
    };

    static encodeSignatureData = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Algorithm);
        writer.writeByteString(obj.Signature);
    };

    static encodeCreateSessionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        BinaryEncoders.encodeApplicationDescription(writer, obj.ClientDescription);
        writer.writeString(obj.ServerUri);
        writer.writeString(obj.EndpointUrl);
        writer.writeString(obj.SessionName);
        writer.writeByteString(obj.ClientNonce);
        writer.writeByteString(obj.ClientCertificate);
        writer.writeFloat64(obj.RequestedSessionTimeout);
        writer.writeUInt32(obj.MaxResponseMessageSize);
    };

    static encodeCreateSessionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        obj.SessionId.encode(writer);
        obj.AuthenticationToken.encode(writer);
        writer.writeFloat64(obj.RevisedSessionTimeout);
        writer.writeByteString(obj.ServerNonce);
        writer.writeByteString(obj.ServerCertificate);
        {
            const arr = obj.ServerEndpoints;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointDescription(writer, v);
                }
            }
        };
        {
            const arr = obj.ServerSoftwareCertificates;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSignedSoftwareCertificate(writer, v);
                }
            }
        };
        BinaryEncoders.encodeSignatureData(writer, obj.ServerSignature);
        writer.writeUInt32(obj.MaxRequestMessageSize);
    };

    static encodeUserIdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.PolicyId);
    };

    static encodeUserNameIdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.UserName);
        writer.writeByteString(obj.Password);
        writer.writeString(obj.EncryptionAlgorithm);
    };

    static encodeX509IdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeByteString(obj.CertificateData);
    };

    static encodeIssuedIdentityToken = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeByteString(obj.TokenData);
        writer.writeString(obj.EncryptionAlgorithm);
    };

    static encodeActivateSessionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        BinaryEncoders.encodeSignatureData(writer, obj.ClientSignature);
        {
            const arr = obj.ClientSoftwareCertificates;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSignedSoftwareCertificate(writer, v);
                }
            }
        };
        {
            const arr = obj.LocaleIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        obj.UserIdentityToken.encode(writer);
        BinaryEncoders.encodeSignatureData(writer, obj.UserTokenSignature);
    };

    static encodeActivateSessionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        writer.writeByteString(obj.ServerNonce);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeCloseSessionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeBoolean(obj.DeleteSubscriptions);
    };

    static encodeCloseSessionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
    };

    static encodeCancelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.RequestHandle);
    };

    static encodeCancelResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        writer.writeUInt32(obj.CancelCount);
    };

    static encodeNodeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.SpecifiedAttributes);
        obj.DisplayName.encode(writer);
        obj.Description.encode(writer);
        writer.writeUInt32(obj.WriteMask);
        writer.writeUInt32(obj.UserWriteMask);
    };

    static encodeObjectAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUint8(obj.EventNotifier);
    };

    static encodeVariableAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Value.encode(writer);
        obj.DataType.encode(writer);
        writer.writeInt32(obj.ValueRank);
        {
            const arr = obj.ArrayDimensions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeUint8(obj.AccessLevel);
        writer.writeUint8(obj.UserAccessLevel);
        writer.writeFloat64(obj.MinimumSamplingInterval);
        writer.writeBoolean(obj.Historizing);
    };

    static encodeMethodAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.Executable);
        writer.writeBoolean(obj.UserExecutable);
    };

    static encodeObjectTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.IsAbstract);
    };

    static encodeVariableTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Value.encode(writer);
        obj.DataType.encode(writer);
        writer.writeInt32(obj.ValueRank);
        {
            const arr = obj.ArrayDimensions;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeBoolean(obj.IsAbstract);
    };

    static encodeReferenceTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.IsAbstract);
        writer.writeBoolean(obj.Symmetric);
        obj.InverseName.encode(writer);
    };

    static encodeDataTypeAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.IsAbstract);
    };

    static encodeViewAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.ContainsNoLoops);
        writer.writeUint8(obj.EventNotifier);
    };

    static encodeGenericAttributeValue = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.AttributeId);
        obj.Value.encode(writer);
    };

    static encodeGenericAttributes = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.AttributeValues;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeGenericAttributeValue(writer, v);
                }
            }
        };
    };

    static encodeAddNodesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ParentNodeId.encode(writer);
        obj.ReferenceTypeId.encode(writer);
        obj.RequestedNewNodeId.encode(writer);
        obj.BrowseName.encode(writer);
        writer.writeUInt32(obj.NodeClass);
        obj.NodeAttributes.encode(writer);
        obj.TypeDefinition.encode(writer);
    };

    static encodeAddNodesResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        obj.AddedNodeId.encode(writer);
    };

    static encodeAddNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.NodesToAdd;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeAddNodesItem(writer, v);
                }
            }
        };
    };

    static encodeAddNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeAddNodesResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeAddReferencesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.SourceNodeId.encode(writer);
        obj.ReferenceTypeId.encode(writer);
        writer.writeBoolean(obj.IsForward);
        writer.writeString(obj.TargetServerUri);
        obj.TargetNodeId.encode(writer);
        writer.writeUInt32(obj.TargetNodeClass);
    };

    static encodeAddReferencesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.ReferencesToAdd;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeAddReferencesItem(writer, v);
                }
            }
        };
    };

    static encodeAddReferencesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeDeleteNodesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeBoolean(obj.DeleteTargetReferences);
    };

    static encodeDeleteNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.NodesToDelete;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeDeleteNodesItem(writer, v);
                }
            }
        };
    };

    static encodeDeleteNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeDeleteReferencesItem = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.SourceNodeId.encode(writer);
        obj.ReferenceTypeId.encode(writer);
        writer.writeBoolean(obj.IsForward);
        obj.TargetNodeId.encode(writer);
        writer.writeBoolean(obj.DeleteBidirectional);
    };

    static encodeDeleteReferencesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.ReferencesToDelete;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeDeleteReferencesItem(writer, v);
                }
            }
        };
    };

    static encodeDeleteReferencesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeViewDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ViewId.encode(writer);
        writer.writeDateTime(obj.Timestamp);
        writer.writeUInt32(obj.ViewVersion);
    };

    static encodeBrowseDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeUInt32(obj.BrowseDirection);
        obj.ReferenceTypeId.encode(writer);
        writer.writeBoolean(obj.IncludeSubtypes);
        writer.writeUInt32(obj.NodeClassMask);
        writer.writeUInt32(obj.ResultMask);
    };

    static encodeReferenceDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ReferenceTypeId.encode(writer);
        writer.writeBoolean(obj.IsForward);
        obj.NodeId.encode(writer);
        obj.BrowseName.encode(writer);
        obj.DisplayName.encode(writer);
        writer.writeUInt32(obj.NodeClass);
        obj.TypeDefinition.encode(writer);
    };

    static encodeBrowseResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        writer.writeByteString(obj.ContinuationPoint);
        {
            const arr = obj.References;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeReferenceDescription(writer, v);
                }
            }
        };
    };

    static encodeBrowseRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        BinaryEncoders.encodeViewDescription(writer, obj.View);
        writer.writeUInt32(obj.RequestedMaxReferencesPerNode);
        {
            const arr = obj.NodesToBrowse;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeBrowseDescription(writer, v);
                }
            }
        };
    };

    static encodeBrowseResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeBrowseResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeBrowseNextRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeBoolean(obj.ReleaseContinuationPoints);
        {
            const arr = obj.ContinuationPoints;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeByteString(v);
                }
            }
        };
    };

    static encodeBrowseNextResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeBrowseResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeRelativePathElement = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ReferenceTypeId.encode(writer);
        writer.writeBoolean(obj.IsInverse);
        writer.writeBoolean(obj.IncludeSubtypes);
        obj.TargetName.encode(writer);
    };

    static encodeRelativePath = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.Elements;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeRelativePathElement(writer, v);
                }
            }
        };
    };

    static encodeBrowsePath = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.StartingNode.encode(writer);
        BinaryEncoders.encodeRelativePath(writer, obj.RelativePath);
    };

    static encodeBrowsePathTarget = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.TargetId.encode(writer);
        writer.writeUInt32(obj.RemainingPathIndex);
    };

    static encodeBrowsePathResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        {
            const arr = obj.Targets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeBrowsePathTarget(writer, v);
                }
            }
        };
    };

    static encodeTranslateBrowsePathsToNodeIdsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.BrowsePaths;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeBrowsePath(writer, v);
                }
            }
        };
    };

    static encodeTranslateBrowsePathsToNodeIdsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeBrowsePathResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeRegisterNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.NodesToRegister;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeRegisterNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.RegisteredNodeIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeUnregisterNodesRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.NodesToUnregister;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeUnregisterNodesResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
    };

    static encodeEndpointConfiguration = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeInt32(obj.OperationTimeout);
        writer.writeBoolean(obj.UseBinaryEncoding);
        writer.writeInt32(obj.MaxStringLength);
        writer.writeInt32(obj.MaxByteStringLength);
        writer.writeInt32(obj.MaxArrayLength);
        writer.writeInt32(obj.MaxMessageSize);
        writer.writeInt32(obj.MaxBufferSize);
        writer.writeInt32(obj.ChannelLifetime);
        writer.writeInt32(obj.SecurityTokenLifetime);
    };

    static encodeQueryDataDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRelativePath(writer, obj.RelativePath);
        writer.writeUInt32(obj.AttributeId);
        writer.writeString(obj.IndexRange);
    };

    static encodeNodeTypeDescription = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.TypeDefinitionNode.encode(writer);
        writer.writeBoolean(obj.IncludeSubTypes);
        {
            const arr = obj.DataToReturn;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeQueryDataDescription(writer, v);
                }
            }
        };
    };

    static encodeQueryDataSet = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        obj.TypeDefinitionNode.encode(writer);
        {
            const arr = obj.Values;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeNodeReference = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        obj.ReferenceTypeId.encode(writer);
        writer.writeBoolean(obj.IsForward);
        {
            const arr = obj.ReferencedNodeIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeContentFilterElement = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.FilterOperator);
        {
            const arr = obj.FilterOperands;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeContentFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.Elements;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeContentFilterElement(writer, v);
                }
            }
        };
    };

    static encodeFilterOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeElementOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.Index);
    };

    static encodeLiteralOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Value.encode(writer);
    };

    static encodeAttributeOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeString(obj.Alias);
        BinaryEncoders.encodeRelativePath(writer, obj.BrowsePath);
        writer.writeUInt32(obj.AttributeId);
        writer.writeString(obj.IndexRange);
    };

    static encodeSimpleAttributeOperand = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.TypeDefinitionId.encode(writer);
        {
            const arr = obj.BrowsePath;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        writer.writeUInt32(obj.AttributeId);
        writer.writeString(obj.IndexRange);
    };

    static encodeContentFilterElementResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        {
            const arr = obj.OperandStatusCodes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.OperandDiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeContentFilterResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.ElementResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeContentFilterElementResult(writer, v);
                }
            }
        };
        {
            const arr = obj.ElementDiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeParsingResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        {
            const arr = obj.DataStatusCodes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DataDiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeQueryFirstRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        BinaryEncoders.encodeViewDescription(writer, obj.View);
        {
            const arr = obj.NodeTypes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeNodeTypeDescription(writer, v);
                }
            }
        };
        BinaryEncoders.encodeContentFilter(writer, obj.Filter);
        writer.writeUInt32(obj.MaxDataSetsToReturn);
        writer.writeUInt32(obj.MaxReferencesToReturn);
    };

    static encodeQueryFirstResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.QueryDataSets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeQueryDataSet(writer, v);
                }
            }
        };
        writer.writeByteString(obj.ContinuationPoint);
        {
            const arr = obj.ParsingResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeParsingResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        BinaryEncoders.encodeContentFilterResult(writer, obj.FilterResult);
    };

    static encodeQueryNextRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeBoolean(obj.ReleaseContinuationPoint);
        writer.writeByteString(obj.ContinuationPoint);
    };

    static encodeQueryNextResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.QueryDataSets;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeQueryDataSet(writer, v);
                }
            }
        };
        writer.writeByteString(obj.RevisedContinuationPoint);
    };

    static encodeReadValueId = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeUInt32(obj.AttributeId);
        writer.writeString(obj.IndexRange);
        obj.DataEncoding.encode(writer);
    };

    static encodeReadRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeFloat64(obj.MaxAge);
        writer.writeUInt32(obj.TimestampsToReturn);
        {
            const arr = obj.NodesToRead;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeReadValueId(writer, v);
                }
            }
        };
    };

    static encodeReadResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeHistoryReadValueId = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeString(obj.IndexRange);
        obj.DataEncoding.encode(writer);
        writer.writeByteString(obj.ContinuationPoint);
    };

    static encodeHistoryReadResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        writer.writeByteString(obj.ContinuationPoint);
        obj.HistoryData.encode(writer);
    };

    static encodeHistoryReadDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeReadEventDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.NumValuesPerNode);
        writer.writeDateTime(obj.StartTime);
        writer.writeDateTime(obj.EndTime);
        BinaryEncoders.encodeEventFilter(writer, obj.Filter);
    };

    static encodeReadEventDetails2 = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.ReadModified);
    };

    static encodeSortRuleElement = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.SortOrder);
        BinaryEncoders.encodeSimpleAttributeOperand(writer, obj.EventField);
    };

    static encodeReadEventDetailsSorted = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.SortClause;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSortRuleElement(writer, v);
                }
            }
        };
    };

    static encodeReadRawModifiedDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.IsReadModified);
        writer.writeDateTime(obj.StartTime);
        writer.writeDateTime(obj.EndTime);
        writer.writeUInt32(obj.NumValuesPerNode);
        writer.writeBoolean(obj.ReturnBounds);
    };

    static encodeReadProcessedDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeDateTime(obj.StartTime);
        writer.writeDateTime(obj.EndTime);
        writer.writeFloat64(obj.ProcessingInterval);
        {
            const arr = obj.AggregateType;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        BinaryEncoders.encodeAggregateConfiguration(writer, obj.AggregateConfiguration);
    };

    static encodeReadAtTimeDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.ReqTimes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeDateTime(v);
                }
            }
        };
        writer.writeBoolean(obj.UseSimpleBounds);
    };

    static encodeReadAnnotationDataDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.ReqTimes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeDateTime(v);
                }
            }
        };
    };

    static encodeHistoryData = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.DataValues;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeModificationInfo = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeDateTime(obj.ModificationTime);
        writer.writeUInt32(obj.UpdateType);
        writer.writeString(obj.UserName);
    };

    static encodeHistoryModifiedData = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.ModificationInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeModificationInfo(writer, v);
                }
            }
        };
    };

    static encodeHistoryEvent = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.Events;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeHistoryEventFieldList(writer, v);
                }
            }
        };
    };

    static encodeHistoryModifiedEvent = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.ModificationInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeModificationInfo(writer, v);
                }
            }
        };
    };

    static encodeHistoryReadRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        obj.HistoryReadDetails.encode(writer);
        writer.writeUInt32(obj.TimestampsToReturn);
        writer.writeBoolean(obj.ReleaseContinuationPoints);
        {
            const arr = obj.NodesToRead;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeHistoryReadValueId(writer, v);
                }
            }
        };
    };

    static encodeHistoryReadResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeHistoryReadResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeWriteValue = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeUInt32(obj.AttributeId);
        writer.writeString(obj.IndexRange);
        obj.Value.encode(writer);
    };

    static encodeWriteRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.NodesToWrite;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeWriteValue(writer, v);
                }
            }
        };
    };

    static encodeWriteResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeHistoryUpdateDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        // Abstract type - no fields to encode
    };

    static encodeUpdateDataDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeUInt32(obj.PerformInsertReplace);
        {
            const arr = obj.UpdateValues;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeUpdateStructureDataDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeUInt32(obj.PerformInsertReplace);
        {
            const arr = obj.UpdateValues;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeUpdateEventDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeUInt32(obj.PerformInsertReplace);
        BinaryEncoders.encodeEventFilter(writer, obj.Filter);
        {
            const arr = obj.EventData;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeHistoryEventFieldList(writer, v);
                }
            }
        };
    };

    static encodeDeleteRawModifiedDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        writer.writeBoolean(obj.IsDeleteModified);
        writer.writeDateTime(obj.StartTime);
        writer.writeDateTime(obj.EndTime);
    };

    static encodeDeleteAtTimeDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        {
            const arr = obj.ReqTimes;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeDateTime(v);
                }
            }
        };
    };

    static encodeDeleteEventDetails = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.NodeId.encode(writer);
        {
            const arr = obj.EventIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeByteString(v);
                }
            }
        };
    };

    static encodeHistoryUpdateResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        {
            const arr = obj.OperationResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeHistoryUpdateRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.HistoryUpdateDetails;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeHistoryUpdateResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeHistoryUpdateResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeCallMethodRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.ObjectId.encode(writer);
        obj.MethodId.encode(writer);
        {
            const arr = obj.InputArguments;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeCallMethodResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        {
            const arr = obj.InputArgumentResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.InputArgumentDiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        {
            const arr = obj.OutputArguments;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeCallRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.MethodsToCall;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeCallMethodRequest(writer, v);
                }
            }
        };
    };

    static encodeCallResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeCallMethodResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeDataChangeFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.Trigger);
        writer.writeUInt32(obj.DeadbandType);
        writer.writeFloat64(obj.DeadbandValue);
    };

    static encodeEventFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.SelectClauses;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSimpleAttributeOperand(writer, v);
                }
            }
        };
        BinaryEncoders.encodeContentFilter(writer, obj.WhereClause);
    };

    static encodeAggregateConfiguration = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeBoolean(obj.UseServerCapabilitiesDefaults);
        writer.writeBoolean(obj.TreatUncertainAsBad);
        writer.writeUint8(obj.PercentDataBad);
        writer.writeUint8(obj.PercentDataGood);
        writer.writeBoolean(obj.UseSlopedExtrapolation);
    };

    static encodeAggregateFilter = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeDateTime(obj.StartTime);
        obj.AggregateType.encode(writer);
        writer.writeFloat64(obj.ProcessingInterval);
        BinaryEncoders.encodeAggregateConfiguration(writer, obj.AggregateConfiguration);
    };

    static encodeEventFilterResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.SelectClauseResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.SelectClauseDiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        BinaryEncoders.encodeContentFilterResult(writer, obj.WhereClauseResult);
    };

    static encodeAggregateFilterResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeDateTime(obj.RevisedStartTime);
        writer.writeFloat64(obj.RevisedProcessingInterval);
        BinaryEncoders.encodeAggregateConfiguration(writer, obj.RevisedAggregateConfiguration);
    };

    static encodeMonitoringParameters = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.ClientHandle);
        writer.writeFloat64(obj.SamplingInterval);
        obj.Filter.encode(writer);
        writer.writeUInt32(obj.QueueSize);
        writer.writeBoolean(obj.DiscardOldest);
    };

    static encodeMonitoredItemCreateRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeReadValueId(writer, obj.ItemToMonitor);
        writer.writeUInt32(obj.MonitoringMode);
        BinaryEncoders.encodeMonitoringParameters(writer, obj.RequestedParameters);
    };

    static encodeMonitoredItemCreateResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        writer.writeUInt32(obj.MonitoredItemId);
        writer.writeFloat64(obj.RevisedSamplingInterval);
        writer.writeUInt32(obj.RevisedQueueSize);
        obj.FilterResult.encode(writer);
    };

    static encodeCreateMonitoredItemsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeUInt32(obj.TimestampsToReturn);
        {
            const arr = obj.ItemsToCreate;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeMonitoredItemCreateRequest(writer, v);
                }
            }
        };
    };

    static encodeCreateMonitoredItemsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeMonitoredItemCreateResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeMonitoredItemModifyRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.MonitoredItemId);
        BinaryEncoders.encodeMonitoringParameters(writer, obj.RequestedParameters);
    };

    static encodeMonitoredItemModifyResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        writer.writeFloat64(obj.RevisedSamplingInterval);
        writer.writeUInt32(obj.RevisedQueueSize);
        obj.FilterResult.encode(writer);
    };

    static encodeModifyMonitoredItemsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeUInt32(obj.TimestampsToReturn);
        {
            const arr = obj.ItemsToModify;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeMonitoredItemModifyRequest(writer, v);
                }
            }
        };
    };

    static encodeModifyMonitoredItemsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeMonitoredItemModifyResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeSetMonitoringModeRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeUInt32(obj.MonitoringMode);
        {
            const arr = obj.MonitoredItemIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
    };

    static encodeSetMonitoringModeResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeSetTriggeringRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeUInt32(obj.TriggeringItemId);
        {
            const arr = obj.LinksToAdd;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        {
            const arr = obj.LinksToRemove;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
    };

    static encodeSetTriggeringResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.AddResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.AddDiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        {
            const arr = obj.RemoveResults;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.RemoveDiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeDeleteMonitoredItemsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.SubscriptionId);
        {
            const arr = obj.MonitoredItemIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
    };

    static encodeDeleteMonitoredItemsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeCreateSubscriptionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeFloat64(obj.RequestedPublishingInterval);
        writer.writeUInt32(obj.RequestedLifetimeCount);
        writer.writeUInt32(obj.RequestedMaxKeepAliveCount);
        writer.writeUInt32(obj.MaxNotificationsPerPublish);
        writer.writeBoolean(obj.PublishingEnabled);
        writer.writeUint8(obj.Priority);
    };

    static encodeCreateSubscriptionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeFloat64(obj.RevisedPublishingInterval);
        writer.writeUInt32(obj.RevisedLifetimeCount);
        writer.writeUInt32(obj.RevisedMaxKeepAliveCount);
    };

    static encodeModifySubscriptionRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeFloat64(obj.RequestedPublishingInterval);
        writer.writeUInt32(obj.RequestedLifetimeCount);
        writer.writeUInt32(obj.RequestedMaxKeepAliveCount);
        writer.writeUInt32(obj.MaxNotificationsPerPublish);
        writer.writeUint8(obj.Priority);
    };

    static encodeModifySubscriptionResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        writer.writeFloat64(obj.RevisedPublishingInterval);
        writer.writeUInt32(obj.RevisedLifetimeCount);
        writer.writeUInt32(obj.RevisedMaxKeepAliveCount);
    };

    static encodeSetPublishingModeRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeBoolean(obj.PublishingEnabled);
        {
            const arr = obj.SubscriptionIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
    };

    static encodeSetPublishingModeResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeNotificationMessage = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.SequenceNumber);
        writer.writeDateTime(obj.PublishTime);
        {
            const arr = obj.NotificationData;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeDataChangeNotification = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.MonitoredItems;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeMonitoredItemNotification(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeMonitoredItemNotification = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.ClientHandle);
        obj.Value.encode(writer);
    };

    static encodeEventNotificationList = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.Events;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEventFieldList(writer, v);
                }
            }
        };
    };

    static encodeEventFieldList = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.ClientHandle);
        {
            const arr = obj.EventFields;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeHistoryEventFieldList = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.EventFields;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeStatusChangeNotification = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.Status);
        obj.DiagnosticInfo.encode(writer);
    };

    static encodeSubscriptionAcknowledgement = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeUInt32(obj.SequenceNumber);
    };

    static encodePublishRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.SubscriptionAcknowledgements;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeSubscriptionAcknowledgement(writer, v);
                }
            }
        };
    };

    static encodePublishResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        writer.writeUInt32(obj.SubscriptionId);
        {
            const arr = obj.AvailableSequenceNumbers;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeBoolean(obj.MoreNotifications);
        BinaryEncoders.encodeNotificationMessage(writer, obj.NotificationMessage);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeRepublishRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeUInt32(obj.RetransmitSequenceNumber);
    };

    static encodeRepublishResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        BinaryEncoders.encodeNotificationMessage(writer, obj.NotificationMessage);
    };

    static encodeTransferResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        {
            const arr = obj.AvailableSequenceNumbers;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
    };

    static encodeTransferSubscriptionsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.SubscriptionIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
        writer.writeBoolean(obj.SendInitialValues);
    };

    static encodeTransferSubscriptionsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeTransferResult(writer, v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeDeleteSubscriptionsRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        {
            const arr = obj.SubscriptionIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeUInt32(v);
                }
            }
        };
    };

    static encodeDeleteSubscriptionsResponse = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeResponseHeader(writer, obj.ResponseHeader);
        {
            const arr = obj.Results;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeStatusCode(v);
                }
            }
        };
        {
            const arr = obj.DiagnosticInfos;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
    };

    static encodeBuildInfo = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ProductUri);
        writer.writeString(obj.ManufacturerName);
        writer.writeString(obj.ProductName);
        writer.writeString(obj.SoftwareVersion);
        writer.writeString(obj.BuildNumber);
        writer.writeDateTime(obj.BuildDate);
    };

    static encodeRedundantServerDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ServerId);
        writer.writeUint8(obj.ServiceLevel);
        writer.writeUInt32(obj.ServerState);
    };

    static encodeEndpointUrlListDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        {
            const arr = obj.EndpointUrlList;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
    };

    static encodeNetworkGroupDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.ServerUri);
        {
            const arr = obj.NetworkPaths;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeEndpointUrlListDataType(writer, v);
                }
            }
        };
    };

    static encodeSamplingIntervalDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat64(obj.SamplingInterval);
        writer.writeUInt32(obj.MonitoredItemCount);
        writer.writeUInt32(obj.MaxMonitoredItemCount);
        writer.writeUInt32(obj.DisabledMonitoredItemCount);
    };

    static encodeServerDiagnosticsSummaryDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.ServerViewCount);
        writer.writeUInt32(obj.CurrentSessionCount);
        writer.writeUInt32(obj.CumulatedSessionCount);
        writer.writeUInt32(obj.SecurityRejectedSessionCount);
        writer.writeUInt32(obj.RejectedSessionCount);
        writer.writeUInt32(obj.SessionTimeoutCount);
        writer.writeUInt32(obj.SessionAbortCount);
        writer.writeUInt32(obj.CurrentSubscriptionCount);
        writer.writeUInt32(obj.CumulatedSubscriptionCount);
        writer.writeUInt32(obj.PublishingIntervalCount);
        writer.writeUInt32(obj.SecurityRejectedRequestsCount);
        writer.writeUInt32(obj.RejectedRequestsCount);
    };

    static encodeServerStatusDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeDateTime(obj.StartTime);
        writer.writeDateTime(obj.CurrentTime);
        writer.writeUInt32(obj.State);
        BinaryEncoders.encodeBuildInfo(writer, obj.BuildInfo);
        writer.writeUInt32(obj.SecondsTillShutdown);
        obj.ShutdownReason.encode(writer);
    };

    static encodeSessionDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.SessionId.encode(writer);
        writer.writeString(obj.SessionName);
        BinaryEncoders.encodeApplicationDescription(writer, obj.ClientDescription);
        writer.writeString(obj.ServerUri);
        writer.writeString(obj.EndpointUrl);
        {
            const arr = obj.LocaleIds;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeFloat64(obj.ActualSessionTimeout);
        writer.writeUInt32(obj.MaxResponseMessageSize);
        writer.writeDateTime(obj.ClientConnectionTime);
        writer.writeDateTime(obj.ClientLastContactTime);
        writer.writeUInt32(obj.CurrentSubscriptionsCount);
        writer.writeUInt32(obj.CurrentMonitoredItemsCount);
        writer.writeUInt32(obj.CurrentPublishRequestsInQueue);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.TotalRequestCount);
        writer.writeUInt32(obj.UnauthorizedRequestCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.ReadCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.HistoryReadCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.WriteCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.HistoryUpdateCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.CallCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.CreateMonitoredItemsCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.ModifyMonitoredItemsCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.SetMonitoringModeCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.SetTriggeringCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.DeleteMonitoredItemsCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.CreateSubscriptionCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.ModifySubscriptionCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.SetPublishingModeCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.PublishCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.RepublishCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.TransferSubscriptionsCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.DeleteSubscriptionsCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.AddNodesCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.AddReferencesCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.DeleteNodesCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.DeleteReferencesCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.BrowseCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.BrowseNextCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.TranslateBrowsePathsToNodeIdsCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.QueryFirstCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.QueryNextCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.RegisterNodesCount);
        BinaryEncoders.encodeServiceCounterDataType(writer, obj.UnregisterNodesCount);
    };

    static encodeSessionSecurityDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.SessionId.encode(writer);
        writer.writeString(obj.ClientUserIdOfSession);
        {
            const arr = obj.ClientUserIdHistory;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeString(v);
                }
            }
        };
        writer.writeString(obj.AuthenticationMechanism);
        writer.writeString(obj.Encoding);
        writer.writeString(obj.TransportProtocol);
        writer.writeUInt32(obj.SecurityMode);
        writer.writeString(obj.SecurityPolicyUri);
        writer.writeByteString(obj.ClientCertificate);
    };

    static encodeServiceCounterDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeUInt32(obj.TotalCount);
        writer.writeUInt32(obj.ErrorCount);
    };

    static encodeStatusResult = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeStatusCode(obj.StatusCode);
        obj.DiagnosticInfo.encode(writer);
    };

    static encodeSubscriptionDiagnosticsDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.SessionId.encode(writer);
        writer.writeUInt32(obj.SubscriptionId);
        writer.writeUint8(obj.Priority);
        writer.writeFloat64(obj.PublishingInterval);
        writer.writeUInt32(obj.MaxKeepAliveCount);
        writer.writeUInt32(obj.MaxLifetimeCount);
        writer.writeUInt32(obj.MaxNotificationsPerPublish);
        writer.writeBoolean(obj.PublishingEnabled);
        writer.writeUInt32(obj.ModifyCount);
        writer.writeUInt32(obj.EnableCount);
        writer.writeUInt32(obj.DisableCount);
        writer.writeUInt32(obj.RepublishRequestCount);
        writer.writeUInt32(obj.RepublishMessageRequestCount);
        writer.writeUInt32(obj.RepublishMessageCount);
        writer.writeUInt32(obj.TransferRequestCount);
        writer.writeUInt32(obj.TransferredToAltClientCount);
        writer.writeUInt32(obj.TransferredToSameClientCount);
        writer.writeUInt32(obj.PublishRequestCount);
        writer.writeUInt32(obj.DataChangeNotificationsCount);
        writer.writeUInt32(obj.EventNotificationsCount);
        writer.writeUInt32(obj.NotificationsCount);
        writer.writeUInt32(obj.LatePublishRequestCount);
        writer.writeUInt32(obj.CurrentKeepAliveCount);
        writer.writeUInt32(obj.CurrentLifetimeCount);
        writer.writeUInt32(obj.UnacknowledgedMessageCount);
        writer.writeUInt32(obj.DiscardedMessageCount);
        writer.writeUInt32(obj.MonitoredItemCount);
        writer.writeUInt32(obj.DisabledMonitoredItemCount);
        writer.writeUInt32(obj.MonitoringQueueOverflowCount);
        writer.writeUInt32(obj.NextSequenceNumber);
        writer.writeUInt32(obj.EventQueueOverflowCount);
    };

    static encodeModelChangeStructureDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Affected.encode(writer);
        obj.AffectedType.encode(writer);
        writer.writeUint8(obj.Verb);
    };

    static encodeSemanticChangeStructureDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.Affected.encode(writer);
        obj.AffectedType.encode(writer);
    };

    static encodeRange = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat64(obj.Low);
        writer.writeFloat64(obj.High);
    };

    static encodeEUInformation = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.NamespaceUri);
        writer.writeInt32(obj.UnitId);
        obj.DisplayName.encode(writer);
        obj.Description.encode(writer);
    };

    static encodeComplexNumberType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat32(obj.Real);
        writer.writeFloat32(obj.Imaginary);
    };

    static encodeDoubleComplexNumberType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat64(obj.Real);
        writer.writeFloat64(obj.Imaginary);
    };

    static encodeAxisInformation = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeEUInformation(writer, obj.EngineeringUnits);
        BinaryEncoders.encodeRange(writer, obj.EURange);
        obj.Title.encode(writer);
        writer.writeUInt32(obj.AxisScaleType);
        {
            const arr = obj.AxisSteps;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    writer.writeFloat64(v);
                }
            }
        };
    };

    static encodeXVType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeFloat64(obj.X);
        writer.writeFloat32(obj.Value);
    };

    static encodeProgramDiagnosticDataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.CreateSessionId.encode(writer);
        writer.writeString(obj.CreateClientName);
        writer.writeDateTime(obj.InvocationCreationTime);
        writer.writeDateTime(obj.LastTransitionTime);
        writer.writeString(obj.LastMethodCall);
        obj.LastMethodSessionId.encode(writer);
        {
            const arr = obj.LastMethodInputArguments;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeArgument(writer, v);
                }
            }
        };
        {
            const arr = obj.LastMethodOutputArguments;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeArgument(writer, v);
                }
            }
        };
        writer.writeDateTime(obj.LastMethodCallTime);
        BinaryEncoders.encodeStatusResult(writer, obj.LastMethodReturnStatus);
    };

    static encodeProgramDiagnostic2DataType = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        obj.CreateSessionId.encode(writer);
        writer.writeString(obj.CreateClientName);
        writer.writeDateTime(obj.InvocationCreationTime);
        writer.writeDateTime(obj.LastTransitionTime);
        writer.writeString(obj.LastMethodCall);
        obj.LastMethodSessionId.encode(writer);
        {
            const arr = obj.LastMethodInputArguments;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeArgument(writer, v);
                }
            }
        };
        {
            const arr = obj.LastMethodOutputArguments;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    BinaryEncoders.encodeArgument(writer, v);
                }
            }
        };
        {
            const arr = obj.LastMethodInputValues;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        {
            const arr = obj.LastMethodOutputValues;
            if (arr === null || arr === undefined) {
                writer.writeInt32(-1);
            } else {
                writer.writeInt32(arr.length);
                for (const v of arr) {
                    v.encode(writer);
                }
            }
        };
        writer.writeDateTime(obj.LastMethodCallTime);
        writer.writeStatusCode(obj.LastMethodReturnStatus);
    };

    static encodeAnnotation = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        writer.writeString(obj.Message);
        writer.writeString(obj.UserName);
        writer.writeDateTime(obj.AnnotationTime);
    };

}