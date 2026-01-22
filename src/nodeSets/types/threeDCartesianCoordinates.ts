// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.26
 */
export class ThreeDCartesianCoordinates implements IIdentifiable {
    constructor(
        public X: Float64,
        public Y: Float64,
        public Z: Float64
    ) { }

    readonly id = 18810
}
