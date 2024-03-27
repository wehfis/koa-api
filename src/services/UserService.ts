import { IUserModel } from '../models/UserModel';
import { LoginUserDto, RegisterUserDto } from '../dtos/UserDtos';
import UserRepository from '../repositories/UserRepository';
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import common from '../config';

export class UserService {
    readonly userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(
        payload: RegisterUserDto,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<string> {
        try {
            const user = await this.userRepository.findOne(payload.username);
            if (user) {
                const alreadyExistErr = new Error();
                alreadyExistErr.name = 'User Already Exists';
                throw alreadyExistErr;
            }
            const createdUser = await this.userRepository.create(payload);

            const token = jwt.sign({ userId: createdUser.id }, common.jwtSecretKey!, {
                expiresIn: common.jwtExpiresAccess,
            });
            return token;
        } catch (error: any) {
            if (error.name === 'User Already Exists') {
                return ctx.throw(400, 'User Already Exists');
            }
            return ctx.throw(500, error.message);
        }
    }

    async login(
        payload: LoginUserDto,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<string> {
        try {
            const user = await this.userRepository.findOne(payload.username);
            console.log('service', user);
            if (!user) {
                const authErr = new Error();
                authErr.name = 'Authentication failed';
                throw authErr;
            }
            const passwordMatch = await bcrypt.compare(
                payload.password,
                user.password
            );
            if (!passwordMatch) {
                const authErr = new Error();
                authErr.name = 'Authentication failed';
                throw authErr;
            }
            const token = jwt.sign({ userId: user.id }, common.jwtSecretKey!, {
                expiresIn: common.jwtExpiresAccess,
            });
            return token;
        } catch (error: any) {
            if (error.name === 'Authentication failed') {
                return ctx.throw(401, 'Authentication failed');
            }
            return ctx.throw(500, error.message);
        }
    }
    async getUserById(
        userId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<Omit<IUserModel, 'password'>> {
        try {
            return await this.userRepository.findById(userId) as Omit<IUserModel, 'password'>;
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, error.message);
            }
            return ctx.throw(500, error.message);
        }
    }
}
