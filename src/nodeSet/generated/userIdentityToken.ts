// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15
 */
export class UserIdentityToken implements IEncodable {
    constructor(
        public PolicyId: string | undefined
    ) { }

    public static decode(reader: BufferReader): UserIdentityToken {
        const obj = new UserIdentityToken(
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.PolicyId);
    }
}
