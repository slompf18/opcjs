// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * MethodNode
 */
export class MethodNode implements IIdentifiable {
    constructor(
        public Executable: boolean,
        public UserExecutable: boolean
    ) { }

    getId(): number { return 276; }
}
