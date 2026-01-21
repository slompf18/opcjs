// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { BrowsePathTarget } from "./browsePathTarget";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.4/#5.9.4.2
 */
export class BrowsePathResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public Targets: BrowsePathTarget[]
    ) { }

    readonly id = 549

    public static decode(reader: BufferReader): BrowsePathResult {
        const obj = new BrowsePathResult(
            reader.readStatusCode(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BrowsePathTarget.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeStatusCode(this.StatusCode);
        {
            const arr = this.Targets ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
