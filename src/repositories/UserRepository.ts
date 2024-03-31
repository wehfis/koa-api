import { UserModel } from '../models/UserModel';
import IUserRepository from './IUserRepository';
import { db } from '../db/postgres_config';
import { LoginUserDto, RegisterUserDto } from '../dtos/UserDtos';

export default class UserRepository implements IUserRepository {
    async findById(id: string): Promise<Omit<UserModel, 'password'>> {
        const query = {
            text: `
                SELECT username 
                FROM users
                WHERE id = $1`,
            values: [id],
        };
        const result = await db.query(query);

        const user: Omit<UserModel, 'password'> = result.rows[0];

        return user;
    }

    async findAll(): Promise<Omit<UserModel, 'password'>[]> {
        const query = `
            SELECT id, username
            FROM users
        `;
        const result = await db.query(query);

        const users: Omit<UserModel, 'password'>[] = result.rows;

        return users;
    }

    async create(
        payload: RegisterUserDto
    ): Promise<Omit<UserModel, 'password'>> {
        const query = {
            text: `
                INSERT INTO users(username, password) 
                VALUES($1, $2)
                RETURNING username, id
            `,
            values: [payload.username, payload.password],
        };
        const result = await db.query(query);

        const insertedUser: Omit<UserModel, 'password'> = result.rows[0];

        return insertedUser;
    }

    async findOne(username: string): Promise<UserModel | null> {
        const query = {
            text: `
                SELECT username, id, password 
                FROM users
                WHERE username = $1
            `,
            values: [username],
        };
        const result = await db.query(query);

        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async updateToken(id: string, token: string) {
        const query = {
            text: `
                UPDATE users 
                SET refresh_token = $1
                WHERE id = $2
            `,
            values: [token, id],
        };
        await db.query(query);
    }

    async removeToken(id: string) {
        const query = {
            text: `
                UPDATE users 
                SET refresh_token = NULL
                WHERE id = $1
            `,
            values: [id],
        };
        await db.query(query);
    }

    async findToken(token: string): Promise<string | null> {
        const query = {
            text: `
                SELECT refresh_token 
                FROM users
                WHERE refresh_token = $1
            `,
            values: [token],
        };
        const result = await db.query(query);

        return result.rows.length > 0 ? result.rows[0] : null;
    }
}
