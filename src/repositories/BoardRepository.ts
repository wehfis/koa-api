import { db } from '../db/postgres_config';
import { BoardModel } from '../models/BoardModel';
import IBoardRepository from './IBoardRepository';

export default class BoardRepository implements IBoardRepository<BoardModel> {
    async findById(id: string): Promise<BoardModel> {
        const query = {
            text: `
                SELECT * 
                FROM boards
                WHERE id = $1
            `,
            values: [id],
        };
        const result = await db.query(query);

        const board: BoardModel = result.rows[0];

        return board;
    }
    async findAll(userId: string): Promise<BoardModel[]> {
        const query = {
            text: `
                SELECT b.*
                FROM boards b
                JOIN users_boards ub ON b.id = ub.board_id
                JOIN users u ON ub.user_id = u.id
                WHERE u.id = $1
            `,
            values: [userId],
        };
        const result = await db.query(query);

        const boards: BoardModel[] = result.rows;

        return boards;
    }
    async create(userId: string, title: string): Promise<BoardModel> {
        const query1 = {
            text: `
                INSERT INTO boards(title) 
                VALUES($1)
                RETURNING id, title
            `,
            values: [title],
        };
        const result = await db.query(query1);

        const insertedBoard: BoardModel = result.rows[0];

        const query2 = {
            text: `
                INSERT INTO users_boards
                (user_id, board_id)
                VALUES($1, $2)
            `,
            values: [userId, insertedBoard.id],
        };

        await db.query(query2);

        return insertedBoard;
    }
    async update(id: string, title: string): Promise<BoardModel> {
        const query = {
            text: `
                UPDATE boards
                SET title = $1
                WHERE id = $2
                RETURNING id, title
            `,
            values: [title, id]
        };
        const result = await db.query(query);

        const updatedBoard: BoardModel = result.rows[0];

        return updatedBoard;
    }
    async delete(id: string): Promise<boolean> {
        const query = {
            text: `
                DELETE FROM boards
                WHERE id = $1
            `,
            values: [id],
        };
        const result = await db.query(query);

        const isDeleted: boolean = result.rows.length > 1 ? false : true;

        return isDeleted;
    }
}
