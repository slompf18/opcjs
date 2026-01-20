// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { MonitoringParameters } from "./monitoringParameters";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.3/#5.13.3.2
 */
export class MonitoredItemModifyRequest implements IEncodable {
    constructor(
        public MonitoredItemId: UInt32,
        public RequestedParameters: MonitoringParameters
    ) { }

    public static decode(reader: BufferReader): MonitoredItemModifyRequest {
        const obj = new MonitoredItemModifyRequest(
            reader.readUInt32(),
            MonitoringParameters.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.MonitoredItemId);
        this.RequestedParameters.encode(writer);
    }
}
