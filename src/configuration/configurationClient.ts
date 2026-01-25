import { Configuration } from "./configuration";

export class ConfigurationClient extends Configuration {
    public static getSimple(name:string, company:string): 
        ConfigurationClient {

        const applicationUri = `urn:${company}:${name}`;
        const productUri = `urn:${company}:${name}:product`;
        return new ConfigurationClient(name, applicationUri, name, productUri);
    }

    constructor(
        applicationName:string,
        applicationUri:string,
        productName:string,
        productUri:string) {
        super(applicationName, applicationUri, productName, productUri);
    }
}