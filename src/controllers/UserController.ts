import { request, summary, tagsAll, body } from 'koa-swagger-decorator';
import { RegisterUserDto, LoginUserDto, IUserDto } from '../dtos/UserDtos';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { userService } from '../factories/user_factory';
import { loginUserSchema, registerUserSchema } from './schemas/request_schemas';
import { validateWrapper } from './validation/validate_wrapper';

@tagsAll(['User'])
export default class UserController {
    @request('post', '/register')
    @summary('creates a user')
    @body(registerUserSchema)
    static async registerUser(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload = await RegisterUserDto.create(ctx.request.body as IUserDto);
        try {
            await validateWrapper(payload);
        } catch (error: any) {
            return ctx.throw(400, error.message);
        }
        ctx.body = await userService.register(payload, ctx);
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
        ctx.body = await userService.login(payload, ctx);
        ctx.response.status = 200;
    }
    @request('get', '/me')
    @summary('returns a currently authorized user')
    static async getUser(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        console.log(ctx.state.userId);
        ctx.body = await userService.getUserById(ctx.state.userId, ctx);
        ctx.response.status = 200;
    }
}
