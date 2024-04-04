import { request, summary, tagsAll, body, path } from 'koa-swagger-decorator';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { services } from '../factories/service_factory';
import {
    categorySchemaId,
    createCategorySchema,
    updateCategorySchema,
    getAllCategorySchema
} from './schemas/request_schemas';

@tagsAll(['Category'])
export default class CategoryController {
    @request('post', '/category/create')
    @summary('creates a category')
    @body(createCategorySchema)
    static async createCategory(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload: any = ctx.request.body;

        const category = await services.category.create(
            payload.board_id,
            payload.name,
            ctx
        );

        ctx.body = category;
        ctx.response.message = 'Category Created Successfully';
        ctx.response.status = 201;
    }
    @request('get', '/category/getAll')
    @summary('returns a specific user categories')
    @body(getAllCategorySchema)
    static async getCategories(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload: any = ctx.request.body;
        const categories = await services.category.getAll(payload.board_id, ctx);

        ctx.body = categories;
        ctx.response.status = 200;
    }
    @request('get', '/category/{id}')
    @path(categorySchemaId)
    @summary('returns a category')
    static async getCategory(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const category = await services.category.getById(ctx.params.id, ctx);

        ctx.body = category;
        ctx.response.status = 200;
    }
    @request('put', '/category/update/{id}')
    @path(categorySchemaId)
    @body(updateCategorySchema)
    @summary('returns a category')
    static async updateCategory(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload: any = ctx.request.body;
        const category = await services.category.update(
            ctx.params.id,
            payload.name,
            ctx
        );

        ctx.body = category;
        ctx.response.status = 200;
    }
    @request('delete', '/category/delete/{id}')
    @path(categorySchemaId)
    @summary('returns an operation')
    static async deleteCategory(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const category = await services.category.delete(ctx.params.id, ctx);

        ctx.body = category;
        ctx.response.status = 200;
    }
}