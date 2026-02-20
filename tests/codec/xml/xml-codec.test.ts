/**
 * XML Codec Tests
 * 
 * Tests for XML encoding and decoding of OPC UA builtin types.
 * Validates compliance with OPC 10000-6 Section 5.3.
 */

import { describe, it, expect } from 'vitest';
import { XmlEncoder, XmlDecoder } from '../../../src/codec/xml';

describe('XML Encoder/Decoder', () => {
  describe('Boolean', () => {
    it('should encode true to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Boolean');
      encoder.encodeBoolean(true);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Boolean>true</Boolean>');
    });

    it('should encode false to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Boolean');
      encoder.encodeBoolean(false);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Boolean>false</Boolean>');
    });

    it('should decode true from XML', () => {
      const decoder = new XmlDecoder('<Boolean>true</Boolean>');
      decoder.startElement('Boolean');
      const value = decoder.decodeBoolean();
      expect(value).toBe(true);
    });

    it('should decode false from XML', () => {
      const decoder = new XmlDecoder('<Boolean>false</Boolean>');
      decoder.startElement('Boolean');
      const value = decoder.decodeBoolean();
      expect(value).toBe(false);
    });

    it('should round-trip Boolean values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Boolean');
      encoder.encodeBoolean(true);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Boolean');
      expect(decoder.decodeBoolean()).toBe(true);
    });
  });

  describe('Byte', () => {
    it('should encode Byte to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Byte');
      encoder.encodeByte(255);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Byte>255</Byte>');
    });

    it('should decode Byte from XML', () => {
      const decoder = new XmlDecoder('<Byte>128</Byte>');
      decoder.startElement('Byte');
      expect(decoder.decodeByte()).toBe(128);
    });

    it('should round-trip Byte values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Byte');
      encoder.encodeByte(42);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Byte');
      expect(decoder.decodeByte()).toBe(42);
    });

    it('should throw on Byte out of range', () => {
      const encoder = new XmlEncoder();
      expect(() => encoder.encodeByte(256)).toThrow('out of range');
      expect(() => encoder.encodeByte(-1)).toThrow('out of range');
    });
  });

  describe('SByte', () => {
    it('should encode SByte to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('SByte');
      encoder.encodeSByte(-128);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<SByte>-128</SByte>');
    });

    it('should decode SByte from XML', () => {
      const decoder = new XmlDecoder('<SByte>-42</SByte>');
      decoder.startElement('SByte');
      expect(decoder.decodeSByte()).toBe(-42);
    });

    it('should round-trip SByte values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('SByte');
      encoder.encodeSByte(127);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('SByte');
      expect(decoder.decodeSByte()).toBe(127);
    });
  });

  describe('Int16', () => {
    it('should encode Int16 to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Int16');
      encoder.encodeInt16(-32768);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Int16>-32768</Int16>');
    });

    it('should decode Int16 from XML', () => {
      const decoder = new XmlDecoder('<Int16>12345</Int16>');
      decoder.startElement('Int16');
      expect(decoder.decodeInt16()).toBe(12345);
    });

    it('should round-trip Int16 values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Int16');
      encoder.encodeInt16(32767);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Int16');
      expect(decoder.decodeInt16()).toBe(32767);
    });
  });

  describe('UInt16', () => {
    it('should encode UInt16 to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('UInt16');
      encoder.encodeUInt16(65535);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<UInt16>65535</UInt16>');
    });

    it('should decode UInt16 from XML', () => {
      const decoder = new XmlDecoder('<UInt16>1234</UInt16>');
      decoder.startElement('UInt16');
      expect(decoder.decodeUInt16()).toBe(1234);
    });

    it('should round-trip UInt16 values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('UInt16');
      encoder.encodeUInt16(32768);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('UInt16');
      expect(decoder.decodeUInt16()).toBe(32768);
    });
  });

  describe('Int32', () => {
    it('should encode Int32 to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Int32');
      encoder.encodeInt32(42);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Int32>42</Int32>');
    });

    it('should encode negative Int32 to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Int32');
      encoder.encodeInt32(-123);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Int32>-123</Int32>');
    });

    it('should decode Int32 from XML', () => {
      const decoder = new XmlDecoder('<Int32>42</Int32>');
      decoder.startElement('Int32');
      const value = decoder.decodeInt32();
      expect(value).toBe(42);
    });

    it('should round-trip Int32 values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Int32');
      encoder.encodeInt32(123456);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Int32');
      expect(decoder.decodeInt32()).toBe(123456);
    });
  });

  describe('UInt32', () => {
    it('should encode UInt32 to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('UInt32');
      encoder.encodeUInt32(4294967295);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<UInt32>4294967295</UInt32>');
    });

    it('should decode UInt32 from XML', () => {
      const decoder = new XmlDecoder('<UInt32>123456789</UInt32>');
      decoder.startElement('UInt32');
      expect(decoder.decodeUInt32()).toBe(123456789);
    });

    it('should round-trip UInt32 values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('UInt32');
      encoder.encodeUInt32(2147483648);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('UInt32');
      expect(decoder.decodeUInt32()).toBe(2147483648);
    });
  });

  describe('Int64', () => {
    it('should encode Int64 to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Int64');
      encoder.encodeInt64(-9223372036854775808n);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Int64>-9223372036854775808</Int64>');
    });

    it('should decode Int64 from XML', () => {
      const decoder = new XmlDecoder('<Int64>9223372036854775807</Int64>');
      decoder.startElement('Int64');
      expect(decoder.decodeInt64()).toBe(9223372036854775807n);
    });

    it('should round-trip Int64 values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Int64');
      encoder.encodeInt64(123456789012345n);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Int64');
      expect(decoder.decodeInt64()).toBe(123456789012345n);
    });
  });

  describe('UInt64', () => {
    it('should encode UInt64 to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('UInt64');
      encoder.encodeUInt64(18446744073709551615n);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<UInt64>18446744073709551615</UInt64>');
    });

    it('should decode UInt64 from XML', () => {
      const decoder = new XmlDecoder('<UInt64>9223372036854775808</UInt64>');
      decoder.startElement('UInt64');
      expect(decoder.decodeUInt64()).toBe(9223372036854775808n);
    });

    it('should round-trip UInt64 values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('UInt64');
      encoder.encodeUInt64(123456789012345n);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('UInt64');
      expect(decoder.decodeUInt64()).toBe(123456789012345n);
    });

    it('should throw on negative UInt64', () => {
      const encoder = new XmlEncoder();
      expect(() => encoder.encodeUInt64(-1n)).toThrow('cannot be negative');
    });
  });

  describe('String', () => {
    it('should encode String with XML escaping', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('String');
      encoder.encodeString('Hello <World> & "Friends"');
      encoder.endElement();
      expect(encoder.getXml()).toBe('<String>Hello &lt;World&gt; &amp; &quot;Friends&quot;</String>');
    });

    it('should decode String with XML unescaping', () => {
      const decoder = new XmlDecoder('<String>Hello &lt;World&gt; &amp; &quot;Friends&quot;</String>');
      decoder.startElement('String');
      const value = decoder.decodeString();
      expect(value).toBe('Hello <World> & "Friends"');
    });

    it('should encode null String as empty', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('String');
      encoder.encodeString(null);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<String></String>');
    });

    it('should decode empty String as null', () => {
      const decoder = new XmlDecoder('<String></String>');
      decoder.startElement('String');
      const value = decoder.decodeString();
      expect(value).toBe(null);
    });

    it('should round-trip String values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('String');
      encoder.encodeString('Test & <Data>');
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('String');
      expect(decoder.decodeString()).toBe('Test & <Data>');
    });
  });

  describe('Float', () => {
    it('should encode Float to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Float');
      encoder.encodeFloat(3.14159);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Float>3.14159</Float>');
    });

    it('should encode Float NaN to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Float');
      encoder.encodeFloat(NaN);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Float>NaN</Float>');
    });

    it('should encode Float Infinity to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Float');
      encoder.encodeFloat(Infinity);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Float>INF</Float>');
    });

    it('should encode Float -Infinity to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Float');
      encoder.encodeFloat(-Infinity);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Float>-INF</Float>');
    });

    it('should decode Float special values', () => {
      const decoderNaN = new XmlDecoder('<Float>NaN</Float>');
      decoderNaN.startElement('Float');
      expect(decoderNaN.decodeFloat()).toBeNaN();

      const decoderInf = new XmlDecoder('<Float>INF</Float>');
      decoderInf.startElement('Float');
      expect(decoderInf.decodeFloat()).toBe(Infinity);

      const decoderNegInf = new XmlDecoder('<Float>-INF</Float>');
      decoderNegInf.startElement('Float');
      expect(decoderNegInf.decodeFloat()).toBe(-Infinity);
    });

    it('should round-trip Float values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Float');
      encoder.encodeFloat(2.71828);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Float');
      expect(decoder.decodeFloat()).toBeCloseTo(2.71828, 5);
    });
  });

  describe('Double', () => {
    it('should encode Double to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Double');
      encoder.encodeDouble(3.141592653589793);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Double>3.141592653589793</Double>');
    });

    it('should encode Double NaN to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Double');
      encoder.encodeDouble(NaN);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Double>NaN</Double>');
    });

    it('should encode Double Infinity to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Double');
      encoder.encodeDouble(Infinity);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Double>INF</Double>');
    });

    it('should encode Double -Infinity to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Double');
      encoder.encodeDouble(-Infinity);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Double>-INF</Double>');
    });

    it('should decode Double special values', () => {
      const decoderNaN = new XmlDecoder('<Double>NaN</Double>');
      decoderNaN.startElement('Double');
      expect(decoderNaN.decodeDouble()).toBeNaN();

      const decoderInf = new XmlDecoder('<Double>INF</Double>');
      decoderInf.startElement('Double');
      expect(decoderInf.decodeDouble()).toBe(Infinity);

      const decoderNegInf = new XmlDecoder('<Double>-INF</Double>');
      decoderNegInf.startElement('Double');
      expect(decoderNegInf.decodeDouble()).toBe(-Infinity);
    });

    it('should round-trip Double values', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Double');
      encoder.encodeDouble(2.718281828459045);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Double');
      expect(decoder.decodeDouble()).toBeCloseTo(2.718281828459045, 15);
    });
  });

  describe('DateTime', () => {
    it('should encode DateTime to XML ISO 8601', () => {
      const date = new Date('2024-01-15T12:30:45.123Z');
      const encoder = new XmlEncoder();
      encoder.startElement('DateTime');
      encoder.encodeDateTime(date);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<DateTime>2024-01-15T12:30:45.123Z</DateTime>');
    });

    it('should decode DateTime from XML', () => {
      const decoder = new XmlDecoder('<DateTime>2024-01-15T12:30:45.123Z</DateTime>');
      decoder.startElement('DateTime');
      const value = decoder.decodeDateTime();
      expect(value.toISOString()).toBe('2024-01-15T12:30:45.123Z');
    });

    it('should round-trip DateTime values', () => {
      const date = new Date('2024-01-15T12:30:45.123Z');
      const encoder = new XmlEncoder();
      encoder.startElement('DateTime');
      encoder.encodeDateTime(date);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('DateTime');
      expect(decoder.decodeDateTime().toISOString()).toBe(date.toISOString());
    });
  });

  describe('ByteString', () => {
    it('should encode ByteString to Base64 XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('ByteString');
      encoder.encodeByteString(Buffer.from([1, 2, 3, 4, 5]));
      encoder.endElement();
      expect(encoder.getXml()).toBe('<ByteString>AQIDBAU=</ByteString>');
    });

    it('should decode ByteString from Base64 XML', () => {
      const decoder = new XmlDecoder('<ByteString>AQIDBAU=</ByteString>');
      decoder.startElement('ByteString');
      const value = decoder.decodeByteString();
      expect(value).toEqual(Buffer.from([1, 2, 3, 4, 5]));
    });

    it('should encode null ByteString as empty', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('ByteString');
      encoder.encodeByteString(null);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<ByteString></ByteString>');
    });

    it('should decode empty ByteString as null', () => {
      const decoder = new XmlDecoder('<ByteString></ByteString>');
      decoder.startElement('ByteString');
      const value = decoder.decodeByteString();
      expect(value).toBe(null);
    });

    it('should round-trip ByteString values', () => {
      const buffer = Buffer.from([10, 20, 30, 40, 50]);
      const encoder = new XmlEncoder();
      encoder.startElement('ByteString');
      encoder.encodeByteString(buffer);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('ByteString');
      expect(decoder.decodeByteString()).toEqual(buffer);
    });
  });

  describe('Guid', () => {
    it('should encode Guid to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Guid');
      encoder.encodeGuid('12345678-1234-1234-1234-123456789abc');
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Guid>12345678-1234-1234-1234-123456789abc</Guid>');
    });

    it('should decode Guid from XML', () => {
      const decoder = new XmlDecoder('<Guid>12345678-1234-1234-1234-123456789abc</Guid>');
      decoder.startElement('Guid');
      const value = decoder.decodeGuid();
      expect(value).toBe('12345678-1234-1234-1234-123456789abc');
    });

    it('should round-trip Guid values', () => {
      const guid = '87654321-4321-4321-4321-fedcba987654';
      const encoder = new XmlEncoder();
      encoder.startElement('Guid');
      encoder.encodeGuid(guid);
      encoder.endElement();
      
      const decoder = new XmlDecoder(encoder.getXml());
      decoder.startElement('Guid');
      expect(decoder.decodeGuid()).toBe(guid);
    });

    it('should throw on invalid Guid format', () => {
      const encoder = new XmlEncoder();
      expect(() => encoder.encodeGuid('invalid-guid')).toThrow('Invalid Guid format');
    });
  });

  describe('XmlElement', () => {
    it('should encode XmlElement to XML', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('XmlElement');
      encoder.encodeXmlElement('<Data><Value>42</Value></Data>');
      encoder.endElement();
      expect(encoder.getXml()).toBe('<XmlElement><Data><Value>42</Value></Data></XmlElement>');
    });

    it('should encode simple XmlElement text', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('XmlElement');
      encoder.encodeXmlElement('Some embedded XML text');
      encoder.endElement();
      expect(encoder.getXml()).toBe('<XmlElement>Some embedded XML text</XmlElement>');
    });

    it('should decode simple XmlElement from XML', () => {
      const decoder = new XmlDecoder('<XmlElement>Some embedded XML text</XmlElement>');
      decoder.startElement('XmlElement');
      const value = decoder.decodeXmlElement();
      expect(value).toBe('Some embedded XML text');
    });

    it('should encode null XmlElement as empty', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('XmlElement');
      encoder.encodeXmlElement(null);
      encoder.endElement();
      expect(encoder.getXml()).toBe('<XmlElement></XmlElement>');
    });

    it('should decode empty XmlElement as null', () => {
      const decoder = new XmlDecoder('<XmlElement></XmlElement>');
      decoder.startElement('XmlElement');
      const value = decoder.decodeXmlElement();
      expect(value).toBe(null);
    });
  });

  describe('Multiple elements', () => {
    it('should encode multiple nested elements', () => {
      const encoder = new XmlEncoder();
      encoder.startElement('Root');
      encoder.startElement('Int32');
      encoder.encodeInt32(42);
      encoder.endElement();
      encoder.startElement('String');
      encoder.encodeString('Hello');
      encoder.endElement();
      encoder.endElement();
      expect(encoder.getXml()).toBe('<Root><Int32>42</Int32><String>Hello</String></Root>');
    });
  });

  describe('Error handling', () => {
    it('should throw on missing element', () => {
      const decoder = new XmlDecoder('<Root><Int32>42</Int32></Root>');
      decoder.startElement('Root');
      expect(() => decoder.startElement('NonExistent')).toThrow('Element \'NonExistent\' not found');
    });

    it('should throw on invalid Int32', () => {
      const decoder = new XmlDecoder('<Int32>not a number</Int32>');
      decoder.startElement('Int32');
      expect(() => decoder.decodeInt32()).toThrow('Invalid Int32 value');
    });

    it('should throw on Int32 out of range', () => {
      const encoder = new XmlEncoder();
      expect(() => encoder.encodeInt32(3000000000)).toThrow('out of range');
    });
  });
});
