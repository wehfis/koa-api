import { request, summary, tagsAll, body } from 'koa-swagger-decorator';
import { RegisterUserDto, LoginUserDto, IUserDto } from '../dtos/UserDtos';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { userService } from '../factories/user_factory';
import { loginUserSchema, registerUserSchema } from './schemas/request_schemas';
import { validateWrapper } from './validation/validate_wrapper';
import common from '../config';

@tagsAll(['User'])
export default class UserController {
    @request('post', '/register')
    @summary('creates a user')
    @body(registerUserSchema)
    static async registerUser(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload = await RegisterUserDto.create(
            ctx.request.body as IUserDto
        );
        try {
            await validateWrapper(payload);
        } catch (error: any) {
            return ctx.throw(400, error.message);
        }
        const tokens = await userService.register(payload, ctx);
        ctx.cookies.set('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        ctx.body = tokens.accessToken;
        ctx.response.message = 'User Registered Successfully';
        ctx.response.status = 201;
    }
    @request('post', '/login')
    @summary('returns a jwt')
    @body(loginUserSchema)
    static async loginUser(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload = ctx.request.body as IUserDto;
        try {
            await validateWrapper(payload);
        } catch (error: any) {
            return ctx.throw(400, error.message);
        }
        const tokens = await userService.login(payload, ctx);
        ctx.cookies.set('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        ctx.body = tokens.accessToken;
        ctx.response.status = 200;
    }
    @request('post', '/logout')
    @summary('returns a jwt')
    static async logoutUser(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        ctx.cookies.set('refreshToken', null, { expires: new Date(0) });
        await userService.logout(ctx.state.userId, ctx);
        ctx.response.status = 200;
    }
    @request('get', '/me')
    @summary('returns a currently authorized user')
    static async getUser(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        ctx.body = await userService.getUserById(ctx.state.userId, ctx);
        ctx.response.status = 200;
    }
    @request('get', '/refresh')
    @summary('returns a new access token')
    static async refreshToken(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const refreshToken = ctx.cookies.get('refreshToken');
        const tokens = await userService.refresh(refreshToken, ctx);
        ctx.cookies.set('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        ctx.body = tokens.accessToken;
        ctx.response.status = 200;
    }
}
