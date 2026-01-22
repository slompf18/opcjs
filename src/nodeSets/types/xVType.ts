// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float32, Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.8
 */
export class XVType implements IIdentifiable {
    constructor(
        public X: Float64,
        public Value: Float32
    ) { }

    readonly id = 12080
}
