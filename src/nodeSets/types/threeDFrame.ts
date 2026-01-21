// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    public static decode(reader: BufferReader): ThreeDFrame {
        const obj = new ThreeDFrame(
            ThreeDCartesianCoordinates.decode(reader),
            ThreeDOrientation.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.CartesianCoordinates.encode(writer);
        this.Orientation.encode(writer);
    }
}
