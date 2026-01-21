// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { DeleteReferencesItem } from "./deleteReferencesItem";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.5/#5.8.5.1
 */
export class DeleteReferencesRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReferencesToDelete: DeleteReferencesItem[]
    ) { }

    readonly id = 504

    public static decode(reader: BufferReader): DeleteReferencesRequest {
        const obj = new DeleteReferencesRequest(
            RequestHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = DeleteReferencesItem.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        {
            const arr = this.ReferencesToDelete ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
