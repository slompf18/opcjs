// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { EndpointUrlListDataType } from "./endpointUrlListDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.19
 */
export class NetworkGroupDataType implements IEncodable {
    constructor(
        public ServerUri: string | undefined,
        public NetworkPaths: EndpointUrlListDataType[]
    ) { }

    public static decode(reader: BufferReader): NetworkGroupDataType {
        const obj = new NetworkGroupDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointUrlListDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ServerUri);
        {
            const arr = this.NetworkPaths ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
