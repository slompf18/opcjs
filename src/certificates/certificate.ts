import { ICertificate } from "./iCertificate";

export class Certificate implements ICertificate {
    getBytes(): Uint8Array {
        throw new Error("Method not implemented.");
    }
}