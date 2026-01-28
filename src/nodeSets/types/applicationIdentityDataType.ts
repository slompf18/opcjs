// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { ApplicationDescription } from "./applicationDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.21
 */
export class ApplicationIdentityDataType implements IIdentifiable {
    constructor(
        public ApplicationUri: string | undefined,
        public ApplicationNames: LocalizedText[],
        public AdditionalServers: ApplicationDescription[]
    ) { }

    getId(): number { return 15556; }
}
