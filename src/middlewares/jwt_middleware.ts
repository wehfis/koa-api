import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import common from '../config';
import jwt from 'jsonwebtoken';

export default () =>
    async (
        ctx: ParameterizedContext<DefaultState, DefaultContext>,
        next: Function
    ) => {
        const token = ctx.request.headers.authorization;
        if (!token) {
            return ctx.throw(401, 'Access denied');
        }
        try {
            const decoded: any = jwt.verify(token, common.jwtSecretKey!);
            console.log('jwt', decoded);
            ctx.state.userId = decoded.userId;
            await next();
        } catch (error) {
            return ctx.throw(401, 'Invalid token');
        }
    };
