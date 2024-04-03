import {
    IsNotEmpty,
    IsString,
	Length,
} from 'class-validator';

export interface IUserModel {
    id: string;
    username: string;
    password: string;
    refreshToken: string;
}

export class UserModel implements IUserModel {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @Length(2, 50)
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
	@Length(10, 100)
    password: string;

    @IsString()
    refreshToken: string;

    constructor(payload: IUserModel) {
        this.id = payload.id;
        this.username = payload.username;
        this.password = payload.password;
        this.refreshToken = payload.refreshToken;
    }
}
