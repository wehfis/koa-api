import {
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';
import bcrypt from 'bcrypt';

export interface IUserDto {
    username: string;
    password: string;
}

export class RegisterUserDto {
    @IsNotEmpty()
    @Length(2, 50)
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
	@Length(10, 100)
    password: string;

    constructor(payload: IUserDto) {
        this.username = payload.username;
        this.password = payload.password;
    }

    static async create(payload: IUserDto): Promise<RegisterUserDto> {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        return new RegisterUserDto({ ...payload, password: hashedPassword });
    }

}
export class LoginUserDto extends RegisterUserDto{
    constructor(payload: IUserDto) {
        super(payload);
    }
} 
