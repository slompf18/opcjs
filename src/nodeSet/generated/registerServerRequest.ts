// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { RegisteredServer } from "./registeredServer";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.5/#5.5.5.2
 */
export class RegisterServerRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public Server: RegisteredServer
    ) { }

    public static decode(reader: BufferReader): RegisterServerRequest {
        const obj = new RegisterServerRequest(
            RequestHeader.decode(reader),
            RegisteredServer.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        this.Server.encode(writer);
    }
}
