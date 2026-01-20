// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.2/#5.3.2.4
 */
export class LldpTlvType implements IEncodable {
    constructor(
        public TlvType: UInt32,
        public TlvInfo: ByteString
    ) { }

    public static decode(reader: BufferReader): LldpTlvType {
        const obj = new LldpTlvType(
            reader.readUInt32(),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.TlvType);
        this.TlvInfo.encode(writer);
    }
}
