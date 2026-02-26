export interface IOpcType{
    getTypeId(): number;
    getBinaryEncodingId(): number;
    getXmlEncodingId(): number;
    getJsonEncodingId(): number;
}