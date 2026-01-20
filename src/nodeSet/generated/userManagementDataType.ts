// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UserConfigurationMaskEnum } from "./userConfigurationMask";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/5.2.4
 */
export class UserManagementDataType implements IEncodable {
    constructor(
        public UserName: string | undefined,
        public UserConfiguration: UserConfigurationMaskEnum,
        public Description: string | undefined
    ) { }

    public static decode(reader: BufferReader): UserManagementDataType {
        const obj = new UserManagementDataType(
            reader.readString(),
            UserConfigurationMaskEnum.decode(reader),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.UserName);
        UserConfigurationMaskEnum.encode(writer, this.UserConfiguration);
        writer.writeString(this.Description);
    }
}
