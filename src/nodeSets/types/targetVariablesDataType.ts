// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { FieldTargetDataType } from "./fieldTargetDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.2.2
 */
export class TargetVariablesDataType implements IIdentifiable {
    constructor(
        public TargetVariables: FieldTargetDataType[]
    ) { }

    getId(): number { return 15631; }
}
