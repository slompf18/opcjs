import { IssuedIdentityToken, UserIdentityToken, UserNameIdentityToken, UserTokenTypeEnum } from "../nodeSets/types";
import { IssuerConfiguration } from "./issuerConfiguration";
import { IssuerToken } from "./issuerToken";

export class UserIdentity {
    private userIdentityToken = new UserIdentityToken('');
    private tokenType = UserTokenTypeEnum.Anonymous;
    private issuerLoginCallback: ((config:IssuerConfiguration)=>Promise<IssuerToken>) | undefined = undefined;

    public static newAnonymous(): UserIdentity {
        return new UserIdentity();
    }
    
    public static newWithUserName(userName: string, password: string): UserIdentity {
        const userIdentity = new UserIdentity();
        userIdentity.userIdentityToken = new UserNameIdentityToken(userName, new TextEncoder().encode(password), undefined);
        userIdentity.tokenType = UserTokenTypeEnum.UserName;
        return userIdentity;
    }

    public static newWithIssuerToken(loginCallback: (config:IssuerConfiguration)=>Promise<IssuerToken>): UserIdentity {
        const userIdentity = new UserIdentity();
        userIdentity.userIdentityToken = new IssuedIdentityToken(new Uint8Array(),undefined); 
        userIdentity.tokenType = UserTokenTypeEnum.IssuedToken;
        userIdentity.issuerLoginCallback = loginCallback;
        return userIdentity;
    }

    public getUserIdentityToken(): UserIdentityToken {
        return this.userIdentityToken;
    }

    public getTokenType(): UserTokenTypeEnum {
        return this.tokenType;
    }

    public getIssuerLoginCallback(): ((config:IssuerConfiguration)=>Promise<IssuerToken>) {
        if(!this.issuerLoginCallback){
            throw new Error("No issuer login callback defined");
        }
        
        return this.issuerLoginCallback;
    }
}
