// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { QueryDataSet } from "./queryDataSet";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.4/#5.10.4.2
 */
export class QueryNextResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public QueryDataSets: QueryDataSet[],
        public RevisedContinuationPoint: ByteString
    ) { }

    getId(): number { return 622; }
}
