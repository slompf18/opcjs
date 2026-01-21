// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ReadValueId } from "./readValueId";
import { MonitoringModeEnum } from "./monitoringMode";
import { MonitoringParameters } from "./monitoringParameters";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.2/#5.13.2.2
 */
export class MonitoredItemCreateRequest implements IIdentifiable {
    constructor(
        public ItemToMonitor: ReadValueId,
        public MonitoringMode: MonitoringModeEnum,
        public RequestedParameters: MonitoringParameters
    ) { }

    readonly id = 743

    public static decode(reader: BufferReader): MonitoredItemCreateRequest {
        const obj = new MonitoredItemCreateRequest(
            ReadValueId.decode(reader),
            MonitoringModeEnum.decode(reader),
            MonitoringParameters.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ItemToMonitor.encode(writer);
        MonitoringModeEnum.encode(writer, this.MonitoringMode);
        this.RequestedParameters.encode(writer);
    }
}
