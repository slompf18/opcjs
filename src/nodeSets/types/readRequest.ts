// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { Float64 } from "../../types/baseTypes";
import { TimestampsToReturnEnum } from "./timestampsToReturn";
import { ReadValueId } from "./readValueId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.2/#5.11.2.2
 */
export class ReadRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public MaxAge: Float64,
        public TimestampsToReturn: TimestampsToReturnEnum,
        public NodesToRead: ReadValueId[]
    ) { }

    readonly id = 629

    public static decode(reader: BufferReader): ReadRequest {
        const obj = new ReadRequest(
            RequestHeader.decode(reader),
            reader.readDouble(),
            TimestampsToReturnEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ReadValueId.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeDouble(this.MaxAge);
        TimestampsToReturnEnum.encode(writer, this.TimestampsToReturn);
        {
            const arr = this.NodesToRead ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
