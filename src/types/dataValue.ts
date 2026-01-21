import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { UInt16, UInt8 } from "./baseTypes";
import { StatusCode } from "./statusCode";
import { Variant } from "./variant";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2.2.17
export class DataValue {

    private static readonly MaskValue = 0x1
    private static readonly MaskStatusCode = 0x2
    private static readonly MaskSourceTimestamp = 0x4
    private static readonly MaskServerTimestamp = 0x8
    private static readonly MaskSourcePicoseconds = 0x10
    private static readonly MaskServerPicoseconds = 0x20

    public static Has(mask1: UInt8, mask2: UInt8): boolean {
        return (mask1 & mask2) === mask2
    }

    public static decode(buffer: BufferReader): DataValue {
        const encodingMask = buffer.readUInt8()
        let value: Variant | undefined;
        let status: StatusCode | undefined;
        let sourceTimestamp: Date | undefined;
        let sourcePicoSeconds: UInt16 | undefined;
        let serverTimestamp: Date | undefined;
        let serverPicoSeconds: UInt16 | undefined;

        if (DataValue.Has(encodingMask, DataValue.MaskValue)) {
            buffer.readVariant();
        }

        if (DataValue.Has(encodingMask, DataValue.MaskStatusCode)) {
            status = buffer.readStatusCode();
        }

        if (DataValue.Has(encodingMask, DataValue.MaskSourceTimestamp)) {
            sourceTimestamp = buffer.readDateTime()
        }

        if (DataValue.Has(encodingMask, DataValue.MaskSourcePicoseconds)) {
            sourcePicoSeconds = buffer.readUInt16()
        }

        if (DataValue.Has(encodingMask, DataValue.MaskServerTimestamp)) {
            serverTimestamp = buffer.readDateTime()
        }

        if (DataValue.Has(encodingMask, DataValue.MaskServerPicoseconds)) {
            serverPicoSeconds = buffer.readUInt16()
        }

        return new DataValue(
            encodingMask, value, status, sourceTimestamp,
            sourcePicoSeconds, serverTimestamp, serverPicoSeconds);
    }

    encode(buffer: BufferWriter) {
        buffer.writeUint8(this.EncodingMask)

        if (DataValue.Has(this.EncodingMask, DataValue.MaskValue)) {
            buffer.writeVariant(this.Value as Variant)
        }

        if (DataValue.Has(this.EncodingMask, DataValue.MaskStatusCode)) {
            buffer.writeStatusCode(this.Status as StatusCode)
        }

        if (DataValue.Has(this.EncodingMask, DataValue.MaskSourceTimestamp)) {
            buffer.writeDateTime(this.SourceTimestamp as Date)
        }

        if (DataValue.Has(this.EncodingMask, DataValue.MaskSourcePicoseconds)) {
            buffer.writeUInt16(this.SourcePicoSeconds as UInt16)
        }

        if (DataValue.Has(this.EncodingMask, DataValue.MaskServerTimestamp)) {
            buffer.writeDateTime(this.ServerTimestamp as Date)
        }

        if (DataValue.Has(this.EncodingMask, DataValue.MaskServerPicoseconds)) {
            buffer.writeUInt16(this.ServerPicoSeconds as UInt16)
        }
    }

    constructor(
        public EncodingMask: UInt8,
        public Value: Variant | undefined,
        public Status: StatusCode | undefined,
        public SourceTimestamp: Date | undefined,
        public SourcePicoSeconds: UInt16 | undefined,
        public ServerTimestamp: Date | undefined,
        public ServerPicoSeconds: UInt16 | undefined
    ) {
    }
}