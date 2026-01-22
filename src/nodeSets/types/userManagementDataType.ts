// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UserConfigurationMaskEnum } from "./userConfigurationMask";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/5.2.4
 */
export class UserManagementDataType implements IIdentifiable {
    constructor(
        public UserName: string | undefined,
        public UserConfiguration: UserConfigurationMaskEnum,
        public Description: string | undefined
    ) { }

    readonly id = 24281
}
