import { request, summary, tagsAll, body, path } from 'koa-swagger-decorator';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { services } from '../factories/service_factory';
import {
    boardSchemaId,
    createBoardSchema,
    updateBoardSchema,
} from './schemas/request_schemas';

@tagsAll(['Board'])
export default class BoardController {
    @request('post', '/board/create')
    @summary('creates a board')
    @body(createBoardSchema)
    static async createBoard(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload: any = ctx.request.body;

        const board = await services.board.create(
            ctx.state.userId,
            payload.title,
            ctx
        );

        ctx.body = board;
        ctx.response.message = 'Board Created Successfully';
        ctx.response.status = 201;
    }
    @request('get', '/board/getAll')
    @summary('returns a specific user boards')
    static async getBoards(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const boards = await services.board.getAll(ctx.state.userId, ctx);

        ctx.body = boards;
        ctx.response.status = 200;
    }
    @request('get', '/board/{id}')
    @path(boardSchemaId)
    @summary('returns a board')
    static async getBoard(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const board = await services.board.getById(ctx.params.id, ctx);

        ctx.body = board;
        ctx.response.status = 200;
    }
    @request('put', '/board/update/{id}')
    @path(boardSchemaId)
    @body(updateBoardSchema)
    @summary('returns a board')
    static async updateBoard(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload: any = ctx.request.body;
        const board = await services.board.update(
            ctx.params.id,
            payload.title,
            ctx
        );

        ctx.body = board;
        ctx.response.status = 200;
    }
    @request('delete', '/board/delete/{id}')
    @path(boardSchemaId)
    @summary('returns an operation')
    static async deleteBoard(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const board = await services.board.delete(ctx.params.id, ctx);

        ctx.body = board;
        ctx.response.status = 200;
    }
}
