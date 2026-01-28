// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.26
 */
export class NotificationMessage implements IIdentifiable {
    constructor(
        public SequenceNumber: UInt32,
        public PublishTime: Date,
        public NotificationData: ExtensionObject[]
    ) { }

    getId(): number { return 803; }
}
