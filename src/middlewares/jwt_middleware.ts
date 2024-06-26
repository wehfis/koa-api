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
            const decoded: any = jwt.verify(token, common.jwtSecretAccessKey!);
            ctx.state.userId = decoded.userId;
        } catch (error: any) {
            console.log(error.message);
            return ctx.throw(401, 'Invalid token');
        }
        await next();
    };
