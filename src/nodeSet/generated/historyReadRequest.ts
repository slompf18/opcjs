// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ExtensionObject } from "../../types/extensionObject";
import { TimestampsToReturnEnum } from "./timestampsToReturn";
import { HistoryReadValueId } from "./historyReadValueId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.3/#5.11.3.2
 */
export class HistoryReadRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public HistoryReadDetails: ExtensionObject,
        public TimestampsToReturn: TimestampsToReturnEnum,
        public ReleaseContinuationPoints: boolean,
        public NodesToRead: HistoryReadValueId[]
    ) { }

    public static decode(reader: BufferReader): HistoryReadRequest {
        const obj = new HistoryReadRequest(
            RequestHeader.decode(reader),
            reader.readExtensionObject(),
            TimestampsToReturnEnum.decode(reader),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = HistoryReadValueId.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        this.HistoryReadDetails.encode(writer);
        TimestampsToReturnEnum.encode(writer, this.TimestampsToReturn);
        writer.writeBoolean(this.ReleaseContinuationPoints);
        {
            const arr = this.NodesToRead ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
