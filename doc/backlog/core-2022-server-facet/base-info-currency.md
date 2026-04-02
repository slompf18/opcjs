# Base Info Currency

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support the `CurrencyUnit` Property on DataVariables that represent currency values. This property uses the `CurrencyUnitType` DataType, which carries the ISO 4217 numeric code, exponent, alphabetic code, and display name of the currency.

**Server responsibilities**:
- Add a `CurrencyUnit` Property (of type `CurrencyUnitType`, `i=23498`) to any Variable that represents a monetary value.
- Populate the property with the correct ISO 4217 currency information.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 | §B.9 | CurrencyUnitType |
| profiles.opcfoundation.org | [CU 5240](https://profiles.opcfoundation.org/conformanceunit/5240) | Base Info Currency |
