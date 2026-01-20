// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.22
 */
export class EndpointDataType implements IEncodable {
    constructor(
        public DiscoveryUrls: string | undefined[],
        public NetworkName: string | undefined,
        public Port: UInt16
    ) { }

    public static decode(reader: BufferReader): EndpointDataType {
        const obj = new EndpointDataType(
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            reader.readUInt16()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        {
            const arr = this.DiscoveryUrls ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeString(this.NetworkName);
        writer.writeUInt16(this.Port);
    }
}
