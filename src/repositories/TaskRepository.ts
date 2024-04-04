import { db } from '../db/postgres_config';
import { ITaskBoardDto } from '../dtos/TaskDtos';
import { BoardTaskModel } from '../models/BoardTaskModel';
import ITaskRepository from './ITaskRepository';

export default class TaskRepository implements ITaskRepository<BoardTaskModel> {
    async findById(id: string): Promise<BoardTaskModel> {
        const query = {
            text: `
                SELECT * 
                FROM board_tasks
                WHERE id = $1
            `,
            values: [id],
        };
        const result = await db.query(query);

        if (result.rows.length < 1) {
            const notFoundError = new Error(`Task with id '${id}' not found`);
            notFoundError.name = 'Not Found';
            throw notFoundError;
        }

        const task: BoardTaskModel = result.rows[0];

        return task;
    }
    async findAll(boardId: string): Promise<BoardTaskModel[]> {
        const query = {
            text: `
                SELECT *
                FROM board_tasks
                WHERE board_id = $1
            `,
            values: [boardId],
        };
        const result = await db.query(query);

        const tasks: BoardTaskModel[] = result.rows;

        return tasks;
    }
    async create(
        task: ITaskBoardDto
    ): Promise<BoardTaskModel> {
        const query = {
            text: `
                INSERT INTO board_tasks(board_id, category_id, title, description) 
                VALUES($1, $2, $3, $4)
                RETURNING id, title, description, category_id, board_id
            `,
            values: [task.board_id, task.category_id, task.title, task.description],
        };
        const result = await db.query(query);

        const insertedCategory: BoardTaskModel = result.rows[0];

        return insertedCategory;
    }
    async update(id: string, task: ITaskBoardDto): Promise<BoardTaskModel> {
        const query = {
            text: `
                UPDATE board_categories
                SET title = $1
                SET description = $2
                SET category_id = $3
                WHERE id = $3
                RETURNING id, title, description, category_id, board_id
            `,
            values: [task.title, task.description, task.category_id, id],
        };
        const result = await db.query(query);

        if (result.rows.length < 1) {
            const notFoundError = new Error(`Task with id '${id}' not found`);
            notFoundError.name = 'Not Found';
            throw notFoundError;
        }

        const updatedBoard: BoardTaskModel = result.rows[0];

        return updatedBoard;
    }
    async delete(id: string): Promise<boolean> {
        const query = {
            text: `
                DELETE FROM board_tasks
                WHERE id = $1
            `,
            values: [id],
        };
        const result = await db.query(query);

        if (result.rows.length < 1) {
            const notFoundError = new Error(`Task with id '${id}' not found`);
            notFoundError.name = 'Not Found';
            throw notFoundError;
        }

        return true;
    }
}
