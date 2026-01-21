// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ViewDescription } from "./viewDescription";
import { UInt32 } from "../../types/baseTypes";
import { BrowseDescription } from "./browseDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.2/#5.9.2.2
 */
export class BrowseRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public View: ViewDescription,
        public RequestedMaxReferencesPerNode: UInt32,
        public NodesToBrowse: BrowseDescription[]
    ) { }

    readonly id = 525

    public static decode(reader: BufferReader): BrowseRequest {
        const obj = new BrowseRequest(
            RequestHeader.decode(reader),
            ViewDescription.decode(reader),
            reader.readUInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = BrowseDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        this.View.encode(writer);
        writer.writeUInt32(this.RequestedMaxReferencesPerNode);
        {
            const arr = this.NodesToBrowse ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
