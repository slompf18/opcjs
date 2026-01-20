// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { RegisteredServer } from "./registeredServer";
import { ExtensionObject } from "../../types/extensionObject";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.6/#5.5.6.2
 */
export class RegisterServer2Request implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public Server: RegisteredServer,
        public DiscoveryConfiguration: ExtensionObject[]
    ) { }

    public static decode(reader: BufferReader): RegisterServer2Request {
        const obj = new RegisterServer2Request(
            RequestHeader.decode(reader),
            RegisteredServer.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        this.Server.encode(writer);
        {
            const arr = this.DiscoveryConfiguration ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
