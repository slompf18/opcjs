// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.24
 */
export class SecuritySettingsDataType implements IIdentifiable {
    constructor(
        public SecurityModes: MessageSecurityModeEnum[],
        public SecurityPolicyUris: string[],
        public CertificateGroupName: string | undefined
    ) { }

    getId(): number { return 15559; }
}
