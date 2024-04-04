import { db } from '../db/postgres_config';
import { BoardCategoryModel } from '../models/BoardCategoryModel';
import ICategoryRepository from './ICategoryRepository';

export default class CategoryRepository
    implements ICategoryRepository<BoardCategoryModel>
{
    async findById(id: string): Promise<BoardCategoryModel> {
        const query = {
            text: `
                SELECT * 
                FROM board_categories
                WHERE id = $1
            `,
            values: [id],
        };
        const result = await db.query(query);

        if (result.rows.length < 1) {
            const notFoundError = new Error(`Category with id '${id}' not found`);
            notFoundError.name = 'Not Found';
            throw notFoundError;
        }

        const category: BoardCategoryModel = result.rows[0];

        return category;
    }
    async findAll(boardId: string): Promise<BoardCategoryModel[]> {
        const query = {
            text: `
                SELECT *
                FROM board_categories
                WHERE board_id = $1
            `,
            values: [boardId],
        };
        const result = await db.query(query);

        const categories: BoardCategoryModel[] = result.rows;

        return categories;
    }
    async create(boardId: string, name: string): Promise<BoardCategoryModel> {
        const query = {
            text: `
                INSERT INTO board_categories(name, board_id) 
                VALUES($1, $2)
                RETURNING id, board_id, name
            `,
            values: [name, boardId],
        };
        const result = await db.query(query);

        const insertedCategory: BoardCategoryModel = result.rows[0];

        return insertedCategory;
    }
    async update(id: string, name: string): Promise<BoardCategoryModel> {
        const query = {
            text: `
                UPDATE board_categories
                SET name = $1
                WHERE id = $2
                RETURNING id, board_id, name
            `,
            values: [name, id],
        };
        const result = await db.query(query);

        if (result.rows.length < 1) {
            const notFoundError = new Error(`Category with id '${id}' not found`);
            notFoundError.name = 'Not Found';
            throw notFoundError;
        }

        const updatedBoard: BoardCategoryModel = result.rows[0];

        return updatedBoard;
    }
    async delete(id: string): Promise<boolean> {
        const query = {
            text: `
                DELETE FROM board_categories
                WHERE id = $1
            `,
            values: [id],
        };
        const result = await db.query(query);

        if (result.rows.length < 1) {
            const notFoundError = new Error(`Category with id '${id}' not found`);
            notFoundError.name = 'Not Found';
            throw notFoundError;
        }

        return true;
    }
}
