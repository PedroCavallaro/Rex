import { DbService } from 'src/@core/db/DbService';
import { User } from '../models/User';
import { UserRepository } from '../models/UserRepository';
import { Pool, QueryResult } from 'pg';

export class PostgresUserRepo implements UserRepository {
  private readonly db: DbService;

  constructor() {
    this.db = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 5432,
      max: 20,
    });
  }

  async getUser(email: string): Promise<User | null> {
    const getUserSql = `SELECT id, email, password FROM "User" WHERE email = $1;`;
    const { rows }: QueryResult<User> = await this.db.query(getUserSql, [
      email,
    ]);
    return rows[0];
  }
  async createUser(user: User): Promise<User | null> {
    const insertUser = `INSERT INTO "User" ("id", "email", "password", "created_at")
      VALUES ($1, $2, $3, $4) 
      RETURNING id, email`;
    const { rows }: QueryResult<User> = await this.db.query(insertUser, [
      user.id,
      user.email,
      user.password,
      user.created_at,
    ]);
    return rows[0];
  }
}
