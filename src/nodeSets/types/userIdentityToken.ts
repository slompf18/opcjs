// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15
 */
export class UserIdentityToken implements IIdentifiable {
    constructor(
        public PolicyId: string | undefined
    ) { }

    readonly id = 316

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
