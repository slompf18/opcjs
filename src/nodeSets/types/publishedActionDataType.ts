// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { ActionTargetDataType } from "./actionTargetDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.10.4
 */
export class PublishedActionDataType implements IIdentifiable {
    constructor(
        public RequestDataSetMetaData: DataSetMetaDataType,
        public ActionTargets: ActionTargetDataType[]
    ) { }

    readonly id = 18594
}
