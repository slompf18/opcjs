import { UserIdentityToken, UserNameIdentityToken, UserTokenTypeEnum } from "../nodeSets/types";

export class UserIdentity {
    private userIdentityToken = new UserIdentityToken('');
    private tokenType = UserTokenTypeEnum.Anonymous;

    public static newAnonymous(): UserIdentity {
        return new UserIdentity();
    }
    
    public static newWithUserName(userName: string, password: string): UserIdentity {
        const userIdentity = new UserIdentity();
        userIdentity.userIdentityToken = new UserNameIdentityToken(userName, new TextEncoder().encode(password), '');
        userIdentity.tokenType = UserTokenTypeEnum.UserName;
        return userIdentity;
    }

    public getUserIdentityToken(): UserIdentityToken {
        return this.userIdentityToken;
    }

    public getTokenType(): UserTokenTypeEnum {
        return this.tokenType;
    }
}