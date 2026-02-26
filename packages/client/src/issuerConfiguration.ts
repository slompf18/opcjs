export class IssuerConfiguration{
    public static newFrom(issuerEndpointUrl: any): IssuerConfiguration {
        return new IssuerConfiguration(
            issuerEndpointUrl['ua.resourceId'],
            issuerEndpointUrl['ua.authorityUrl'],
            issuerEndpointUrl['ua.authorityProfileUri'],
            issuerEndpointUrl['ua.tokenEndpoint'],
            issuerEndpointUrl['ua.authorizationEndpoint'],
            issuerEndpointUrl['ua.requestTypes'],
            issuerEndpointUrl['ua.scopes']
        );
    }
    
    constructor(
        public resourceId: string,
        public authorityUrl: string,
        public authorityProfileUri: string,
        public tokenEndpoint: string,
        public authorizationEndpoint: string,
        public requestTypes: string[],
        public scopes: string[]
    ){
        
    }
}