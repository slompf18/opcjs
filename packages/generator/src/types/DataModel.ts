export interface ParsedEnumMember {
  name: string;
  value: number;
}

export interface ParsedField {
  /** camelCase field name */
  name: string;
  /** OPC UA DataType NodeId, e.g. "i=12" or "i=308" */
  dataTypeNodeId: string;
  /** True when ValueRank >= 1 (array) */
  isArray: boolean;
  /** True when IsOptional="true" */
  isOptional: boolean;
}

export interface ParsedType {
  nodeId: string;
  browseName: string;
  safeName: string;
  category: 'enumeration' | 'structure' | 'abstract';
  isAbstract: boolean;
  parentNodeId?: string;
  enumMembers?: ParsedEnumMember[];
  /** Numeric type ID from NodeIds.csv (e.g. KeyValuePair → 14533) */
  typeId?: number;
  /** Binary encoding ID from NodeIds.csv (TypeName_Encoding_DefaultBinary) */
  binaryEncodingId?: number;
  /** XML encoding ID from NodeIds.csv (TypeName_Encoding_DefaultXml) */
  xmlEncodingId?: number;
  /** JSON encoding ID from NodeIds.csv (TypeName_Encoding_DefaultJson) */
  jsonEncodingId?: number;
  /** Struct fields extracted from Definition/Field elements */
  fields?: ParsedField[];
}

export interface ParsedDataModel {
  types: ParsedType[];
  /**
   * Maps alias NodeId strings (e.g. `"i=388"`) to the **built-in nodeId** they
   * ultimately resolve to (e.g. `"i=17"` for SessionAuthenticationToken which
   * subtypes NodeId).  Used by encoder/decoder templates for precise codec
   * method selection.
   */
  builtinAliases: ReadonlyMap<string, string>;
  /**
   * Maps alias NodeId strings (e.g. `"i=388"`) to their TypeScript type name
   * (e.g. `"NodeId"`).  Used to seed the nodeId → TS name map for struct
   * field type generation.
   */
  builtinAliasToTs: ReadonlyMap<string, string>;
}
