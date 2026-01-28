// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.28
 */
export class ThreeDOrientation implements IIdentifiable {
    constructor(
        public A: Float64,
        public B: Float64,
        public C: Float64
    ) { }

    getId(): number { return 18812; }
}
