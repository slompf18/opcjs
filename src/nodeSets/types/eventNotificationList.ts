// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { EventFieldList } from "./eventFieldList";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.3
 */
export class EventNotificationList implements IIdentifiable {
    constructor(
        public Events: EventFieldList[]
    ) { }

    getId(): number { return 914; }
}
