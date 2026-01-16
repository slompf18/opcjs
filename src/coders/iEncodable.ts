import { BufferWriter } from "./binary/bufferWriter";

export interface IEncodable {
    encode(buffer: BufferWriter): void;
}