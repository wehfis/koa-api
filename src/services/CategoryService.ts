import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import { BoardCategoryModel } from '../models/BoardCategoryModel';
import CategoryRepository from '../repositories/CategoryRepository';

export class CategoryService {
    readonly categoryRepository: CategoryRepository;
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }
    async getAll(
        boardId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardCategoryModel[]> {
        try {
            return await this.categoryRepository.findAll(boardId);
        } catch (error: any) {
            ctx.throw(500, error.message);
        }
    }
    async getById(
        categoryId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardCategoryModel> {
        try {
            return await this.categoryRepository.findById(categoryId);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
    async create(
        boardId: string,
        name: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardCategoryModel> {
        try {
            return await this.categoryRepository.create(boardId, name);
        } catch (error: any) {
            ctx.throw(500, error.message);
        }
    }
    async update(
        categoryId: string,
        name: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardCategoryModel> {
        try {
            return await this.categoryRepository.update(categoryId, name);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
    async delete(
        categoryId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<boolean> {
        try {
            return await this.categoryRepository.delete(categoryId);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
}
