// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ActionMethodDataType } from "./actionMethodDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.10.6
 */
export class PublishedActionMethodDataType implements IIdentifiable {
    constructor(
        public ActionMethods: ActionMethodDataType[]
    ) { }

    readonly id = 18793
}
