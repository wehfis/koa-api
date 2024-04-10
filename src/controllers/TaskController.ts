import { request, summary, tagsAll, body, path } from 'koa-swagger-decorator';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { services } from '../factories/service_factory';
import {
    taskSchemaId,
    createTaskSchema,
    updateTaskSchema,
    getAllTaskSchema
} from './schemas/request_schemas';
import { ITaskBoardDto } from '../dtos/TaskDtos';

@tagsAll(['Task'])
export default class TaskController {
    @request('post', '/task')
    @summary('creates a task')
    @body(createTaskSchema)
    static async createTask(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload = ctx.request.body as ITaskBoardDto;

        const task = await services.task.create(
            payload,
            ctx
        );

        ctx.body = task;
        ctx.response.message = 'Task Created Successfully';
        ctx.response.status = 201;
    }
    @request('get', '/tasks/{board_id}')
    @summary('returns a specific board tasks')
    @path(getAllTaskSchema)
    static async getTasks(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload: any = ctx.params.board_id;
        const tasks = await services.task.getAll(payload.board_id, ctx);

        ctx.body = tasks;
        ctx.response.status = 200;
    }
    @request('get', '/task/{id}')
    @path(taskSchemaId)
    @summary('returns a task')
    static async getTask(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const category = await services.task.getById(ctx.params.id, ctx);

        ctx.body = category;
        ctx.response.status = 200;
    }
    @request('put', '/task/{id}')
    @path(taskSchemaId)
    @body(updateTaskSchema)
    @summary('returns a task')
    static async updateTask(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const payload = ctx.request.body as ITaskBoardDto;
        const task = await services.task.update(
            ctx.params.id,
            payload,
            ctx
        );

        ctx.body = task;
        ctx.response.status = 200;
    }
    @request('delete', '/task/delete/{id}')
    @path(taskSchemaId)
    @summary('returns an operation')
    static async deleteTask(
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<void> {
        const task = await services.task.delete(ctx.params.id, ctx);

        ctx.body = task;
        ctx.response.status = 200;
    }
}