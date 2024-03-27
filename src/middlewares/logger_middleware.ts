import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';

export default () => async (ctx:ParameterizedContext<DefaultState, DefaultContext>, next:Function) => {
    try {
        await next();
        const reqMethod: string = ctx.request.method;
        const reqUrl: string = ctx.request.url;
        const resStatus: number = ctx.response.status;
        const resMessage: string = ctx.response.message;
        console.log(`INFO:[${reqMethod} ${reqUrl}] -> [${resStatus} ${resMessage}]`);
    } catch (error: any) {
        ctx.response.status = error.status || 500;
        const reqMethod: string = ctx.request.method;
        const reqUrl: string = ctx.request.url;
        const resStatus: number = ctx.response.status;
        const resMessage: string = ctx.response.message;
        console.log(`ERROR:[${reqMethod} ${reqUrl}] -> [${resStatus} ${resMessage}]\n${error}`);
    }
};
