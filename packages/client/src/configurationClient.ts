import { BinaryReader, BinaryWriter, Configuration, Decoder, Encoder, registerBinaryDecoders, registerEncoders, registerTypeDecoders } from "opcjs-base";

export class ConfigurationClient extends Configuration {
    public static getSimple(name:string, company:string): 
        ConfigurationClient {

        const applicationUri = `urn:${company}:${name}`;
        const productUri = `urn:${company}:${name}:product`;

        const encoder = new Encoder();
        encoder.registerWriterFactory('binary', () => { return new BinaryWriter();});
        registerEncoders(encoder);

        const decoder = new Decoder();
        decoder.registerReaderFactory('binary', (data:unknown) => { return new BinaryReader(data as Uint8Array);});
        registerTypeDecoders(decoder);
        registerBinaryDecoders(decoder);
        
        return new ConfigurationClient(name, applicationUri, name, productUri, encoder, decoder);
    }

    constructor(
        applicationName:string,
        applicationUri:string,
        productName:string,
        productUri:string,
        encoder: Encoder,
        decoder: Decoder) {
        super(applicationName, applicationUri, productName, productUri, encoder, decoder);
    }
}