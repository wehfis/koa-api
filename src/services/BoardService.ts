import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import { BoardModel } from '../models/BoardModel';
import BoardRepository from '../repositories/BoardRepository';

export class BoardService {
    readonly boardRepository: BoardRepository;
    constructor() {
        this.boardRepository = new BoardRepository();
    }
    async getAll(
        userId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardModel[]> {
        try {
            return await this.boardRepository.findAll(userId);
        } catch (error: any) {
            ctx.throw(500, error.message);
        }
    }
    async getById(
        boardId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardModel> {
        try {
            return await this.boardRepository.findById(boardId);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
    async create(
        userId: string,
        title: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardModel> {
        try {
            return await this.boardRepository.create(userId, title);
        } catch (error: any) {
            ctx.throw(500, error.message);
        }
    }
    async update(
        boardId: string,
        title: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardModel> {
        try {
            return await this.boardRepository.update(boardId, title);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
    async delete(
        boardId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<boolean> {
        try {
            return await this.boardRepository.delete(boardId);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
}
