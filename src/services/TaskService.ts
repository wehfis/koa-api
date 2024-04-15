import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import { BoardTaskModel } from '../models/BoardTaskModel';
import TaskRepository from '../repositories/TaskRepository';
import { ITaskBoardDto } from '../dtos/TaskDtos';

export class TaskService {
    readonly taskRepository: TaskRepository;
    constructor() {
        this.taskRepository = new TaskRepository();
    }
    async getAll(
        boardId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardTaskModel[]> {
        try {
            return await this.taskRepository.findAll(boardId);
        } catch (error: any) {
            ctx.throw(500, error.message);
        }
    }
    async getById(
        taskId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardTaskModel> {
        try {
            return await this.taskRepository.findById(taskId);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
    async create(
        task: ITaskBoardDto,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardTaskModel> {
        try {
            return await this.taskRepository.create(task);
        } catch (error: any) {
            ctx.throw(500, error.message);
        }
    }
    async update(
        taskId: string,
        task: ITaskBoardDto,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<BoardTaskModel> {
        try {
            return await this.taskRepository.update(taskId, task);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
    async delete(
        taskId: string,
        ctx: ParameterizedContext<DefaultState, DefaultContext>
    ): Promise<boolean> {
        try {
            return await this.taskRepository.delete(taskId);
        } catch (error: any) {
            if (error.name === 'Not Found') {
                return ctx.throw(404, 'Not Found');
            }
            ctx.throw(500, error.message);
        }
    }
}
