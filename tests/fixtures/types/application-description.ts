/**
 * @fileoverview ApplicationDescription - Example custom type for extensibility testing
 * @module tests/fixtures/types/application-description
 * 
 * This is a simplified ApplicationDescription type used to demonstrate the
 * extensible codec registration pattern. Real implementations would come from
 * the NodeSet compiler.
 */

import { CodecFacade } from '../../../src/codec/facade.js';
import { EncodingFormat } from '../../../src/codec/types.js';
import { IEncoder } from '../../../src/codec/interfaces/encoder.js';
import { IDecoder } from '../../../src/codec/interfaces/decoder.js';

/**
 * ApplicationType enumeration (simplified)
 */
export enum ApplicationType {
  Server = 0,
  Client = 1,
  ClientAndServer = 2,
  DiscoveryServer = 3,
}

/**
 * ApplicationDescription structure (simplified version)
 * 
 * This demonstrates a complex type with multiple fields that can be
 * registered with the codec facade using the same API as builtin types.
 */
export interface ApplicationDescription {
  applicationUri: string;
  productUri: string;
  applicationName: string;
  applicationType: ApplicationType;
  gatewayServerUri: string;
  discoveryUrls: string[];
}

/**
 * Create a new ApplicationDescription instance with default values
 */
export function createApplicationDescription(
  partial?: Partial<ApplicationDescription>
): ApplicationDescription {
  return {
    applicationUri: '',
    productUri: '',
    applicationName: '',
    applicationType: ApplicationType.Server,
    gatewayServerUri: '',
    discoveryUrls: [],
    ...partial,
  };
}

/**
 * Binary encoder for ApplicationDescription
 * Follows OPC UA binary encoding rules: field-by-field encoding
 */
function encodeBinary(encoder: IEncoder, value: ApplicationDescription): void {
  encoder.writeString(value.applicationUri);
  encoder.writeString(value.productUri);
  encoder.writeString(value.applicationName);
  encoder.writeInt32(value.applicationType);
  encoder.writeString(value.gatewayServerUri);
  encoder.writeArray(value.discoveryUrls, (enc, url) => enc.writeString(url));
}

/**
 * Binary decoder for ApplicationDescription
 */
function decodeBinary(decoder: IDecoder): ApplicationDescription {
  return {
    applicationUri: decoder.readString()!,
    productUri: decoder.readString()!,
    applicationName: decoder.readString()!,
    applicationType: decoder.readInt32(),
    gatewayServerUri: decoder.readString()!,
    discoveryUrls: decoder.readArray((dec) => dec.readString()!) || [],
  };
}

/**
 * XML encoder for ApplicationDescription
 * Follows OPC UA XML encoding rules: one element per field
 */
function encodeXml(encoder: any, value: ApplicationDescription): void {
  encoder.startElement('ApplicationDescription');
  
  encoder.startElement('ApplicationUri');
  encoder.encodeString(value.applicationUri);
  encoder.endElement();
  
  encoder.startElement('ProductUri');
  encoder.encodeString(value.productUri);
  encoder.endElement();
  
  encoder.startElement('ApplicationName');
  encoder.encodeString(value.applicationName);
  encoder.endElement();
  
  encoder.startElement('ApplicationType');
  encoder.encodeInt32(value.applicationType);
  encoder.endElement();
  
  encoder.startElement('GatewayServerUri');
  encoder.encodeString(value.gatewayServerUri);
  encoder.endElement();
  
  // Encode discoveryUrls array
  encoder.startElement('ListOfDiscoveryUrl');
  for (const url of value.discoveryUrls) {
    encoder.startElement('String');
    encoder.encodeString(url);
    encoder.endElement();
  }
  encoder.endElement();
  
  encoder.endElement();
}

/**
 * XML decoder for ApplicationDescription
 */
function decodeXml(decoder: any): ApplicationDescription {
  decoder.startElement('ApplicationDescription');
  
  decoder.startElement('ApplicationUri');
  const applicationUri = decoder.decodeString();
  decoder.endElement();
  
  decoder.startElement('ProductUri');
  const productUri = decoder.decodeString();
  decoder.endElement();
  
  decoder.startElement('ApplicationName');
  const applicationName = decoder.decodeString();
  decoder.endElement();
  
  decoder.startElement('ApplicationType');
  const applicationType = decoder.decodeInt32();
  decoder.endElement();
  
  decoder.startElement('GatewayServerUri');
  const gatewayServerUri = decoder.decodeString();
  decoder.endElement();
  
  // Decode discoveryUrls array
  decoder.startElement('ListOfDiscoveryUrl');
  const discoveryUrls: string[] = [];
  // For simplicity, try to read String elements, catch error when done
  try {
    while (true) {
      decoder.startElement('String');
      discoveryUrls.push(decoder.decodeString());
      decoder.endElement();
    }
  } catch {
    // No more String elements
  }
  decoder.endElement();
  
  decoder.endElement();
  
  return {
    applicationUri,
    productUri,
    applicationName,
    applicationType,
    gatewayServerUri,
    discoveryUrls,
  };
}

/**
 * JSON encoder for ApplicationDescription
 * Follows OPC UA JSON encoding rules: object with field names
 */
function encodeJson(encoder: any, value: ApplicationDescription): void {
  const obj: any = {
    ApplicationUri: value.applicationUri,
    ProductUri: value.productUri,
    ApplicationName: value.applicationName,
    ApplicationType: value.applicationType,
    GatewayServerUri: value.gatewayServerUri,
    DiscoveryUrls: value.discoveryUrls,
  };
  encoder.setValue(obj);
}

/**
 * JSON decoder for ApplicationDescription
 */
function decodeJson(decoder: any): ApplicationDescription {
  const obj = decoder.getValue();
  return {
    applicationUri: obj.ApplicationUri || '',
    productUri: obj.ProductUri || '',
    applicationName: obj.ApplicationName || '',
    applicationType: obj.ApplicationType || ApplicationType.Server,
    gatewayServerUri: obj.GatewayServerUri || '',
    discoveryUrls: obj.DiscoveryUrls || [],
  };
}

/**
 * Register ApplicationDescription with the codec facade.
 * 
 * This demonstrates the unified registration pattern - custom types use the
 * same API as builtin types. The encoding IDs are typically assigned from
 * NodeIds.csv but here we use placeholder values.
 * 
 * @param facade The codec facade to register with
 * 
 * @example
 * ```typescript
 * const facade = new CodecFacade();
 * registerApplicationDescription(facade);
 * 
 * const app: ApplicationDescription = {
 *   applicationUri: 'urn:myapp',
 *   productUri: 'urn:myproduct',
 *   applicationName: 'My Application',
 *   applicationType: ApplicationType.Server,
 *   gatewayServerUri: '',
 *   discoveryUrls: ['opc.tcp://localhost:4840'],
 * };
 * 
 * const binary = facade.encode(app, 'i=298'); // Binary encoding ID
 * const decoded = facade.decode<ApplicationDescription>(binary, 'i=298');
 * ```
 */
export function registerApplicationDescription(facade: CodecFacade): void {
  // Register binary encoding (OPC UA encoding ID for ApplicationDescription is i=298)
  facade.registerType<ApplicationDescription>(
    'ApplicationDescription',
    'i=298',
    EncodingFormat.Binary,
    encodeBinary,
    decodeBinary
  );

  // Register XML encoding (OPC UA encoding ID is i=299)
  facade.registerType<ApplicationDescription>(
    'ApplicationDescription',
    'i=299',
    EncodingFormat.Xml,
    encodeXml,
    decodeXml
  );

  // Register JSON encoding (OPC UA encoding ID is i=15634)
  facade.registerType<ApplicationDescription>(
    'ApplicationDescription',
    'i=15634',
    EncodingFormat.Json,
    encodeJson,
    decodeJson
  );
}
