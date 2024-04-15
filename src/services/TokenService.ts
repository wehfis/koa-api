import { IUserModel } from '../models/UserModel';
import { IUserDto, LoginUserDto, RegisterUserDto } from '../dtos/UserDtos';
import UserRepository from '../repositories/UserRepository';
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import jwt, { JwtPayload } from 'jsonwebtoken';
import common from '../config';

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export class TokenService {
    readonly userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    generateTokens(
        payload: Omit<IUserModel, 'password'>,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): IToken {
        try {
            const accessToken = jwt.sign(
                { userId: payload.id },
                common.jwtSecretAccessKey!,
                {
                    expiresIn: common.jwtExpiresAccess,
                }
            );
            const refreshToken = jwt.sign(
                { userId: payload.id },
                common.jwtSecretRefreshKey!,
                {
                    expiresIn: common.jwtExpiresRefresh,
                }
            );
            return {
                accessToken,
                refreshToken,
            };
        } catch (error: any) {
            if (error.name === 'User Already Exists') {
                return ctx.throw(400, 'User Already Exists');
            }
            return ctx.throw(500, error.message);
        }
    }
    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, common.jwtSecretAccessKey!);
            return userData;
        } catch (error: any) {
            return null;
        }
    }
    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, common.jwtSecretRefreshKey!);
            return userData as JwtPayload;
        } catch (error: any) {
            return null;
        }
    }
    async saveToken(
        username: string,
        refreshToken: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ) {
        try {
            const user = await this.userRepository.findOne(username);
            if (user) {
                this.userRepository.updateToken(user.id, refreshToken);
            }
        } catch (error: any) {
            return ctx.throw(500, error.message);
        }
    }
    async removeToken(
        userId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ) {
        try {
            this.userRepository.removeToken(userId);
        } catch (error: any) {
            return ctx.throw(500, error.message);
        }
    }
    async findToken(
        refreshToken: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ) {
        try {
            return await this.userRepository.findToken(refreshToken);
        } catch (error: any) {
            return ctx.throw(500, error.message);
        }
    }
}
