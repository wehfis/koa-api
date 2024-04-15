import { IUserModel } from '../models/UserModel';
import { LoginUserDto, RegisterUserDto } from '../dtos/UserDtos';
import UserRepository from '../repositories/UserRepository';
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import bcrypt from 'bcrypt';
import { IToken, TokenService } from './TokenService';

export class UserService {
    readonly userRepository: UserRepository;
    readonly tokenService: TokenService;
    constructor() {
        this.userRepository = new UserRepository();
        this.tokenService = new TokenService();
    }

    async register(
        payload: RegisterUserDto,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<IToken> {
        try {
            const user = await this.userRepository.findOne(payload.username);
            if (user) {
                const alreadyExistErr = new Error();
                alreadyExistErr.name = 'User Already Exists';
                throw alreadyExistErr;
            }
            const createdUser = await this.userRepository.create(payload);

            const tokens = this.tokenService.generateTokens(createdUser, ctx);
            await this.tokenService.saveToken(
                createdUser.username,
                tokens.refreshToken,
                ctx
            );

            return tokens;
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
    ): Promise<IToken> {
        try {
            const user = await this.userRepository.findOne(payload.username);
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

            const tokens = this.tokenService.generateTokens(user, ctx);
            await this.tokenService.saveToken(
                user.username,
                tokens.refreshToken,
                ctx
            );

            return tokens;
        } catch (error: any) {
            if (error.name === 'Authentication failed') {
                return ctx.throw(401, 'Authentication failed');
            }
            return ctx.throw(500, error.message);
        }
    }
    async logout(
        userId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        await this.tokenService.removeToken(userId, ctx);
    }
    async getUserById(
        userId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<Omit<IUserModel, 'password'>> {
        try {
            return (await this.userRepository.findById(userId)) as Omit<
                IUserModel,
                'password'
            >;
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, error.message);
            }
            return ctx.throw(500, error.message);
        }
    }
    async refresh(
        refreshToken: string | undefined,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<IToken> {
        if (!refreshToken) {
            return ctx.throw(401, 'Authentication failed');
        }
        const userData = this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.findToken(
            refreshToken,
            ctx
        );
        if (!userData || !tokenFromDb) {
            return ctx.throw(401, 'Authentication failed');
        }
        const user = await this.userRepository.findById(userData.userId);

        const tokens = this.tokenService.generateTokens(user, ctx);
        await this.tokenService.saveToken(
            user.username,
            tokens.refreshToken,
            ctx
        );

        return tokens;
    }
}
