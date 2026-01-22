// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ThreeDCartesianCoordinates } from "./threeDCartesianCoordinates";
import { ThreeDOrientation } from "./threeDOrientation";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.30
 */
export class ThreeDFrame implements IIdentifiable {
    constructor(
        public CartesianCoordinates: ThreeDCartesianCoordinates,
        public Orientation: ThreeDOrientation
    ) { }

    readonly id = 18814
}
